<template>
  <div class="max-w-screen-sm mx-auto px-5 py-10">
    <!-- Error message -->
    <div
      v-if="errorMessage"
      class="mb-8 p-4 rounded bg-red-500 bg-opacity-25 border-2 border-red-500 border-opacity-50 text-red-500 text-center text-sm font-semibold"
    >
      {{ errorMessage }}
    </div>
    <!-- Form -->
    <form
      @submit.prevent="register"
      method="post"
      class="p-8 flex flex-col gap-8 border-2 border-slate-800 rounded-lg"
    >
      <h1 class="text-2xl font-bold text-slate-50">Register</h1>

      <div class="flex flex-col gap-6">
        <div class="flex flex-row-reverse border-2 border-slate-800 rounded">
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            class="w-full rounded-r px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent focus:outline-none focus:border-2 focus:border-rose-500 peer appearance-none"
            required
          />
          <div
            class="flex flex-col justify-center items-center rounded-l border-r-2 bg-slate-800 bg-opacity-50 border-slate-800 text-slate-500 p-4 peer-focus:bg-rose-500 peer-focus:text-rose-50 peer-focus:border-rose-500"
          >
            <MailIcon class="w-5 h-5" />
          </div>
        </div>
        <div class="flex flex-row-reverse border-2 border-slate-800 rounded">
          <input
            v-model="password"
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            class="w-full rounded-r px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent focus:outline-none focus:border-2 focus:border-rose-500 peer appearance-none"
            required
          />
          <div
            class="flex flex-col justify-center items-center rounded-l border-r-2 bg-slate-800 bg-opacity-50 border-slate-800 text-slate-500 p-4 peer-focus:bg-rose-500 peer-focus:text-rose-50 peer-focus:border-rose-500"
          >
            <KeyIcon class="w-5 h-5" />
          </div>
        </div>
        <div class="flex flex-row-reverse border-2 border-slate-800 rounded">
          <input
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            class="w-full rounded-r px-5 py-3 text-slate-200 text-sm font-medium placeholder:text-slate-500 placeholder:text-sm bg-transparent focus:outline-none focus:border-2 focus:border-rose-500 peer appearance-none"
            required
          />
          <div
            class="flex flex-col justify-center items-center rounded-l border-r-2 bg-slate-800 bg-opacity-50 border-slate-800 text-slate-500 p-4 peer-focus:bg-rose-500 peer-focus:text-rose-50 peer-focus:border-rose-500"
          >
            <LockIcon class="w-5 h-5" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        class="bg-rose-500 p-4 text-rose-50 font-bold rounded-md hover:bg-rose-600 transition-all duration-200"
      >
        Register
      </button>
      <div class="flex justify-center text-slate-400 text-sm">
        <p>
          Already have an account?
          <router-link
            :to="{ name: 'Login' }"
            class="text-rose-500 font-bold hover:text-rose-600"
            >Login</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { MailIcon, KeyIcon, LockIcon } from "vue-tabler-icons";
import { supabase } from "../supabase/config";

export default {
  name: "Register",
  components: { MailIcon, KeyIcon, LockIcon },
  setup() {
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMessage = ref(null);

    // Register
    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });

          if (error) throw error;

          router.replace({
            name: "Login",
          });
        } catch (err) {
          errorMessage.value = err.message;

          setTimeout(() => {
            errorMessage.value = null;
          }, 5000);
        }

        return;
      }

      errorMessage.value = "Password does not match";
      setTimeout(() => {
        errorMessage.value = null;
      }, 5000);
    };

    return { email, password, confirmPassword, errorMessage, register };
  },
};
</script>

<style></style>
