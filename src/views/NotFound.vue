<template>
  <b-card>
    <b-card-title>
      <h1 class="display-1">
        Błąd 404
      </h1>
      <p>Podana strona nie istnieje</p>
      <router-link tag="button" class="btn btn-primary" to="/"
        >Strona główna</router-link
      >
    </b-card-title>
  </b-card>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped></style>
