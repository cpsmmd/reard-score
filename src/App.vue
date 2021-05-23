<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  overflow: hidden;
  color: #525a6f;
  font-size: 16px;
}
.reard_btn_b {
  background-color: rgba(51, 153, 51, 1) !important;
  border-color: rgba(51, 153, 51, 1) !important;
}
.reard_btn_b:hover {
  background-color: rgba(51, 153, 51, 1) !important;
  border-color: rgba(51, 153, 51, 1) !important;
}
.reard_btn_r {
  background-color: #dc483a;
  border-color: #dc483a;
}
.reard_btn_r:hover {
  background-color: #dc483a;
  border-color: #dc483a;
}
.reard_btn_o {
  background-color: #f60;
  border-color: #f60;
}
.reard_btn_o:hover {
  background-color: #f60;
  border-color: #f60;
}
.ivu-radio-checked .ivu-radio-inner {
  border-color: #323232;
  box-shadow: none;
}
.ivu-radio-inner:after {
  background-color: #323232;
}
.ivu-radio-checked:hover .ivu-radio-inner {
  border-color: #323232;
}
.ivu-radio-inner:focus {
  border-color: #323232;
}
.ivu-page-item-active {
  border-color: #323232;
}
.ivu-page-item-active:hover {
  border-color: #323232;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: #323232;
}
.ivu-table-sort i {
  font-size: 20px;
}
.ivu-table-sort {
  width: 20px;
  height: 16px;
}
</style>
