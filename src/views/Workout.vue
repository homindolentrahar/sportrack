<script setup>
import { uid } from "uid";
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store/index";
import {
  Home2Icon,
  ChevronRightIcon,
  EditIcon,
  TrashIcon,
  RunIcon,
  ChevronDownIcon,
} from "vue-tabler-icons";

const route = useRoute();
const router = useRouter();
const store = useStore();

const data = ref(null);
const loaded = ref(null);
const errorMessage = ref(null);
const statusMessage = ref(null);

const currentId = route.params.id;

const edit = ref(null);

const getData = async () => {
  try {
    const { data: workouts, error } = await store.getSingleWorkout(currentId);

    if (error) throw error;

    data.value = workouts[0];
    loaded.value = true;
  } catch (err) {
    errorMessage.value = err.message;
    setTimeout(() => {
      errorMessage.value = false;
    }, 5000);
  }
};

const update = async () => {
  try {
    const { error } = await store.updateWorkout(
      {
        name: data.value.name,
        exercises: data.value.exercises,
      },
      currentId
    );

    if (error) throw error;

    edit.value = false;
    statusMessage.value = "Record updated";
    setTimeout(() => {
      statusMessage.value = false;
    }, 5000);
  } catch (err) {
    errorMessage.value = err.message;
    setTimeout(() => {
      errorMessage.value = false;
    }, 5000);
  }
};

const editMode = () => {
  edit.value = !edit.value;
};

const deleteWorkout = async () => {
  try {
    const { error } = await store.deleteWorkout(currentId);

    if (error) throw error;

    router.replace({
      name: "Home",
    });
  } catch (err) {
    errorMessage.value = err.message;
    setTimeout(() => {
      errorMessage.value = false;
    }, 5000);
  }
};

const addExercise = () => {
  if (data.value.type === "strength") {
    data.value.exercises.push({
      id: uid(),
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
    });

    return;
  }
  data.value.exercises.push({
    id: uid(),
    cardioType: "",
    distance: "",
    duration: "",
    pace: "",
  });
};

const deleteExercise = (id) => {
  if (data.value.exercises.length > 1) {
    data.value.exercises = data.value.exercises.filter((ex) => ex.id !== id);

    return;
  }

  errorMessage.value = "You must have at least one exercise";
  setTimeout(() => {
    errorMessage.value = false;
  }, 5000);
};

watchEffect(() => {
  getData();
});
</script>

