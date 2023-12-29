<template>
    <v-container fluid>
        <v-layout column>
            <v-flex>
                <v-btn color="primary" class="ml-0 mb-4"
                    @click="getProfiles">
                    Get Profiles
                </v-btn>
            </v-flex>
            <v-flex>
                <div v-if="errors" class="mb-4">
                    <Error :errors="errors" />
                </div>
            </v-flex>
            <v-flex>
                <v-data-table :headers="headers" :items="profiles" 
                    hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.label }}</td>
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
            profiles: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Label', value: 'label' },
            ],
        }
    },
    methods: {
        getProfiles() {
            this.$api.query({
                query: gql`
                    query {
                        profiles {
                            id
                            name
                            label
                        }
                    }
                `,
                fetchPolicy: 'network-only'
            }).then(( result ) => {
                this.errors = null
                this.profiles = result.data.profiles
            }).catch(err => {
                this.profiles = []
                this.errors = err.graphQLErrors
            })
        }
    }
}
</script>

<style>

</style>
