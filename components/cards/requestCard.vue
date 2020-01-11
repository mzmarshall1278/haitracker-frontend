<template>
    <v-flex  xs12 sm6 md4 pa-1>
        <v-card class="mx-auto" max-width="700"> 
            <v-card-text class="marshall--text py-1">
                <h3 class="title">{{request.userId.name}}</h3>
            <p>This Person is your {{request.personIs}}</p>
            </v-card-text>
            <v-card-actions>
                <div v-if="sent">
                    <v-btn
                    text
                    color="marshall marshall"
                    @click="cancelRequest"
                    >
                        cancel request
                    </v-btn>
                </div>
                    
                <div v-else>
                    <v-btn
                    text
                    color="marshall marshall"
                    @click="accept"
                    >
                        Accept
                    </v-btn>
                    <v-btn
                    text
                    color="marshall marshall"
                    @click="decline"
                    >
                        Decline
                    </v-btn>
                </div> 
            </v-card-actions>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    props: ['sent', 'request'],
    data(){
        return {
            cred : {id : this.request.userId._id, youAre : this.request.youAre, personIs : this.request.personIs}
        }
    },
    methods : {

        redirect(){
            if(!this.err){
                this.$router.push('/team');
            }
        },
        cancelRequest(){
            return this.$store.dispatch('cancelRequest', this.cred).then(() => {
                this.redirect();
            })
        },
        accept(){
            return this.$store.dispatch('acceptRequest', this.cred).then(() => {
                this.redirect();
            })
        }, 
        decline(){
            return this.$store.dispatch('declineRequest', this.cred).then(() => {
                this.redirect();
            })
        },
    }
}
</script>
