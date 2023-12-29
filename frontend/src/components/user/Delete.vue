<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <v-form ref="form">
                        <h1 class="headline">Delete User</h1>
                        <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Error :errors="errors" />
                        </div>
                        <v-text-field label="ID" type="number"
                            v-model.number="filter.id" />
                        <v-text-field label="E-mail"
                            v-model="filter.email" 
                            :rules="emailRules" />

                        <v-btn color="error" class="ml-0 mt-3"
                            @click="deleteUser">
                            Delete User
                        </v-btn>
                    </v-form>
                </v-layout>
            </v-flex>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Result</h1>
                    <v-divider />
                    <template v-if="data">
                        <v-text-field label="ID" readonly
                            v-model="data.id" />
                        <v-text-field label="Name" readonly
                            v-model="data.name" />
                        <v-text-field label="E-mail" readonly
                            v-model="data.email" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Error from '../common/Error'
import gql from 'graphql-tag'

export default {
    components: { Error },
    data() {
        return {
            filter: {},
            data: null,
            errors: null,
            emailRules: [
                v => !v || /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    methods: {
        deleteUser() {
            if (!this.$refs.form.validate()) {
                this.errors = ["Invalid data"]
                return
            }
            this.$api.mutate({
                mutation: gql`
                    mutation(
                        $id: Int
                        $email: String
                    ) {
                        deleteUser(
                            filter: {
                                id: $id
                                email: $email
                            }
                        ) {
                            id
                            name
                            email
                        }
                    }
                `,
                variables: {
                    id: this.filter.id || null,
                    email: this.filter.email || null
                }
            }).then((resp) => {
                this.data = resp.data.deleteUser
                this.filter = {}
                this.errors = null
            }).catch((error) => {
                this.data = null
                this.errors = error.graphQLErrors
            })
        }
    }
}
</script>

<style>

</style>
