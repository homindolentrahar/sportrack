<script setup>
import { RunIcon } from "vue-tabler-icons";

const props = defineProps({
  item: Object,
});
</script>

<template>
  <router-link
    :to="{ name: 'Workout', params: { id: item.id } }"
    class="flex flex-col relative justify-center items-center gap-4 rounded-lg border-2 border-slate-800 p-8 hover:bg-slate-800 hover:bg-opacity-25 hover:scale-105 transition-all duration-200 group"
  >
    <div
      class="absolute right-2 top-2 rounded py-1.5 px-3 bg-sky-500 bg-opacity-25"
    >
      <h6 class="text-sm text-sky-500 font-bold capitalize">{{ item.type }}</h6>
    </div>
    <RunIcon v-if="item.type === 'cardio'" class="w-8 h-8 text-slate-200" />
    <svg
      v-if="item.type === 'strength'"
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-barbell w-8 h-8 text-slate-200"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M2 12h1"></path>
      <path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2"></path>
      <path
        d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
      ></path>
      <path d="M9 12h6"></path>
      <path
        d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z"
      ></path>
      <path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2"></path>
      <path d="M22 12h-1"></path>
    </svg>

    <h1 class="text-xl text-slate-50 font-bold">{{ item.name }}</h1>
    <p class="text-slate-400 text-sm">
      <span class="font-bold">{{ item.exercises.length }}</span> Exercises
    </p>
  </router-link>
</template>

<style></style>
