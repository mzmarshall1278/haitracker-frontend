<template>
    <div class="container">
        <pageTitle pageTitle="My Team" />
        <!-- <ErrorTip :text="err" v-if="err" /> -->
        <!-- <OverLay :loading="loading" /> -->
        <v-layout row wrap class="mx-auto my-2 ">
            <v-btn class="marshall--text" @click="newMember">Add Member</v-btn>    
        </v-layout>    
        <v-layout row wrap class="mx-auto">
            <card v-for="(member, key) in members" :key="key" :member="member" />
        </v-layout>

    </div>
</template>
<script>
import card from '~/components/cards/memberPreview'
export default {
    middleware:[
    'checkAuth',    
    'Auth'
    ],
    components: {
        card : card
    },
    data(){
        return {

        }
    },
    computed :{
        members(){
            return this.$store.state.members
        },
        err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods :{
        newMember(){
            this.$router.push('/team/new')
        }
    }
}
</script>
