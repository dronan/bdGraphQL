<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Search User</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Error :errors="errors" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filter.id" />
                        <v-text-field label="E-mail"
                            v-model="filter.email" />
                        <v-btn color="primary" class="ml-0 mt-3"
                            @click="search">
                            Search
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
                        <v-text-field label="Profile" readonly
                            :value="profileLabels" />
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
            profile: [],
            data: null,
            errors: null
        }
    },
    computed: {
        profileLabels() {
            return this.data && this.data.profiles &&
                this.data.profiles.map(p => p.label).join(', ')
        }
    },
    methods: {
        search() {
            this.$api.query({
                query: gql`
                    query(
                        $id: Int, 
                        $email: String) {
                        user( 
                            filter: {
                                    id: $id, 
                                    email: $email 
                                    }
                            ){
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
                fetchPolicy: 'network-only',
                variables: {
                    id: this.filter.id || null,
                    email: this.filter.email || null,
                }
            }).then((result) => {
                this.data = result.data.user
                this.filter = {}
                this.errors = null
            }).catch(e => {
                this.errors = e
                this.data = null
            })
        }
    }
}
</script>

<style>

</style>
