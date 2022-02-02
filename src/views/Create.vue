<script setup>
import { ref } from "vue";
import { RunIcon, ChevronDownIcon, TrashIcon } from "vue-tabler-icons";
import { uid } from "uid";
import { useStore } from "../store/index";

const store = useStore();

const name = ref("");
const type = ref("");
const exercises = ref([]);

const statusMessage = ref(null);
const errorMessage = ref(null);

const addExercise = () => {
  if (type.value === "strength") {
    exercises.value.push({
      id: uid(),
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
    });

    return;
  }
  exercises.value.push({
    id: uid(),
    cardioType: "",
    distance: "",
    duration: "",
    pace: "",
  });
};

const deleteExercise = (id) => {
  if (exercises.value.length > 1) {
    exercises.value = exercises.value.filter((ex) => ex.id !== id);

    return;
  }

  errorMessage.value = "You must have at least one exercise";
  setTimeout(() => {
    errorMessage.value = false;
  }, 5000);
};

const workoutChange = () => {
  exercises.value = [];

  addExercise();
};

const createWorkout = async () => {
  try {
    const { error } = await store.createWorkout({
      name: name.value,
      type: type.value,
      exercises: exercises.value,
    });

    if (error) throw error;

    statusMessage.value = "Success recording workout";

    name.value = "";
    type.value = "";
    exercises.value = [];

    setTimeout(() => {
      statusMessage.value = null;
    }, 5000);
  } catch (err) {
    errorMessage.value = err.message;
    setTimeout(() => {
      errorMessage.value = false;
    }, 5000);
  }
};
</script>

<template>
  <div class="max-w-screen-md mx-auto px-5 py-10">
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
    <!-- Form -->
    <form
      @submit.prevent="createWorkout"
      class="p-8 flex flex-col gap-8 border-2 border-slate-800 rounded-lg"
    >
      <h1 class="text-2xl font-bold text-slate-50">Record Workout</h1>

      <div class="flex flex-col gap-6">
        <div class="flex flex-row-reverse">
          <input
            v-model="name"
            type="text"
            name="name"
            id="name"
            placeholder="Workout Name"
            class="w-full rounded-r px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-t-2 border-r-2 border-b-2 border-l-0 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0 peer"
            required
          />
          <div
            class="inline-flex items-center rounded-l border-r-2 bg-slate-800 bg-opacity-50 border-slate-800 text-slate-500 p-4 peer-focus:bg-rose-500 peer-focus:text-rose-50 peer-focus:border-rose-500"
          >
            <RunIcon class="w-5 h-5" />
          </div>
        </div>
        <div class="relative inline-block w-full">
          <select
            @change="workoutChange"
            v-model="type"
            name="type"
            id="type"
            class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium bg-transparent border-2 border-slate-800 focus:outline-none focus:bg-slate-900 appearance-none"
            required
          >
            <option value="">Select Workout</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>
          <div
            class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
          >
            <ChevronDownIcon class="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div v-if="type === 'strength'" class="flex flex-col gap-y-4">
          <div
            class="w-full flex flex-col gap-2"
            v-for="(item, index) in exercises"
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
                class="rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                required
              />
              <input
                v-model="item.sets"
                type="text"
                placeholder="Sets"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                required
              />
              <input
                v-model="item.reps"
                type="text"
                placeholder="Reps"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                required
              />
              <input
                v-model="item.weight"
                type="text"
                placeholder="Weight"
                class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                required
              />
              <div
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

        <div v-if="type === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="w-full flex flex-col gap-2"
            v-for="(item, index) in exercises"
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
                  class="w-full flex-1 rounded px-5 py-3 text-slate-200 text-sm font-medium bg-transparent border-2 border-slate-800 focus:outline-none focus:bg-slate-900 appearance-none"
                  required
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
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                  required
                />
                <input
                  v-model="item.duration"
                  type="text"
                  placeholder="Duration"
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                  required
                />
                <input
                  v-model="item.pace"
                  type="text"
                  placeholder="Pace"
                  class="w-full rounded px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent border-2 border-slate-800 focus:outline-none focus:border-2 focus:border-rose-500 focus:ring-0"
                  required
                />
                <div
                  @click="deleteExercise(item.id)"
                  class="w-full md:w-fit flex justify-center items-center bg-rose-500 bg-opacity-25 text-rose-500 rounded p-3.5 hover:bg-opacity-40 cursor-pointer"
                >
                  <TrashIcon class="w-5 h-5" />
                </div>
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

        <button
          type="submit"
          class="rounded bg-emerald-500 py-3.5 px-7 text-emerald-50 text-sm font-bold hover:bg-emerald-600 transition-all duration-200"
        >
          Record Workout
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
