<template>
    <div>
        <nav class="deep-purple darken-1">
            <div class="nav-wrapper row valign-wrapper">
                <div class="col s9">
                    <ul id="nav-mobile" class="left">
                        <router-link
                                tag="li"
                                :to="{name:'Dashboard'}"
                                exact
                                active-class="active"
                        >
                            <a href="#">Dashboard</a>
                        </router-link>
                        <router-link
                                tag="li"
                                :to="{name:'Users'}"
                                active-class="active"
                        >
                            <a href="#">Users</a>
                        </router-link>
                    </ul>
                </div>
                <div class="col s3">
                    <router-link
                            :to="{name:'Create'}"
                            class="waves-effect waves-light btn-small sa-btn right">
                        Create new
                        <i class="small material-icons right">add</i>
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "sa-navbar"
    }
</script>

<style lang="scss" scoped>
    nav {
        padding: 0 20px;
        li {
            color: #fff;
        }
        .sa-btn{
            display: inline-flex;
            align-items: center;
            font-size: .7em;
        }
    }




</style>
