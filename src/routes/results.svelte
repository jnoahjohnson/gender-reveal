<script lang="ts" context="module">
  import * as db from '$lib/db'

  export async function load() {
    const guesses = await db.guesses.all()
    let boy = 0;
    let girl = 0;

    guesses.forEach(guess => {
        if (guess.guess_is_boy) {
            boy += 1
        } else {
            girl += 1
        }
    })



    return {
      props: { boy, girl }
    }
  }
</script>

<script lang="ts">
  
    export let boy;
    export let girl;
  
  </script>
  
  <main class="h-screen bg-gradient-to-r from-blue-400 to-pink-400 text-white w-full flex flex-col justify-center items-center">
    <h1 class="text-6xl mb-2 font-black text-center p-3">Guess the Gender!</h1>

    <div class="flex flex-row items-center text-center mb-16 p-3 max-w-full gap-5">
        <div>
            <h1 class="text-4xl font-semibold">Boy</h1>
            <h2 class="text-3xl">{boy}</h2>
        </div>
        <div>
            <h1 class="text-4xl font-semibold">Girl</h1>
            <h2 class="text-3xl">{girl}</h2>
        </div>
     </div>

     <a href="/" class="hover:underline text-xl">Go Back</a>
  </main>
  