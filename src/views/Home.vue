<template>
  <div class="w-full h-full p-10 flex flex-col justify-center items-center">
    <h1 class="text-lg text-slate-200">
      Hello, <span class="font-bold">{{ user }}</span>
    </h1>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useStore } from "../store/index";

export default {
  name: "Home",
  setup() {
    const store = useStore();
    const user = ref(null);

    watchEffect(() => {
      user.value = store.user ? store.user.email : "Guest";
    });

    return { user };
  },
};
</script>

<style></style>
