<template>
    <nav class="d-flex">
            <h3>Testy</h3>
        <ul >
            <li>
                <router-link to="/home">
dahsborad1
                </router-link>
            </li>
            <li>
                <router-link to="/login">
                    logowanie
                </router-link>
            </li>
            <li>
                <router-link to="/register">
                    rejestracja
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>

</style>
