<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 shadow rounded">

          <div v-if="!!user" class="card-body">

            <p v-for="(key, i) in Object.keys(user)" :key="i">
              {{ key }}: {{ user[key] }}
            </p>

            <button @click="logout" class="btn btn-primary btn-md mt-3">LOGOUT</button>
          </div>

          <div v-else class="card-body">
            <p>No user logged in . . . .</p>
            <router-link to="/login" class="btn btn-primary btn-md mt-3">LOGIN</router-link>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    user: function () {
      return this.$store.getters.user;
    }
  },

  methods: {
    logout: function () {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login");
      });
    }
  }

}
</script>