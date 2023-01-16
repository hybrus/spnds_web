<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <div>
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" v-model="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="password" class="form-control">
                            </div>
                            <button @click.prevent="login" class="btn btn-primary btn-block mt-3">LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            email: '',
            password: ''
        }
    },

    methods: {
        login() {
            let email = this.email
            let password = this.password
            this.$store
                .dispatch("LOGIN", {
                    email,
                    password
                })
                .then(() => this.$router.push("/"))
                .catch(err => console.log(err))
        }
    }

}
</script>