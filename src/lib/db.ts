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
    const { data } = await supabase.from("guesses").select("*");

    return data;
  },
};

export const getWinners = {
  async all() {
    const { data } = await supabase
      .from("guesses")
      .select("*")
      .filter("guess_is_boy", "eq", "true");

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
