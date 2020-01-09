<template>
    <v-flex  xs12 sm6 md4 pa-1>
        <v-card class="mx-auto" max-width="700"> 
            <v-card-text class="marshall--text py-1">
                <h3 class="title">Persons Name</h3>
            <p>This Person is your whatever</p>
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
    props: ['sent'],
    methods : {
        processRequest(bool){
            return this.$store.dispatch('processRequest', bool)
        },
        cancelRequest(){
            this.processRequest('no')
        }, 
        accept(){
            this.processRequest('yes')
        }, 
        decline(){
            this.processRequest('no')
        },
    }
}
</script>
