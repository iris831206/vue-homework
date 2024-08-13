<template>
  <div class="container mt-5">
    <table class="table align-middle">
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">內容</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col">小計</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in drinks" :key="item.id">
          <td v-if="editingId === item.id">
            <input type="text" v-model="tempEditData.name">
            <button type="button" class="btn btn-primary ms-3" @click="confirmEditName">確認編輯</button>
          </td>
          <td v-else>
            {{ item.name }}
            <button type="button" class="btn btn-outline-primary" @click="editName(item.id)">編輯名稱</button>
          </td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button class="btn" @click="handleDrinkStock(item.id, item.num - 1)" :disabled="item.num < 1">-</button>
            {{ item.num }}
            <button class="btn" @click="handleDrinkStock(item.id, item.num + 1)">+</button>

          </td>
          <td>
            {{ item.num*item.price }}
          </td>
          <td>
            <button class="btn btn-secondary me-3" @click="preEdit(item)">編輯商品</button>
            <button type="button" class="btn btn-danger" @click="delProduct(item.id)">

              刪除商品
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mb-3 d-flex justify-content-end">
      總計：{{ sum }}元
    </div>
    <div class="bg-light p-3">
      <label for="name">商品名稱</label>
      <input type="text" id="name" v-model="newProduct.name" placeholder="商品名稱">
      <label for="name">商品內容</label>
      <input type="text" id="description" v-model="newProduct.description" placeholder="商品內容">
      <label for="name">商品價格</label>
      <input type="number" id="price" v-model="newProduct.price" placeholder="商品價格">
      <label for="name">商品數量</label>
      <input type="number" id="num" v-model="newProduct.num" placeholder="商品數量">
      <div>
        <button type="button" class="btn btn-outline-primary mt-3" @click="addProduct">
          新增商品
        </button>
      </div>
    </div>
    <div class="bg-light p-3" v-if="tempEditData.id">
      <h5>編輯商品</h5>
      <label for="name">商品名稱</label>
      <input type="text" id="name" v-model="tempEditData.name" placeholder="商品名稱">
      <label for="name">商品內容</label>
      <input type="text" id="description" v-model="tempEditData.description" placeholder="商品內容">
      <label for="name">商品價格</label>
      <input type="number" id="price" v-model="tempEditData.price" placeholder="商品價格">
      <label for="name">商品數量</label>
      <input type="number" id="num" v-model="tempEditData.num" placeholder="商品數量">
      <div>
        <button type="button" class="btn btn-outline-primary mt-3 me-3" @click="confirmEdit">
          確認
        </button>
        <button type="button" class="btn btn-outline-danger mt-3" @click="tempEditData = {}">
          取消
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    num: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    num: 15
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    num: 30
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    num: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    num: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    num: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    num: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    num: 20
  }
]

const drinks = ref(data)

// 傳入id，用map遍歷找到對應id並更新數量，return更新後的陣列，替換掉原先的drinks
const handleDrinkStock = (id, newNum) => {
  drinks.value = drinks.value.map((item) => {
    if (item.id === id) {
      item.num = newNum
    }
    return item
  })
}

// 刪除商品
const delProduct = (id) => {
  const index = drinks.value.findIndex((item) => { return item.id === id })
  drinks.value.splice(index, 1)
}

// 新增商品
const newProduct = ref({})

const addProduct = () => {
  drinks.value.push({
    id: new Date().getTime(),
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: newProduct.value.price,
    num: newProduct.value.num
  })

  newProduct.value = {} // 清空表單
}

// 編輯商品
const tempEditData = ref({})
const preEdit = (data) => {
  tempEditData.value = { ...data } // 淺拷貝
}
const confirmEdit = () => {
  const index = drinks.value.findIndex((item) => { return item.id === tempEditData.value.id })
  drinks.value[index] = tempEditData.value
  tempEditData.value = {} // 清空暫存名稱
}

// 修改名稱
const editingId = ref('')
const editName = (id) => {
  editingId.value = id
  const index = drinks.value.findIndex((item) => { return item.id === id })
  const editItem = drinks.value[index]
  tempEditData.value = { ...editItem } // 淺拷貝
}

const confirmEditName = () => {
  const index = drinks.value.findIndex((item) => { return item.id === tempEditData.value.id })
  drinks.value[index] = tempEditData.value
  editingId.value = '' // 清空編輯狀態
  tempEditData.value = {} // 清空暫存名稱
}

// 加總
const sum = computed(() => {
  return drinks.value.reduce((pre, item) => pre + (item.price * item.num), 0)
}
)

</script>
