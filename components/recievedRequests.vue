<template>
    <div class="container">
        <v-layout row wrap class="mx-auto">
            <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
            <card  :sent="false" v-for="(request, key) in requests" :key="key" :request="request"/>
        </v-layout>
    </div>
</template>
<script>
import card from '~/components/cards/requestCard';
export default {
     components : {card},
    computed: {
        requests(){
            return this.$store.state.recievedRequests
        },
         err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    mounted(){
        return this.$store.dispatch('getRecievedRequests')
        
    }
}
</script>
