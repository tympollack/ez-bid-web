<template>
    <div>
        <v-btn
                :disabled="loading"
                :loading="loading"
                primary
                ripple
                @click.native="$emit('click')"
        >
            {{ name}}
        </v-btn>
        <span class="white--text">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "auction-control",

        props: {
            loading: Boolean,
            name: String
        }
    }
</script>

<style scoped>

</style>