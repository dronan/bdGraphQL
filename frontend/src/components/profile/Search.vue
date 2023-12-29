<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Search Profile</h1>
                    <v-divider class="mb-3" />
                        <div v-if="errors">
                            <Error :errors="errors" />
                        </div>
                        <v-text-field label="ID"
                            v-model.number="filter.id" />
                        <v-text-field label="Name"
                            v-model="filter.name" />
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
                        <v-text-field label="Label" readonly
                            v-model="data.label" />
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
            errors: null
        }
    },
    computed: {
        labelProfiles() {
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
                        $name: String) {
                        profile( 
                            filter: {
                                    id: $id, 
                                    name: $name 
                                    }
                            ){
                                id
                                name
                                label
                            }
                    }
                `,
                fetchPolicy: 'network-only',
                variables: {
                    id: this.filter.id || null,
                    name: this.filter.name || null,
                }
            }).then((result) => {
                this.data = result.data.profile
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
