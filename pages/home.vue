<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <pageTitle pageTitle="Home" />
      <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
     <div v-if="!loading">
       <p v-if="error" class="red--text">{{error}}</p>
      <v-card-title> {{user.name}}</v-card-title>
      <v-card-text class="marshall--text">
        <p>Name : {{user.name}}</p>
        <p>Phone : {{user.phone}}</p>
        <p>Email : {{user.email}}</p>
        <p>Gender : {{user.gender}}</p>
        <p>Location Location : {{user.location ? user.location.name : "loading..."}}</p>
        <p>Date/Time : {{user.location ? new Date(user.location.dateTime) : "loading..."}}</p>
      
      </v-card-text>
      <v-card-actions>
           Address :  <v-text-field
                v-model="address"
                label=""
                required
                ></v-text-field> 
        <v-btn
                color="marshall"
                class="ml-2 white--text"
                @click="updateLocation"
                >
                Update Location
                </v-btn>
      </v-card-actions>
    </div>

  </v-layout>
</template>

<script>

export default {
  middleware:[
    'checkAuth',    
    'Auth'
    ],
    data(){
      return {
        address : '',
        error : ''
      }
    },
    computed : {
      user(){
        return this.$store.state.singleUser
      },
      location(){
        return this.$store.state.location
      },
        err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods:{
      updateLocation(){
        if(!this.address){
          this.error = "You must enter a name for this address"
          return
        }
        return this.$store.dispatch('updateMyLocation', this.address).then( () => {
          if(!this.err){
            this.$router.push(`/locations?lon=${this.user.location.coordinates[0]}&lat=${this.user.location.coordinates[1]}`);
            this.error  = ""
          }
        })
      }, 
      
    },
    mounted(){
        return this.$store.dispatch('getTeam')
      }
}
</script>
