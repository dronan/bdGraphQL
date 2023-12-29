<template>
    <div v-if="itens">
        <v-alert v-for="i in itens"
            :key="i.message" :value="true" type="error">
            {{ i.message }}
        </v-alert>
    </div>
</template>

<script>
export default {
    props: ['errors'],
    computed: {
        itens() {
            if(!this.errors) return null
            const e = this.errors

            const itens = []
            if(e.graphQLErrors) {
                itens.push(...e.graphQLErrors)
            } else {
                e.forEach(item => {
                    if (typeof item === 'string') {
                        itens.push({ message: item });
                    } else if (item instanceof Object) {
                        console.log(item);
                        itens.push(item);
                    }
                });
            }

            if(itens.length === 0) {
                itens.push({
                    message: 'Error! Did you fill the form?'
                })
            }

            return itens
        }
    }
}
</script>

<style>

</style>
