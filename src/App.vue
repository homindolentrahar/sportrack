<template>
  <div class="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: { Navigation },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.app {
  @apply w-full min-h-screen bg-slate-900 text-slate-50 box-border;
}
</style>
