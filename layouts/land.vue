<template>
  
  <div class>
      <v-toolbar height="100" class="white--text" dark > 
      <v-toolbar-title><span class="title">HaiTracker</span> </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!user" text @click="login">Login</v-btn>
        <v-btn v-if="!user" text @click="signup">Sign Up</v-btn>
        <v-btn v-if="user" text @click="userGo">Go to my account</v-btn>
      </v-toolbar-items>

      <!-- <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template> -->
    </v-toolbar>
      <v-parallax :src="image"  height="1000">
          <h1 class="white--text text-center" > Find Your Friends</h1>
      </v-parallax>
    <h3 class="down">&copy; Marshall Technology&trade; 2020 </h3>      

  </div>
</template>
<script>
export default {
   middleware:[
    'checkAuth',
    ],
    data(){
        return {
            image : require('../assets/map.png')
       }    
},
computed:{
  user(){
    return this.$store.getters.user
  }
},
methods:{
  login(){
    this.$router.push('/auth/login')
  },
  signup(){
    this.$router.push('/auth/signup')
  },
  userGo(){
    this.$router.push('/home')
  }
}
   
}
</script>
<style>

.title{
    color :  white;
  text-shadow: 0 0 3px white,
               0 0 6px white,
               0 0 9px white,
               0 0 12px white,
               0 0 15px white,
               0 0 18px white,
               0 0 21px white;
  
  font-weight: bolder;  
  font-family: 'Courier New', Courier, monospace;
  padding: 10px;  
}
.down{
  color : purple;
  text-align: center;
  width : 100%;
  padding-bottom: 3px;
  margin-top: -40px
}
</style>
