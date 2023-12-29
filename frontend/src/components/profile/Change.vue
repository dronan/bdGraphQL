<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filter Profile</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Error :errors="errors" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="Name"
                        v-model="filter.name" />

                    <h1 class="mt-4 headline">Change Profile</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Name"
                        v-model="profile.name" />
                    <v-text-field label="Label"
                        v-model="profile.label" />

                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="changeProfile">
                        Change Profile
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
            profile: {},
            data: null,
            errors: null
        }
    },
    methods: {
        changeProfile() {
            this.$api.mutate({
                mutation: gql`
                    mutation(
                        $idFilter: Int
                        $nameFilter: String
                        $name: String!
                        $label: String!
                    ) {
                        updateProfile(
                            filter: {
                                id: $idFilter
                                name: $nameFilter
                            }
                            data: {
                                name: $name
                                label: $label
                            }) {
                            id
                            name
                            label
                        }
                    }
                `,
                variables: {
                    idFilter: this.filter.id || null,
                    nameFilter: this.filter.name || null,
                    name: this.profile.name,
                    label: this.profile.label,
                }
            }).then(result => {
                this.data = result.data.updateProfile
                this.filter = {}
                this.profile = {}
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
