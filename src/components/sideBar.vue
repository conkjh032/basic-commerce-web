<script setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
</script>

<template>
  <div class="container clearfix">
    <ul>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="globe"></FontAwesomeIcon></span>
          브랜드
        </a>
        <ul>
          <li><a href="">Johnson & Johnson</a></li>
          <li><a href="">Bausch + Lomb</a></li>
          <li><a href="">Alcon (Ciba Vision)</a></li>
          <li><a href="">Cooper Vision</a></li>
          <li><a href="">Sauflon</a></li>
          <li><a href="">Tech Contactlens</a></li>
          <li><a href="">Swiss Lens</a></li>
          <li><a href="">Zeiss (Wöhlk)</a></li>
        </ul>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="circle-notch"></FontAwesomeIcon></span>
          렌즈 유형
        </a>
        <ul>
          <li><a href="">클리어 렌즈</a></li>
          <li><a href="">컬러 렌즈</a></li>
          <li><a href="">난시 렌즈</a></li>
          <li><a href="">다초점 렌즈</a></li>
          <li><a href="">특수 렌즈</a></li>
          <li><a href="">할인된 렌즈 세트</a></li>
          <li><a href="">렌즈솔루션</a></li>
        </ul>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="clock"></FontAwesomeIcon></span>
          빈도 변경
        </a>
        <ul>
          <li><a href="">일일 일회용 렌즈</a></li>
          <li><a href="">2주 렌즈</a></li>
          <li><a href="">월간 렌즈</a></li>
        </ul>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="eye"/></span>
          아이 케어 제품
        </a>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="eye"/></span>
          할인된 렌즈 세트
        </a>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="eye"/></span>
          스페셜 세트
        </a>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="eye"/></span>
          솔루션
        </a>
      </li>
      <li class="kategori">
        <a href="">
          <span><FontAwesomeIcon icon="eye"/></span>
          캔페인
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container{
  float: left;
  margin-top:25px;
  width:20%;
  margin: 0 auto;
  height: auto;
  border: 1px solid #e1e1e1;
  border-radius: 3px;
  border-top-left-radius: 5px;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
.container ul{
  list-style: none;
}
.kategori{
  color: orangered;
  font-size: 16px;
  margin-top:20px;
  font-weight: bold;
  list-style-type: none;
}
.kategori a{
  color: orangered;
  text-decoration: none;
}
.kategori span{
  margin-left: -30px;
}
.kategori a:hover{
  color: rgb(156, 94, 36);

}
.kategori ul li{
  color: black;
  font-size: 15px;
  margin-top: 5px;
  font-weight: 100;
  list-style-type: disc;
  margin-left: -40px
}
.kategori ul li:first-child{
  margin-top: 20px;
}
.kategori ul li a{
  text-decoration: none;
  color: black;
}
.kategori ul li a:hover{
  text-decoration: none;
  color: #332ffd;
}
</style>