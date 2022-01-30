<template>
  <header class="bg-transparent text-slate-50 border-b border-slate-800">
    <nav
      class="container py-6 px-8 flex flex-col gap-4 items-center sm:flex-row"
    >
      <div class="flex items-center gap-x-4">
        <RunIcon class="w-6 h-6 text-slate-500" />
        <h1 class="text-lg font-semibold">Sportrack</h1>
      </div>
      <ul
        class="flex flex-1 justify-end items-center gap-x-8 text-sm font-semibold"
      >
        <router-link class="cursor-pointer py-2.5 px-5" :to="{ name: 'Home' }"
          >Home</router-link
        >
        <router-link
          class="cursor-pointer bg-rose-500 rounded py-2.5 px-5 flex items-center gap-2 hover:bg-rose-600 transition-all duration-200"
          :to="{ name: '' }"
        >
          <PlusIcon class="w-4 h-4" />
          Create</router-link
        >
        <router-link class="cursor-pointer" :to="{ name: 'Login' }"
          >Login</router-link
        >
        <li class="cursor-pointer">Logout</li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { PlusIcon, RunIcon } from "vue-tabler-icons";

export default {
  name: "Navigation",
  components: { PlusIcon, RunIcon },
  setup() {
    return {};
  },
};
</script>

<style></style>
