<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { PlusIcon, RunIcon } from "vue-tabler-icons";
import { useStore } from "../store/index";

const store = useStore();
const user = ref(null);

watchEffect(() => {
  user.value = store.user;
});

const logout = () => {
  store.logout();

  router.replace({
    name: "Home",
  });
};
</script>

<template>
  <header class="bg-transparent text-slate-50 border-b border-slate-800">
    <nav
      class="container py-6 px-8 flex flex-col gap-4 items-center sm:flex-row"
    >
      <router-link :to="{ name: 'Home' }" class="flex items-center gap-x-4">
        <RunIcon class="w-6 h-6 text-slate-500" />
        <h1 class="text-lg font-semibold">Sportrack</h1>
      </router-link>
      <ul
        class="flex flex-1 justify-end items-center gap-x-8 text-sm font-semibold"
      >
        <router-link class="cursor-pointer py-2.5 px-5" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link
          v-if="user"
          class="cursor-pointer bg-rose-500 rounded py-2.5 px-5 flex items-center gap-2 hover:bg-rose-600 transition-all duration-200"
          :to="{ name: 'Create' }"
        >
          <PlusIcon class="w-4 h-4" />
          Create</router-link
        >
        <router-link v-if="!user" class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <router-link
          v-if="!user"
          class="cursor-pointer bg-emerald-500 rounded py-2.5 px-5 flex items-center gap-2 hover:bg-emerald-600 transition-all duration-200"
          :to="{ name: 'Register' }"
          >Register</router-link
        >
        <li v-if="user" @click="logout" class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<style></style>
