<template>
  <div id="naw">
    <router-link class="naw_item" to="/data">DataCards</router-link>
    <router-link class="naw_item" to="/">HomePage</router-link>
  </div>
  <router-view/>

</template>


<script>


export default {


}

</script>

<style>
.naw_item{
  margin: 10px;
  padding: 10px;
  background-color: aqua;
  border-radius: 20px;
  text-decoration: none;
}
</style>
