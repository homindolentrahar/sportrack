import { defineStore } from "pinia";
import { supabase } from "../supabase/config";

export const useStore = defineStore("main", {
  state: () => {
    return {
      appReady: null,
      user: null,
    };
  },
  actions: {
    authStateChange() {
      supabase.auth.onAuthStateChange((_, session) => {
        console.log(session === null ? "Guest" : session.user.email);

        this.user = session === null ? null : session.user;

        this.appReady = true;
      });
    },
    async login(email, password) {
      return supabase.auth.signIn({
        email: email,
        password: password,
      });
    },
    async register(email, password) {
      return supabase.auth.signUp({
        email: email,
        password: password,
      });
    },
    async logout() {
      await supabase.auth.signOut();
    },
  },
  getters: {
    authUser: (_) => supabase.auth.user(),
  },
});
