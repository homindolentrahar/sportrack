<script setup>
import Navigation from "./components/Navigation.vue";
import { useStore } from "./store/index";
import { storeToRefs } from "pinia";

const store = useStore();
const { appReady, user } = storeToRefs(store);

if (!user.value) {
  store.$patch((state) => {
    state.appReady = true;
  });
}

store.authStateChange();
</script>

<template>
  <div v-if="appReady" class="app">
    <Navigation />
    <router-view />
  </div>
</template>

<style scoped>
.app {
  @apply w-full min-h-screen bg-slate-900 text-slate-50 box-border;
}
</style>
