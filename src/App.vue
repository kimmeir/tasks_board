<template>
    <div id="app">
        <nav-bar/>
            <router-view/>
    </div>
</template>
<script>
    import navBar from '@/components/sa-navbar'

    export default {
        components: {
            navBar
        },
        mounted() {

            this.$store.dispatch('fetchTasks');
        }
    }
</script>
<style lang="scss">
    @import "~materialize-css/dist/css/materialize.min.css";
</style>

