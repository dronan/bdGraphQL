<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Delete Profile</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Error :errors="errors" />
                    </div>
                    <v-text-field label="ID" type="number" 
                        v-model.number="filter.id" />
                    <v-text-field label="Name"
                        v-model="filter.name" />

                    <v-btn color="error" class="ml-0 mt-3"
                        @click="deleteProfile">
                        Delete Profile
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
    methods: {
        deleteProfile() {
            this.$api.mutate({
                mutation: gql`
                    mutation(
                        $id: Int
                        $name: String
                    ) {
                        deleteProfile(
                            filter: {
                                id: $id
                                name: $name
                            }
                        ) {
                            id
                            name
                            label
                        }
                    }
                `,
                variables: {
                    id: this.filter.id || null,
                    name: this.filter.name || null
                }
            }).then((resp) => {
                this.data = resp.data.deleteProfile
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
