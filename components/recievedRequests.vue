<template>
    <div class="container">
        <v-layout row wrap class="mx-auto">
            <card  :sent="false"/>
        </v-layout>
    </div>
</template>
<script>
import card from '~/components/cards/requestCard';
export default {
     components : {card},
    computed: {
        requests(){
            
        }
    },
    mounted(){
        return this.$store.dispatch('getRecievedRequests')
    }
}
</script>
