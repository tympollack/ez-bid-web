<template>
    <v-card class="grey--text text--darken-2">
        <v-container
                grid-list-md
                text-xs-left
        >
                <v-layout
                        align-start
                        justify-start
                        row
                        wrap
                >
                    <v-flex
                            v-for="field in fields"
                            :key="field[0]"
                            xs12
                    >
                        <div>{{ field[0] }}: {{ field[1] }}</div>
                    </v-flex>
                </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "auction-card",

        props: {
            auction: {
                type: Object,
                required: true
            }
        },

        computed: {
            fields () {
                return Object.entries(this.auction)
            }
        }
    }
</script>

<style scoped>

</style>