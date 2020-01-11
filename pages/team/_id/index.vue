<template>
        <div class="container">
            <PageTitle :pageTitle="`${user.userId.name}`" />
    <myMap :user="user"  />
    <div class="container marshall--text">
        <p>Name: {{user.userId.name}}</p>
        <p>Gender: {{user.userId.gender}}</p>
        <p>User is your: {{user.personIs}}</p>
        <p>Last Location: {{user.userId.location.name}}</p>
        <p>Time: {{ new Date(user.userId.location.dateTime)}}</p>
    </div>
        </div>
</template>
<script>
import myMap from '~/components/singleMap'
export default {
    middleware:[
    'checkAuth',    
    'Auth'
    ],
    components : {myMap},
    data(){
        return {
            position : ''
        }
    },
    computed: {
        user(){
            return this.$store.getters.getUser(this.id)
        },
        id(){
            return this.$route.params.id
        }
        
    },
    methods : {
        
    },
 mounted(){
     //return this.$store.dispatch('getTeam')
 }   
}
</script>
