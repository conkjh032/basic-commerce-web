<script setup>

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {computed, onMounted, ref} from "vue";
import {useProductStore} from "../store/index.js";

library.add(fas);


// reactive state
const carGridModel = ref([]);


// pinia store
const productStore = useProductStore();


// computed properties
const total = computed(() => {
  return carGridModel.value.reduce(
      (sum, element) => sum + element.cart.count * element.product.fiyat, 0
  );
})


// lifecycle hooks
onMounted(async () => {
  carGridModel.value = await productStore.fetchCartGridModel();
})


// methods
function remove(id) {
  productStore.removeFromCart(id);
  const item = carGridModel.value.find((item) => item.cart.id === id);
  const index = carGridModel.value.indexOf(item);
  if (index !== -1) {
    carGridModel.value.splice(index, 1);
  }
}

</script>

<template>
  <div class="container clearfix">
    <div class="sipairsToplamBoc">
      <div class="siparisToplamInfo">
        <div style="font-size: 12px">배송비</div>
        <div style="text-align: right">
          <del style="font-size: 12px">11,90 원</del><br />0 원
        </div>
        <div style="font-size: 14px; margin: 30px"><b>총 금액</b></div>
        <div style="text-align: right; color: orange; margin-top: 30px">
          {{ Number.parseFloat(total).toFixed(2) }} 원 (VAT 포함)
        </div>
      </div>

      <button class="btnSatinAl">
        <img src="/src/assets/satinalikon.png" alt="아니오" style="width: 45px; margin-top: -10px; display: inline-block; float: left;">
        구매하기
      </button>
    </div>
    <div class="urunSepettekiler clearfix">
      <div class="urunBox clearfix" v-for="item in carGridModel" :key="item.cart.id">
        <div class="silmeButonDiv">
          <button @click="remove(item.cart.id)">X</button>
        </div>
        <router-link :to="{ name: 'urun', params: { id: item.product.id } }">
          <div class="urunResimDiv">
            <img :src="item.product.image" alt="" />
          </div>
        </router-link>
        <div class="urunAciklamaBody clearfix">
          <router-link :to="{ name: 'urun', params: { id: item.product.id } }">
            <div class="urunInfo">
              <h3 class="urunInfoTitle">{{ item.product.urunAdi }}</h3>
              <table>
                <thead>
                <tr>
                  <td>눈</td>
                  <td>Dia</td>
                  <td>Bc</td>
                  <td>Sph (Pwr)</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{{ item.cart.goz }}</td>
                  <td>{{ item.cart.dia }}</td>
                  <td>{{ item.cart.bc }}</td>
                  <td>{{ item.cart.sph }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </router-link>
          <div class="urunAdet">
            <select class="urunAdetSelect" v-model="item.cart.count" @change="productStore.changeCountCart({ id: item.cart.id, count: item.cart.count })"/>
            <option value="1" selected="selected">1 상자</option>
            <option value="2">2 상자</option>
            <option value="3">3 상자</option>
            <option value="4">4 상자</option>
          </div>
          <div class="urunFuyat">
            <span> {{ Number.parseFloat(item.cart.count * item.product.fiyat).toFixed(2) }}</span>
            원
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  background: #666464;
}
.container {
  width: 95%;
  margin: 0 auto;
}
.urunBox {
  display: flex;
  align-items: center;
  border: 1px solid #e1e1e1;
  width: 70%;
}

.urunInfoTitle {
  font-size: 1.15385rem;
  color: #085199;
  font-weight: 700;
  padding-left: 10px;
}

.urunAdetSelect {
  height: calc(2.96215rem + 2px);
  width: 140px;
}

table {
  border-collapse: collapse;
}

tr {
  color: #444;
}

thead td {
  color: #ff853a;
}
td {
  padding-left: 10px;
}
.urunFiyat {
  color: #a27d56;
  font-size: 25px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.silmeButonDiv {
  float: left;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 15px;
}

.silmeButonDiv button {
  border: none;
  border-radius: 5px;
  background: white;
  color: #bebebe;
}
.silmeButonDiv button:hover {
  background: brown;
  cursor: pointer;
  color: white;
}
/*Sol taraftaki resmin bulunduğu kısım*/
.urunResimDiv {
  float: left;
  display: inline-block;
}
.urunResimDiv img {
  width: 110px;
  padding: 25px 30px;
}
/*Sol üst taraftaki her bir ürün için açıklama kısmı*/
.urunAciklamaBody {
  float: left;
  display: flex;
  align-items: center;
}

.urunInfo {
  float: left;
  display: inline-block;
}

.urunAdet {
  float: left;
  margin-left: 185px;
  display: inline-block;
}
/*Ürünün Tane Fiyatı*/
.urunFiyat {
  float: right;
  margin-left: 35px;
  display: inline-block;
}
/*Sepete Eklenen Hediye ya da İndirimli ürünler*/
.sepeteEkUrunler {
  margin-top: 15px;
  border: 1px solid #e1e1e1;
  width: 70%;
}
.uyariMesaj {
  width: 100%;
  background: #ffffbf;
  color: #555;
  font-size: 20px;
  padding: 12px;
  box-sizing: border-box;
}
.uyariMesaj b {
  color: black;
}
.sepeteEkUrunler .urunBox {
  width: 100%;
}
/*Sipariş Toplam Box*/

.siparisToplamBox {
  position: sticky;
  top: 0;
  float: right;
  width: 20%;
  margin-right: 95px;
  display: flex;
  flex-direction: column;

  /* border: 1px solid #e1e1e1;*/
}
.btnSatinAl {
  width: 100%;
  background: orangered;
  color: white;
  padding: 35px;
  margin-top: 50px;
  border-radius: 3px;
  border: none;
  font-size: 20px;
}
.btnSatinAl:hover {
  cursor: pointer;
}
.siparisToplamInfo {
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  padding: 25px;
  background-color: white;
  /*  border: 1px solid gray;*/
}
.siparisToplamInfo > * {
  flex-basis: 50%;
}
</style>