<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <pageTitle pageTitle="Home" />
  </v-layout>
</template>

<script>


export default {
  middleware:[
    'checkAuth',    
    'Auth'
    ],
  components: {
   
  }
}
</script>
