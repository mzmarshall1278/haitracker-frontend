<template>
    <div class="container">
        <pageTitle pageTitle ="Login" class="my-2"></pageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-card class="mx-auto pa-10 ">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>


                <v-text-field
                v-model="password"
                type="password"
                :rules="passwordRules"
                label="password"
                required
                ></v-text-field>


                <v-btn
                :disabled="!valid"
                color="marshall"
                class="mr-4 white--text"
                type="submit"
                >
                Sign Up
                </v-btn>
                <nuxt-link to="/auth/signup" class="marshall--text "> Don't have account? </nuxt-link>
                
            </v-form>
        </v-card>
    </div>
  
</template>
<script>
  export default {
    data: () => ({
      valid: true,
 
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password:'',
      passwordRules:[
        v => !!v || 'Password is required',
        v => (v && v.length >= 10 && v.length <= 32) || 'password must be between 10-32 characters',
      ],

    })
  ,
     
    computed:{
      err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.snackbar = true

          const cred = {
              email: this.email,
              password : this.password
          }
          
          return this.$store.dispatch('login', cred ).then(()=>{
            this.$router.push('/home')
            this.$refs.form.reset()
          })
          
        }
      },
    
    },
  }
</script>