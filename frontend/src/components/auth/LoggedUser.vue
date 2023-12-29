<template>
    <v-card v-if="user" class="ma-3 pa-2">
        <v-layout fill-height align-center>
            <v-flex>
                <span class="ml-3 headline"><strong>Name: </strong></span>
                <span class="headline blue--text text--darken-2">
                    {{ user.name }}</span>

                <span class="ml-3 headline"><strong>Email: </strong></span>
                <span class="headline blue--text text--darken-2">
                    {{ user.email }}</span>

                <span class="ml-3 headline"><strong>Profile: </strong></span>
                <span class="headline red--text text--darken-2">
                    {{ profile }}</span>
            </v-flex>
            <v-flex>
            </v-flex>
            <v-flex shrink>
                <v-btn color="error"
                    @click="setUser(null)">
                    Logoff
                </v-btn>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user']),
        profile() {
            if(!this.user && !this.user.profile) return null
            return this.user.profile.map(p => p.name).join(', ')
        }
    },
    methods: mapActions(['setUser'])
}
</script>

<style>

</style>
