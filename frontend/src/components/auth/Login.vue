<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Login</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Error :errors="errors" />
                        </div>
                        <v-text-field label="E-mail"
                            v-model="user.email" />
                        <v-text-field label="Password"
                            v-model="user.password" type="password" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="login">
                            Login
                        </v-btn>
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
                        <v-text-field label="Token" readonly
                            v-model="data.token" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Error from '../common/Error'
import gql from 'graphql-tag'
export default {
    components: { Error },
    data() {
        return {
            user: {},
            data: null,
            errors: null
        }
    },
    computed: {
        profiles() {
            return this.data && this.data.profiles &&
                this.data.profiles.map(p => p.name).join(',')
        }
    },
    methods: {
        ...mapActions(['setUser']),
        login() {
            this.$api.query({
                query: gql`
                    query($email: String!, $password: String!){
                        login(data: {
                                email: $email, 
                                password: $password
                            }){
                            id
                            name
                            email
                            token
                            profiles {
                                id
                                name
                                label
                            }
                        }
                    }
                `,
                fetchPolicy: 'network-only',
                variables: {
                    email: this.user.email,
                    password: this.user.password,
                }
            }).then(({ data }) => {
                this.data = data.login
                this.errors = null
                this.setUser(this.data)
                this.user = {}
            }).catch(err => {
                this.data = null
                this.errors = err.graphQLErrors.map(e => e.message)
            })
        }
    }
}
</script>

<style>

</style>
