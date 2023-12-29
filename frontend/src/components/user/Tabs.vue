<template>
    <v-container fluid>
        <v-tabs color="grey lighten-3"
            slider-color="blue">
            <v-tab ripple>
                List
            </v-tab>
            
            <v-tab ripple>
                Search
            </v-tab>

            <v-tab ripple>
                New
            </v-tab>

            <v-tab ripple>
                Change
            </v-tab>

            <v-tab ripple>
                Delete
            </v-tab>

            <v-tab-item>
                <List />
            </v-tab-item>

            <v-tab-item>
                <Search />
            </v-tab-item>

            <v-tab-item>
                <New />
            </v-tab-item>
            
            <v-tab-item>
                <Change />
            </v-tab-item>
            
            <v-tab-item>
                <Delete />
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import List from './List'
import Search from './Search'
import New from './New'
import Change from './Change'
import Delete from './Delete'

export default {
    components: { List, Search, New, Change, Delete }
}
</script>

<style>

</style>
