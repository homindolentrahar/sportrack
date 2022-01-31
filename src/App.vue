<template>
  <div v-if="appReady" class="app">
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { useStore } from "./store/index";
import { storeToRefs } from "pinia";

export default {
  name: "App",
  components: { Navigation },
  setup() {
    const store = useStore();
    const { appReady, user } = storeToRefs(store);

    // const user = supabase.auth.user();

    if (!user.value) {
      // appReady.value = true;
      store.$patch((state) => {
        state.appReady = true;
      });
    }

    // supabase.auth.onAuthStateChange((_, session) => {
    //   store.$patch((state) => {
    //     state.user = session.user;
    //   });

    //   appReady.value = true;
    // });
    store.authStateChange();

    return { appReady };
  },
};
</script>

<style scoped>
.app {
  @apply w-full min-h-screen bg-slate-900 text-slate-50 box-border;
}
</style>
