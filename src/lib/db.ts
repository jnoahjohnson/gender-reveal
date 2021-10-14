import { createClient } from "@supabase/supabase-js";
import { getAllContexts } from "svelte";
import { readable } from "svelte/store";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const user = readable(supabase.auth.user(), (set) => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_OUT") {
      set(null);
    }
  });
});

export const auth = supabase.auth;

// TODO: add your queries/inserts/updates/deletes here
export const guesses = {
  async all() {
    console.log("here");
    const { data } = await supabase.from("guesses").select("*");

    console.log("data", data);

    return data;
  },
};

export const submitGuess = {
  async submit(userData) {
    const { data, error } = await supabase
      .from("guesses")
      .insert([{ name: userData.name, guess_is_boy: userData.isMale }]);
  },
};
