<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {onAuthStateChanged, signOut} from "@firebase/auth"
import {auth, realDb} from "../../firebase/config.js";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {ref, onValue} from "firebase/database"
import {computed, onMounted} from "vue";
import {useProductStore} from "../store/index.js"

// add fontawesome icons to the library
library.add(fas);

// reactive state
// const state = reactive ({
//   posts: [],
//   products: [],
//   cart: [],
//   cartGridModel: [],
//   msg: "message",
//   currentUser: null,
// })

const msg = "message"
let currentUser = null;

const productStore = useProductStore();

// actions 사용 방법 ??
// const logout = productStore.logout();
const fetchCart = productStore.fetchCart();

// computed properties
const getCartCount = productStore.getCartCount;
const getProductWithID = (id) => productStore.getProductWithID(id)


// lifecycle hooks
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser = auth.currentUser;
    }
  })
})

// methods
const showInfo = () => {
  if (currentUser) {
    alert(`Alert : ${currentUser.email} \n ID : ${currentUser.uid}`) // `Alert: ${state.currentUser.email}\nID: ${state.currentUser.uid}`
  } else {
    alert("No user is currently logged in.")
  }
}

</script>

<template>
  <div id="app">
    <div class="container">
      <img src="../assets/logo.svg" alt="logo"/>
      <input
          type="text" placeholder="" name="searchBar" id="searchBar"/>
      <a type="button" class="araBtn">
        <FontAwesomeIcon icon="search"/>
      </a>
      <ul class="navBar">
        <router-link to="/uyeOl" tag="li" v-if="!currentUser">
          <img src="../assets/profile.png" alt="no" style="width: 30px; margin-top: -10px; margin-left: 5px"/>
          <a>가입</a>
        </router-link>
        <router-link to="/login" tag="li" v-if="!currentUser">
          <img src="../assets/profile.png" alt="no" style="width: 30px; margin-top: -10px; margin-left: 5px"/>
          <a>회원 로그인</a>
        </router-link>
        <router-link to="#" v-if="currentUser" tag="li" @click.native.prevent="showInfo">
          <img src="../assets/profile.png" alt="no" style="width: 30px; margin-top: -10px; margin-left: 5px">
          <a>내 계정</a>
        </router-link>
        <router-link to="/sepetim" tag="li">
          <FontAwesomeIcon icon="shpopping-cart">&#xf07a;</FontAwesomeIcon>
          <span class="badge badge-warning" id="lblCartCount">
            {{ getCartCount }}
          </span>
          <a>내 카트</a>
        </router-link>
        <li>
          <a href="https://github.com/vuejs/awesome-vue" target="_blank">
            <img src="../assets/kagitucak.png" alt="아니오" style="width: 30px; margin-top: -10px; margin-left: 5px"/>
            주문 추적
          </a>
        </li>
        <router-link to="#" tag="li" class="sign-out" @click.native.prevent="logout()" v-if="currentUser">
          <FontAwesomeIcon icon="sign-out-alt"/>
          <a>로그아웃</a>
        </router-link>
      </ul>

      <ul class="Menu">
        <router-link to="/Anasayfa" tag="button">
          <FontAwesomeIcon icon="ellipsis"></FontAwesomeIcon>
          <FontAwesomeIcon icon="ellipsis"></FontAwesomeIcon>
          <FontAwesomeIcon icon="ellipsix"></FontAwesomeIcon>
          모든 렌즈
        </router-link>
        <router-link to="/saydamLens" tag="li">
          <a> 클리어 렌즈 </a>
        </router-link>
        <router-link to="/gunlukLens" tag="li">
          <a> 데일리 렌즈 </a>
        </router-link>
        <router-link to="/renkliLens" tag="li">
          <a> 컬러 렌즈 </a>
        </router-link>
        <router-link to="/toricLens" tag="li">
          <a> 토릭 렌즈 </a>
        </router-link>
        <router-link to="/indirimliLens" tag="li">
          <a> 할인 렌즈 </a>
        </router-link>
        <router-link to="/solusyon" tag="li">
          <a> 해결책 </a>
        </router-link>
        <router-link to="/gozBakim" tag="li">
          <a> 안과 진료 </a>
        </router-link>
        <router-link to="/kampanyalar" tag="li">
          <a> 캠페인 </a>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
  border: 3px solid #2c3e50;
  background: red;
}

.navBar {
  display: inline-block;
  list-style-type: none;
  padding: 0;
  margin-left: 15px;
}
.navBar li {
  display: inline-block;
  margin: 0 5px;
}
.navBar li a {
  text-decoration: none;
  color: black;
}
.navBar li a:hover {
  color: orangered;
}

.container {
  /*width:90%;
    margin: 0 auto;*/
  text-align: center;
}
.container img {
  float: left;
  margin-left: 85px;
}

#aramaKutusu {
  display: inline-block;
  line-height: 30px;
  width: 30%;
  border: 1px solid orangered;
  border-radius: 3px;
  padding-left: 10px;
}

.araBtn {
  height: 33px;
  /* border: 1px solid orangered;
    border-radius: 3px;
    border-bottom-left-radius: 0  ;
    border-top-left-radius: 0;
    background: white;*/
  margin-left: -30px;
}

.araBtn:hover {
  cursor: pointer;
}

.Menu {
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  padding: 15px 0;
  box-shadow: 0px 10px 18px 10px #e3e3e3;
}
.Menu button {
  display: inline-block;
  padding: 12px 16px;
  margin: -16px 0;
  border: none;
  background: white;
  font-weight: bold;
  color: #2c3e50;
  font-size: 17px;
}
.Menu button:hover {
  background: #f60;
  color: #fff;
  border: 1px solid #f60;
  cursor: pointer;
}
.Menu li {
  border-left: 1px solid gray;
  padding-left: 15px;
  display: inline-block;
  margin: 0 5px;
}
.Menu li a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
}
.Menu li a:hover {
  color: orangered;
}

.badge {
  padding-left: 9px;
  padding-right: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
  border-radius: 9px;
}

.label-warning[href], .badge-warning[href] {
  background-color: #c67605;
}

#lblCartCount {
  font-size: 12px;
  background: #ff0000;
  color: #fff;
  padding: 0 3px;
  vertical-align: top;
  margin-left: -10px;
}
</style>