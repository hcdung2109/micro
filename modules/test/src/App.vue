<template>
  <div id="app">
    <nav>
      <router-link to="/web/vue3">Home</router-link>
      <router-link to="/web/vue3/hello">Hello</router-link>
    </nav>
    <router-view></router-view>
    <Loader />
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

<style scoped></style>
