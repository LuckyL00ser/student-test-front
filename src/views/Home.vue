<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <Loader :loading="loading"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Loader from "../components/common/Loader";

export default {
  name: "Home",
  components: {
    Loader,
    HelloWorld
  },
  data(){
    return{
      loading: false
    }
  },
};
</script>
