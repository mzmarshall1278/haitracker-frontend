<template>
  
  <div class>
      <v-toolbar height="100" class="marshall"  black> 
      <v-toolbar-title><span class="tile">HaiTracker</span> </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text @click="login">Login</v-btn>
        <v-btn text>Sign Up</v-btn>
        <!-- <v-btn text>About</v-btn> -->
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
      

  </div>
</template>
<script>
export default {
    data(){
        return {
            image : require('../assets/map.png')
        }
    
},
methods:{
  login(){
    this.$router.push('/auth/login')
  }
}
   
}
</script>
<style>
.tile{
    color :  #400379;
  text-shadow: 0 0 3px white,
               0 0 6px white,
               0 0 9px white,
               0 0 12px white,
               0 0 15px white,
               0 0 18px white,
               0 0 21px white;
  font-size: 1.5em;
  font-weight: bolder;  
  padding: 10px;  
}
</style>
