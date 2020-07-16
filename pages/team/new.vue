<template>
    <div class="container">
        <pageTitle pageTitle="Add new member" />
        <ErrorTip :text="err" v-if="err" />
        <OverLay :loading="loading" />
    <v-card class="mx-auto pa-10">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="submit"
            >

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-select
                :items="relations"
                label="What are you to this person"
                item-value="text"
                v-model="youAre"
                ></v-select>

                <v-select
                :items="relations"
                label="Who is this person to you"
                item-value="text"
                v-model="personIs"
                ></v-select>

                <v-btn
                :disabled="!valid"
                color="marshall"
                class="mr-4 white--text"
                type="submit"
                >
                Send Request
                </v-btn>


            </v-form>
        </v-card>

    </div>
</template>
<script>
export default {
    middleware:[
    'checkAuth',
    'Auth'
    ],
    data(){
        return {
            relations: [
              { text: 'Father' }, { text: 'Mother' }, { text: 'Brother' },{ text: 'Sister' },{ text: 'Husband' },{ text: 'Wife' },{ text: 'Son' },{ text: 'Daughter' },{ text: 'Boss' },{ text: 'Employee' },{ text: 'Friend' },{ text: 'Mentor' },{ text: 'Cousin' },{ text: 'Nephew' },{ text: 'Niece' },{ text: 'Uncle' },{ text: 'Aunty' },{ text: 'Grand Father' },{ text: 'Grand Mother' },{ text: 'Grand Son' },{ text: 'Grand Daughter' },{ text: 'Others' },
            ],
            youAre : "", personIs : "", email : "",
            emailRules: [
                         v => !!v || 'E-mail is required',
                         v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                        ], valid: true

        }

    },
    computed : {
        err(){
        return this.$store.getters.error
      },
      loading(){
        return this.$store.getters.loading
      }
    },
    methods: {
        submit () {
        if (this.$refs.form.validate()) {
          this.snackbar = true

          const cred = {
              searchedUser : this.email,
              personIs : this.personIs,
              youAre : this.youAre,
          }

            return this.$store.dispatch('requestConnection', cred ).then(()=>{
                if(!this.err){
                    this.$router.push('/team')
                this.$refs.form.reset()
                }
          })

            }
        }
    }
}
</script>
