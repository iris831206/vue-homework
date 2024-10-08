<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="list-group" v-for="drink in drinks" :key="drink.id">
          <a href="#" class="list-group-item list-group-item-action" @click.prevent="addToCart(drink)">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ drink.name }}</h5>
              <small>{{ drink.price }}</small>
            </div>
            <p class="mb-1">{{ drink.description }}</p>
          </a>
        </div>
      </div>
      <div class="col-md-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="50">操作</th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in cart" :key="order.id">
              <td><button type="button" class="btn btn-sm" @click="removeFromCart(order.id)">x</button></td>
              <td>{{ order.name }}</td>
              <td><small>{{ order.description }}</small></td>
              <td>
                <select v-model="order.num" @change="updateCart(order)">
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                </select>
              </td>
              <td>{{ order.price }}</td>
              <td>{{ order.price * order.num }}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-end mb-3">
          <h5>總計: <span>{{ totalAmount }}元</span></h5>
        </div>
        <textarea class="form-control mb-3" rows="3" placeholder="備註" v-model="message"></textarea>
        <div class="text-end">
          <button class="btn btn-primary" @click="createOrder(order)">送出</button>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div v-if="!order.id" class="alert alert-secondary text-center" role="alert">
        尚未建立訂單</div>
      <div v-else class="card">
        <div class="card-body">
          <div class="card-title">
            <h5>訂單</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">品項</th>
                  <th scope="col">數量</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in order.cart" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.num }}</td>
                  <td>{{ item.num * item.price }}</td>
                </tr>

              </tbody>
            </table>
            <div class="text-end">備註: <span>{{ order.message }}</span></div>
            <div class="text-end">
              <h5>總計: <span>{{ order.sum }}元</span></h5>
            </div>

          </div>

        </div>
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
const cart = ref([])
const order = ref({})
const message = ref('')

const addToCart = (drink) => {
  const existingItem = cart.value.find(item => item.id === drink.id)
  if (existingItem) {
    existingItem.num += 1
  } else {
    cart.value.push({
      ...drink,
      cartId: new Date().getTime(),
      num: 1
    })
  }
}
const removeFromCart = (id) => {
  cart.value = cart.value.filter((item) => item.id !== id)
}

const updateCart = (item) => {
  cart.value.map((cartItem) => {
    if (cartItem.id === item.id) {
      cartItem.num = item.num
    }
    return cartItem
  })
}

const totalAmount = computed(() => {
  return cart.value.reduce((pre, item) => pre + (item.price * item.num), 0)
}
)

const createOrder = () => {
  order.value = {
    id: new Date().getTime(),
    cart: cart.value,
    message: message.value,
    sum: totalAmount.value
  }
  cart.value = []
  message.value = ''
}

</script>
