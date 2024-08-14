<template>
  <div>
    <h2>註冊</h2>
    <form action="">
      <label htmlFor="email">帳號</label>
      <input type="email" placeholder="Email" id="email" name="email" v-model="signupForm.email" /> <br />
      <label htmlFor="password">密碼</label>
      <input type="password" placeholder="Password" id="password" name="password" v-model="signupForm.password" />
      <br />
      <label htmlFor="nickname">暱稱</label>
      <input type="text" placeholder="nickname" id="nickname" name="nickname" v-model="signupForm.nickname" /> <br />
      <button type="button" @click="signUp">註冊</button>
    </form>
    <p>{{ messageSignUp }}</p>
    <hr>
    <h2>登入</h2>
    <form action="">
      <label htmlFor="email">帳號</label>
      <input type="email" placeholder="Email" id="email" name="email" v-model="signinForm.email" /> <br />
      <label htmlFor="password">密碼</label>
      <input type="password" placeholder="Password" id="password" name="password" v-model="signinForm.password" />
      <br />
      <button type="button" @click="signIn">登入</button>
      <p>{{ messageSignIn }}</p>
    </form>
    <hr>
    <h2>驗證</h2>
    <form action="">
      <input type="text" placeholder="Token" v-model="tokenCheck" />
      <button type="button" @click="checkOut">驗證 Token</button>
    </form>
    <p>{{ messageCheckOut }}</p>
    <hr>
    <h2>登出</h2>
    <input placeholder='Token' v-model="tokenSignOut" />
    <button type="button" @click="signOut">Check Out</button>
    <p>{{ messageSignOut }}</p>
  </div>
  <hr>
  <p v-if="user.uid">使用者{{ user.nickname }} 已登入</p>
  <p v-else>尚未登入</p>
  <div v-if="user.uid">
    <h2>Todo list</h2>
    <input v-model="newTodo" placeholder="New Todo" />
    <button @click="addTodo">Add Todo</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todoEdit[todo.id] }}
        <template v-if="editingId === todo.id">
          <input type="text" v-model="tempEditData.content">
          <button type="button" @click="confirmEdit">確認編輯</button>
        </template>
        <template v-else>
          {{ todo.content }}
          {{ todo.status ? '完成' : '未完成' }}
          <input type="checkbox" :checked="todo.status" @change="toggleStatus(todo.id)" />
          <button type="button" @click="editContent(todo.id)">編輯名稱</button>
          <button @click="deleteTodo(todo.id)">Delete</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const api = 'https://todolist-api.hexschool.io'

// 註冊
const signupForm = ref({
  email: '',
  password: '',
  nickname: ''
})
const messageSignUp = ref('')

const signUp = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_up`, signupForm.value)
    messageSignUp.value = '註冊成功. UID: ' + res.data.uid
  } catch (err) {
    messageSignUp.value = '註冊失敗:' + err.message
  }
}

// 登入
const signinForm = ref({
  email: '',
  password: ''
})
const messageSignIn = ref('')

const signIn = async () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  try {
    const res = await axios.post(`${api}/users/sign_in`, signinForm.value)
    messageSignIn.value = '登入成功，token: ' + res.data.token
    // 寫入token
    document.cookie = `myToken=${res.data.token}; expires=${tomorrow.toUTCString()}`
  } catch (err) {
    messageSignIn.value = '登入失敗: ' + err.message
  }
}

// 驗證
const tokenCheck = ref('')
const messageCheckOut = ref('')

const checkOut = async () => {
  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: {
        Authorization: tokenCheck.value
      }
    })
    messageCheckOut.value = '驗證成功 UID: ' + res.data.uid
  } catch (err) {
    messageCheckOut.value = '驗證失敗: ' + err.message
  }
}

// 登出
const tokenSignOut = ref('')
const messageSignOut = ref('')

const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: tokenSignOut.value
        }
      })
    messageSignOut.value = res.data.message
  } catch (err) {
    messageSignOut.value = '登入失敗: ' + err.message
  }
}

const user = ref({
  nickname: '',
  uid: ''
})

// 讀取token
const APItoken = ref('')
const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
APItoken.value = token

// Todo list
const todos = ref([])
const newTodo = ref('')
const todoEdit = ref({})

const getTodos = async () => {
  const res = await axios.get(`${api}/todos`, {
    headers: {
      Authorization: APItoken.value
    }
  })
  todos.value = res.data.data
}

const addTodo = async () => {
  if (!newTodo.value) return // 若欄位沒有值傳入則中止
  const todo = {
    content: newTodo.value
  }
  await axios.post(`${api}/todos`, todo, {
    headers: {
      Authorization: APItoken.value
    }
  })
  newTodo.value = ''
  getTodos()
}

const deleteTodo = async (id) => {
  await axios.delete(`${api}/todos/${id}`, {
    headers: {
      Authorization: APItoken.value
    }
  })
  getTodos()
}

const editingId = ref('')
const tempEditData = ref({})
const editContent = (id) => {
  editingId.value = id
  const index = todos.value.findIndex((item) => { return item.id === id })
  const editItem = todos.value[index]
  tempEditData.value = { ...editItem } // 淺拷貝
}

const confirmEdit = async () => {
  const id = editingId.value
  await axios.put(`${api}/todos/${id}`, tempEditData.value, {
    headers: {
      Authorization: APItoken.value
    }
  })
  editingId.value = '' // 清空編輯狀態
  tempEditData.value = {} // 清空暫存
  getTodos()
}

const toggleStatus = async (id) => {
  await axios.patch(
    `${api}/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: APItoken.value
      }
    }
  )
  getTodos()
}

onMounted(async () => {
  const res = await axios.get(`${api}/users/checkout`, {
    headers: {
      Authorization: APItoken.value
    }
  })
  user.value = res.data

  //
  getTodos()
})
</script>
