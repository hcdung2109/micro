<template>
  <div id="app">
    <router-view></router-view>
    <!--<Loader />-->
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "App",
  components: {
    Loader,
  },
};
</script>

<style scoped>
  @import "assets/dashboard.css";
</style>
