<template>
    <v-container fluid>
        <v-layout>
            <v-flex>
                <v-layout column class="ma-3">
                    <h1 class="headline">Filter User</h1>
                    <v-divider class="mb-3" />
                    <div v-if="errors">
                        <Error :errors="errors" />
                    </div>
                    <v-text-field label="ID"
                        v-model.number="filter.id" />
                    <v-text-field label="E-mail"
                        v-model="filter.email" />

                    <h1 class="mt-4 headline">Change User</h1>
                    <v-divider class="mb-3" />
                    <v-text-field label="Name"
                        v-model="user.name" />
                    <v-text-field label="E-mail"
                        v-model="user.email" />
                    <v-text-field label="Password"
                        v-model="user.Password" type="password" />
                    <v-select label="Profile"
                        v-model="user.profile"
                        :items="profile"
                        item-value="id"
                        item-text="label"
                        attach multiple
                        chips deletable-chips />
                    <v-btn class="ml-0 mt-3"
                        @click="getProfiles">
                        Get Profile
                    </v-btn>
                    <v-btn color="primary" class="ml-0 mt-3"
                        @click="changeUser">
                        Change User
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
                        <v-text-field label="profile" readonly
                            :value="labelProfiles" />
                    </template>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Error from '../common/Error'

export default {
    components: { Error },
    data() {
        return {
            filter: {},
            user: {},
            profile: [],
            data: null,
            errors: null
        }
    },
    computed: {
        labelProfiles() {
            return this.data && this.data.profile &&
                this.data.profile.map(p => p.label).join(', ')
        },
        selectedProfiles() {
            if(this.user.profile) {
                return this.user.profile.map(id => ({ id }))
            } else {
                return null
            }
        }
    },
    methods: {
        changeUser() {
            // Implement
        },
        getProfiles() {
            // implement
        }
    }
}
</script>

<style>

</style>
