<script setup>

// FontAwesome setup
import {fas} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {useProductStore} from "../store/index.js";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {auth} from "../../firebase/config.js";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

library.add(fas);

// Router setup
const route = useRoute();
const router = useRouter();

// pinia store
const productStore = useProductStore();

// Reactive state
const product = ref(null);
const cart = ref([
  {
    goz: "Sol",
    dia: "14:00",
    bc: "8.40",
    sph: "-12.00",
    count: 1,
    pid: 0,
  },
  {
    goz: "Sağ",
    dia: "14:00",
    bc: "8.40",
    sph: "-12.00",
    count: 0,
    pid: 0,
  },
]);

// // Computed property to get product by ID
// const getProductWithID = computed(() => (id) =>
//     productStore.products.find((item) => item.id === id)
// );

// Fetch product and cart on component mount
onMounted(async () => {
  await productStore.fetchProducts();
  product.value = productStore.products.find(
      (item) => item.id === Number(route.params.id)
  );

  if (product.value) {
    cart.value = cart.value.map((item) => ({
      ...item,
      pid: product.value.id,
    }));
  }

  await productStore.fetchCart();
});

// Add all items to cart
const addAllToCart = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      cart.value.forEach((element) => {
        productStore.addToCart(element);
      });
    } else {
      router.push("/login");
    }
  });
};


</script>

<template>
  <div class="urunDetay clearfix" v-if="product">
    <div class="urunResimDiv">
      <img :src="product.image" alt="" />
    </div>
    <div class="urunbody">
      <div class="clearfix">
        <div class="urunBodySol">
          <h1>{{ product.urunAdi }}</h1>
          <div class="ratingYorum">
            <span><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <span><FontAwesomeIcon icon="star"></FontAwesomeIcon></span>
            <a class="yorumlar" href="#">댓글 (<span>1493</span>)</a>
            <span> | </span>
            <a href="#">댓글 쓰기</a>
          </div>
          <p class="urunAciklama">{{ product.urunAciklama }}</p>
          <span class="ucretText"><b>{{ Number.parseFloat(product.fiyat).toFixed(2) }}</b>원</span>
        </div>
      </div>
      <div class="urunSecenekler">
        <div class="item">
          <img src="src/assets/kargo.svg" alt="" />
          <span>무료 배송</span>
        </div>
        <div class="item">
          <div class="item">
            <img src="src/assets/motor.svg" alt="" />
            <span>당일 배송</span>
          </div>
        </div>
        <div class="item">
          <div class="item">
            <img src="src/assets/dunya.svg" alt="" />
            <span>솔루션 선물 2박스</span>
          </div>
        </div>
        <div class="item">
          <div class="item">
            <img src="src/assets/kart.svg" alt="" />
            <span>200원 이상 무이자 할부 4회</span>
          </div>
        </div>
        <div class="item">
          <div class="item">
            <img src="src/assets/kapida-odeme.svg" alt="" />
            <span>직접 결제</span>
          </div>
        </div>
      </div>
      <div class="urunSecimler">
        <table>
          <thead>
            <th>Göz</th>
            <th>Dia</th>
            <th>Bc</th>
            <th>Sph(Pwr)*</th>
            <th>Adet</th>
            <th></th>
          </thead>
          <tbody>
          <tr>
            <td>Sol</td>
            <td>
              <select class="dropdownFiltre" v-model="cart[0].dia">
                <option value="14:00">14:00</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[0].bc">
                <option value="8.40">8.40</option>
                <option value="8.80">8.80</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[0].sph">
                <!--
                <option>Seçiniz</option> -->
                <option value="-12.00" selected="selected">-12.00</option>
                <option value="-10.00">-10.00</option>
                <option value="-5.00">-5.00</option>
                <option value="2.00">2.00</option>
                <option value="3.00">3.00</option>
                <option value="5.00">5.00</option>
                <option value="7.00">7.00</option>
                <option value="12.00">12.00</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[0].count">
                <!--
                <option>Seçiniz</option> -->

                <option value="0">Seçiniz</option>
                <option value="1" selected="selected">1 Kutu</option>
                <option value="2">2 Kutu</option>
                <option value="3">3 Kutu</option>
                <option value="4">4 Kutu</option>
              </select>
            </td>
            <td rowspan="2" style="width: 30%; height: 100px">
              <Button style="text-align: center" @click="addAllToCart()"
              ><span style="color: white"
              ><img
                  src="src/assets/sepetkirmizi.png"
                  alt="yok"
                  style="
                        width: 25px;
                        margin-top: -10px;
                        display: inline-block;
                        float: left;
                      " /></span
              >SEPETE EKLE</Button
              >
            </td>
          </tr>
          <tr>
            <td>Sol</td>
            <td>
              <select class="dropdownFiltre" v-model="cart[1].dia">
                <option value="14:00">14:00</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[1].bc">
                <option value="8.40">8.40</option>
                <option value="8.80">8.80</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[1].sph">
                <!--
                <option>Seçiniz</option> -->
                <option value="-12.00" selected="selected">-12.00</option>
                <option value="-10.00">-10.00</option>
                <option value="-5.00">-5.00</option>
                <option value="2.00">2.00</option>
                <option value="3.00">3.00</option>
                <option value="5.00">5.00</option>
                <option value="7.00">7.00</option>
                <option value="12.00">12.00</option>
              </select>
            </td>
            <td>
              <select class="dropdownFiltre" v-model="cart[1].count">
                <!--
                <option>Seçiniz</option> -->

                <option value="0" selected="selected">선택하기</option>
                <option value="1">1 상자</option>
                <option value="2">2 상자</option>
                <option value="3">3 상자</option>
                <option value="4">4 상자</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</template>

<style scoped>

</style>