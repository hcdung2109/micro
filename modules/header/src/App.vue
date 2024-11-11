<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a style="font-weight: bold" class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 text-center text-bold" href="/#/dashboard"
      >VNPT IT</a
    >
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <input
      class="form-control form-control-dark w-50"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" @click="logout">Sign out</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem("accessToken");
      this.isLoggedIn = false;
      window.location.href = "/";
    },
  },
};
</script>

<style scoped></style>
