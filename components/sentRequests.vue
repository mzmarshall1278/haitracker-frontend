<template>
    <div class="container">
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />

        <v-layout row wrap class="mx-auto">
            <card  :sent="true" v-for="(request, key) in requests" :key="key" :request="request"/>

        </v-layout>
    </div>
</template>
<script>
import card from '~/components/cards/requestCard';
export default {
    components : {card},
    computed: {
        userId(){
            return this.$store.state.user
        },
        requests(){
            return this.$store.state.sentRequests
        },
          err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    mounted(){
        return this.$store.dispatch('getSentRequests');
    }
}
</script>
