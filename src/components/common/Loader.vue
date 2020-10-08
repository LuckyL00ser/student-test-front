<template>
  <transition name="loading">
    <div class="position-absolute loader" v-if="loading">
      <b-spinner
        variant="primary"
        class="spinner"
        style="width: 3rem; height: 3rem;"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loader",
  props: ["loading"]
};
</script>

<style scoped>
.loader {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 200;
}
.spinner {
  position: absolute;
  top: 50%;
  right: 50%;
}
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: all 1.3s ease;
}
.loading-fade-enter,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
