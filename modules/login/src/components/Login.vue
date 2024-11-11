<template>
  <form class="form-signin" @submit.prevent="login">
    <img
      class="mb-4"
      src="../assets/brand/bootstrap-solid.svg"
      alt=""
      width="72"
      height="72"
    />
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input
      type="text"
      id="inputEmail"
      class="form-control"
      placeholder="Username"
      required
      autofocus
      v-model="username"
    />
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required
      v-model="password"
    />
    <!--    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="1" v-model="remember"> Remember me
      </label>
    </div>-->
    <button class="btn btn-lg btn-primary btn-block" type="submit">
      Sign in
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      username: "",
      password: "",
      remember: false,
      isLoggedIn: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: this.username,
          password: this.password,
        });

        // Save tokens and user info to localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            image: response.data.image,
          })
        );

        this.isLoggedIn = true;
        //this.user = JSON.parse(localStorage.getItem('user'));

        const redirect = this.$route.query.redirect || "/dashboard"; // Default to home if no redirect query
        this.$router.push(redirect);
      } catch (error) {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
        // Handle error (e.g., show error message)
      }
    },
    checkLogin() {
      // Check if the token exists in localStorage
      const token = localStorage.getItem("accessToken");
      if (token) {
        this.isLoggedIn = true; // User is already logged in
        //window.location.href = "/#/dashboard";
        const redirect = this.$route.query.redirect || "/dashboard"; // Default to home if no redirect query
        this.$router.push(redirect);
      }
    },
    logout() {
      // Clear the token from localStorage
      localStorage.removeItem("accessToken");
      this.isLoggedIn = false;
    },
  },
};
</script>

<style scoped>
@import "../assets/signin.css";
</style>
