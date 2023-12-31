<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <v-form ref="form">
                        <h1 class="headline">New User</h1>
                        <v-divider class="mb-3" />
                            <div v-if="errors">
                                <Error :errors="errors" />
                            </div>
                            <v-text-field label="Name"
                                v-model="user.name" />
                            <v-text-field label="E-mail"
                                v-model="user.email"
                                :rules="emailRules" />
                            <v-text-field label="Password"
                                v-model="user.password" type="password" />
                            <v-select label="Profile"
                                v-model="user.profiles"
                                :items="profiles"
                                item-value="id"
                                item-text="label"
                                attach multiple
                                chips deletable-chips />
                            <v-btn class="ml-0 mt-3"
                                @click="getProfiles">
                                Get Profile
                            </v-btn>
                            <v-btn color="primary" class="ml-0 mt-3"
                                @click="newUser">
                                New User
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
                        <v-text-field label="Email" readonly
                            v-model="data.email" />
                        <v-text-field label="Profile" readonly
                            :value="labelsProfiles" />
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
            user: {},
            profiles: [],
            data: null,
            errors: null,
            emailRules: [
                v => !v || /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
        }
    },
    computed: {
        labelsProfiles() {
            return this.data && this.data.profiles &&
                this.data.profiles.map(p => p.label).join(', ')
        },
        selectedProfiles() {
            if(this.user.profiles) {
                return this.user.profiles.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
        newUser() {
            if (!this.$refs.form.validate()) {
                this.errors = ["Invalid data"]
                return
            }
            this.$api.mutate({
                mutation: gql`
                    mutation(
                        $name: String!
                        $email: String!
                        $password: String!
                        $profiles: [ProfileFilter]
                    ) {
                        newUser(data: {
                            name: $name
                            email: $email
                            password: $password
                            profiles: $profiles
                        }) {
                            id
                            name
                            email
                            profiles {
                                id
                                label
                            }
                        }
                    }
                `,
                variables: {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    profiles: this.selectedProfiles
                }
            }).then(result => {
                this.data = result.data.newUser
                this.user = {}
                this.errors = null
            }).catch(e => {
                this.errors = e
            })
        },
        getProfiles() {
            this.$api.query({
                query: gql`{ profiles { id label } }`
            }).then(result => {
                this.profiles = result.data.profiles
                this.errors = null
            }).catch(e => {
                this.errors = e
            })
        }
    }
}
</script>

<style>

</style>
