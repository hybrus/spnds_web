<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <div>
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" v-model="name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" v-model="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="password" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Password Confirmation</label>
                                <input type="password" v-model="password_confirmation" class="form-control">
                            </div>
                            <button @click.prevent="register" class="btn btn-primary btn-block mt-3">REGISTER</button>
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
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    },

    methods: {
        register() {
            let name = this.name
            let email = this.email
            let password = this.password
            let password_confirmation = this.password_confirmation
            this.$store
                .dispatch("REGISTER", {
                    name,
                    email,
                    password,
                    password_confirmation,
                })
                .then(() => this.$router.push("/"))
                .catch(err => console.log(err))
        }
    }

}
</script>