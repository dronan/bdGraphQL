<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="getUsers">
                    Get Users
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="errors" class="mb-4">
                    <Error :errors="errors" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="users" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.profiles
                                .map(p => p.name)
                                .join(', ') }}</td>
                    </template>
                </v-data-table>
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
            errors: null,
            users: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'E-mail', value: 'email' },
                { text: 'Profile', value: 'profile' },
            ],
        }
    },
    methods: {
        getUsers() {
            this.$api.query({
                query: gql`
                    query {
                        users {
                            id
                            name
                            email
                            profiles {
                                id
                                name
                            }
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(( result ) => {
                this.errors = null
                this.users = result.data.users
            }).catch(err => {
                this.users = []
                this.errors = err.graphQLErrors
            })
        }
    }
}
</script>

<style>

</style>
