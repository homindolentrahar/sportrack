<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "../store/index";
import { MoodEmptyIcon } from "vue-tabler-icons";
import WorkoutItem from "../components/WorkoutItem.vue";

const store = useStore();
const user = ref(null);
const data = ref([]);
const loaded = ref(null);

const getAllWorkouts = async () => {
  try {
    const { data: workouts, error } = await store.getAllWorkouts();

    if (error) throw error;

    data.value = workouts;
    loaded.value = true;
  } catch (err) {
    console.log(error.message);
  }
};

watchEffect(() => {
  user.value = store.user ? store.user.email : "Guest";
  getAllWorkouts();
});
</script>

<template>
  <div v-if="loaded" class="container p-10">
    <!-- Empty -->
    <div
      v-if="data.length <= 0"
      class="w-full flex flex-col gap-2 items-center text-slate-400"
    >
      <MoodEmptyIcon class="w-8 h-8" />
      <h1 class="font-semibold">There are no workout records</h1>
      <router-link
        class="bg-rose-500 bg-opacity-25 rounded text-rose-500 font-semibold px-6 py-3 mt-6 hover:bg-opacity-40 transition-all duration-200"
        :to="{ name: 'Create' }"
        >Create Now</router-link
      >
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <WorkoutItem v-for="(item, index) in data" :key="index" :item="item" />
    </div>
  </div>
  <div v-else class="container p-10">
    <p class="text-center text-slate-200">Fetching data...</p>
  </div>
</template>

<style></style>
