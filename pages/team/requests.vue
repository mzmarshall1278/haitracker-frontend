<template>
    <div class="container">
       
 <PageTitle pageTitle = "Requests" class="mb-2"/>
  <v-card color="marshall">
    

    <v-tabs
      v-model="tab"
      color="marshall"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item >
        <sent />
      </v-tab-item>

      <v-tab-item >
        <recieved />
      </v-tab-item>
    </v-tabs-items>
  </v-card>


    </div>
</template>
    
<script>
    import sent from '~/components/sentRequests'
    import recieved from '~/components/recievedRequests'
  export default {
    middleware:[
    'checkAuth',    
    'Auth'
    ],
      components : { sent, recieved},
    data () {
      return {
        tab: null,
        items: [
          'Sent', 'Recieved'
        ],
      }
    },
  }
</script>
