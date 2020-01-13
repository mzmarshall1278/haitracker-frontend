<template>
    <div class="container">
        <pageTitle pageTitle ="Create Account" class="my-2"></pageTitle>
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
        <v-card class="mx-auto pa-10">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >
               
                <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Full Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="place"
                :rules="placeRules"
                label="location : (At school, BUK Kano)"
                required
                ></v-text-field>

                <v-text-field
                v-model="number"
                type="number"
                :rules="numberRules"
                label="Phone Number"
                required
                ></v-text-field>

                <v-select
                :items="gen"
                label="Select Gender"
                item-value="text"
                v-model="gender"
                ></v-select>

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
                <nuxt-link to="/auth/login" class="marshall--text"> Already have account? </nuxt-link>
                
            </v-form>
        </v-card>
    </div>
  
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 5) || 'Full Name must be More than 5 characters',
      ],
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
      number : '',
      numberRules:[
        v => !!v || 'Number is required',
        v => (v && v.length >= 10) || 'Phone NUmber should be more than 10 characters',
      ],
      place : '',
      placeRules:[
        v => !!v || 'location is required',
        v => (v && v.length >= 10) || 'Description should be more than 10 characters',
      ],
      gender :"",
      gen: [
              { text: 'Male' },
              { text: 'Female' },
              { text: 'Others' },
            ]
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
              name : this.name,
              email : this.email, 
              gender : this.gender,
              phone : this.number,
              password : this.password,
              place : this.place
          }
          
          return this.$store.dispatch('signup', cred ).then(()=>{
            this.$router.push('/auth/login')
            this.$refs.form.reset()
          })
          
        }
      },
    
    },
  }
</script>