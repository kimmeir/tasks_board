<template>
<div class="container">
    <h3 class="center">{{title}}</h3>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(name, i) of getUsers">
            <td>{{i+1}}</td>
            <td>{{name}}</td>
        </tr>

        </tbody>
    </table>
</div>
</template>

<script>
    export default {
        data:()=>({
        }),
        computed:{
            getUsers(){
                return this.$store.getters.getUsers
            },
            title() {
                return this.$route.name;
            }
        }
    }
</script>

<style scoped>

</style>
