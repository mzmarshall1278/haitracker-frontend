<template>
    <v-flex xs12 sm6 pa-1>
        <v-card
            class="mx-auto"
            max-width="500"
        >
         <v-card-text class="title marshall--text text-center">
            <p>Name : {{member.userId.name}}</p>
            <p>Relationship : {{member.personIs}}</p>
            </v-card-text>
            <v-card-actions>
            <v-btn
                text
                color="marshall marshall"
                @click="loadThis"
            >
                View
            </v-btn>
            </v-card-actions>
           
        </v-card>   
    </v-flex>
</template>
<script>
export default {
    props : ['member'],
    methods : {
        loadThis(){
            this.$router.push(`/team/${this.member._id}`)
        }
    }
}
</script>