<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Messages -->
    <div
      v-if="errorMessage"
      class="mb-8 p-4 rounded bg-red-500 bg-opacity-25 border-2 border-red-500 border-opacity-50 text-red-500 text-center text-sm font-semibold"
    >
      {{ errorMessage }}
    </div>
    <div
      v-if="statusMessage"
      class="mb-8 p-4 rounded bg-emerald-500 bg-opacity-25 border-2 border-emerald-500 border-opacity-50 text-emerald-500 text-center text-sm font-semibold"
    >
      {{ statusMessage }}
    </div>

    <!-- Data -->
    <div v-if="loaded" class="container p-10 flex flex-col gap-6">
      <!-- Breadcrumbs -->
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link
              :to="{ name: 'Home' }"
              class="inline-flex gap-2 items-center text-sm font-medium text-slate-400 hover:text-slate-50 transition-all duration-200"
            >
              <Home2Icon class="w-5 h-5" />
              Home
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <ChevronRightIcon class="w-5 h-5 text-slate-400" />
              <router-link
                :to="{ name: 'Home' }"
                class="ml-1 text-sm font-medium text-slate-400 hover:text-slate-50"
                >Workouts</router-link
              >
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <ChevronRightIcon class="w-5 h-5 text-slate-400" />

              <span
                class="ml-1 text-sm font-medium text-gray-400 md:ml-2 dark:text-gray-500"
              >
                {{ data.name }}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      <!-- Top -->
      <div
        class="flex justify-between gap-6 rounded-lg bg-slate-800 bg-opacity-25 p-6"
      >
        <!-- Left -->
        <div class="flex flex-1 items-center gap-4">
          <div class="rounded-2xl bg-slate-900 p-4">
            <RunIcon
              v-if="data.type === 'cardio'"
              class="w-5 h-5 text-slate-200"
            />
            <svg
              v-if="data.type === 'strength'"
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-barbell w-5 h-5 text-slate-200"
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
          </div>
          <div class="w-full flex flex-col">
            <input
              v-if="edit"
              v-model="data.name"
              type="text"
              name="name"
              id="name"
              class="w-full rounded py-2.5 px-3 bg-slate-900 border-none text-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all duration-200"
              required
            />
            <h1 v-else class="text-slate-50 text-lg font-bold">
              {{ data.name }}
            </h1>
            <p
              class="text-slate-500 text-sm font-medium capitalize"
              :class="{ 'mx-3 mt-1.5': edit }"
            >
              {{ data.type }}
            </p>
          </div>
        </div>
        <!-- Right -->
        <div class="flex gap-4 items-center">
          <button
            @click="editMode"
            class="h-fit bg-amber-500 bg-opacity-25 text-amber-500 rounded p-2.5 hover:bg-opacity-40 transition-all duration-200"
          >
            <EditIcon class="w-5 h-5" />
          </button>
          <button
            @click="deleteWorkout"
            class="h-fit bg-red-500 bg-opacity-25 text-red-500 rounded p-2.5 hover:bg-opacity-40 transition-all duration-200"
          >
            <TrashIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <div class="flex flex-col rounded-lg bg-slate-800 bg-opacity-25 p-6">
        <div v-if="data.type === 'strength'" class="flex flex-col gap-y-4">
          <div
            class="w-full flex flex-col gap-2"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <h5 class="text-sm font-bold text-slate-500">
              Exercise #{{ index + 1 }}
            </h5>
            <div
              class="w-full flex flex-col md:flex-row gap-x-6 gap-y-3 relative"
            >
              <input
                v-model="item.exercise"
                type="text"
                placeholder="Exercise"
                class="rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                required
                :disabled="!edit"
              />
              <input
                v-model="item.sets"
                type="text"
                placeholder="Sets"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                required
                :disabled="!edit"
              />
              <input
                v-model="item.reps"
                type="text"
                placeholder="Reps"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                required
                :disabled="!edit"
              />
              <input
                v-model="item.weight"
                type="text"
                placeholder="Weight"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                required
                :disabled="!edit"
              />
              <div
                v-if="edit"
                @click="deleteExercise(item.id)"
                class="w-full md:w-fit flex justify-center items-center bg-rose-500 bg-opacity-25 text-rose-500 rounded p-3.5 hover:bg-opacity-40 cursor-pointer"
              >
                <TrashIcon class="w-5 h-5" />
              </div>
            </div>
          </div>
          <button
            @click="addExercise"
            type="button"
            class="rounded bg-emerald-500 bg-opacity-25 py-2.5 px-5 text-emerald-500 text-sm font-bold mt-6 hover:bg-opacity-40 transition-all duration-200"
          >
            Add Exercise
          </button>
        </div>

        <div v-if="data.type === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="w-full flex flex-col gap-2"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <h5 class="text-sm font-bold text-slate-500">
              Exercise #{{ index + 1 }}
            </h5>
            <div class="flex flex-col gap-3">
              <div class="relative inline-block w-full">
                <select
                  v-model="item.cardioType"
                  name="cardioType"
                  id="cardioType"
                  class="w-full flex-1 rounded px-5 py-3 text-slate-200 text-sm font-medium bg-transparent border-2 border-slate-800 focus:outline-none focus:bg-slate-900 disabled:text-slate-500 appearance-none"
                  required
                  :disabled="!edit"
                >
                  <option value="">Select Cardio Type</option>
                  <option value="run">Run</option>
                  <option value="walk">Walk</option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
                >
                  <ChevronDownIcon class="w-5 h-5 text-slate-700" />
                </div>
              </div>
              <div
                class="w-full flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-3 relative"
              >
                <input
                  v-model="item.distance"
                  type="text"
                  placeholder="Dstance"
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                  required
                  :disabled="!edit"
                />
                <input
                  v-model="item.duration"
                  type="text"
                  placeholder="Duration"
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                  required
                  :disabled="!edit"
                />
                <input
                  v-model="item.pace"
                  type="text"
                  placeholder="Pace"
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 disabled:text-slate-500"
                  required
                  :disabled="!edit"
                />
                <div
                  v-if="edit"
                  @click="deleteExercise(item.id)"
                  class="w-full md:w-fit h-fit flex justify-center items-center bg-rose-500 bg-opacity-25 text-rose-500 rounded md:p-2 p-3.5 hover:bg-opacity-40 cursor-pointer"
                >
                  <TrashIcon class="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="rounded bg-emerald-500 bg-opacity-25 py-2.5 px-5 text-emerald-500 text-sm font-bold mt-6 hover:bg-opacity-40 transition-all duration-200"
          >
            Add Exercise
          </button>
        </div>
      </div>

      <button
        v-if="edit"
        @click="update"
        type="button"
        class="bg-emerald-500 py-3.5 px-7 rounded text-emerald-50 font-bold hover:bg-emerald-600 transition-all duration-200"
      >
        Update Record
      </button>
    </div>
    <div v-else class="container p-10">
      <p class="text-center text-slate-200">Fetching data...</p>
    </div>
  </div>
</template>

<style></style>
