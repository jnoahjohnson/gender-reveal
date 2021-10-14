<!-- <script lang="ts" context="module">
  import * as db from '$lib/db'

  export async function load() {
    const guesses = await db.guesses.all()

    return {
      props: { guesses }
    }
  }
</script> -->

<script lang="ts">
  import * as db from '$lib/db'

  let name = '';
  let isMale = true;

  let didSubmit = false;
  let isSubmitting = false;

  function setIsMale(isTrue: boolean) {
    isMale = isTrue
  }

  async function newGuess() {
    isSubmitting = true;

    await db.submitGuess.submit({name, isMale}).then(e => {
      didSubmit = true;

      name = '';
      isMale = true;

    }).catch(e => {
      console.log(e)
    });
  }

</script>

<main class="h-screen bg-gradient-to-r from-blue-400 to-pink-400 text-white w-full flex flex-col justify-center items-center">
  <h1 class="text-6xl mb-2 font-black text-center p-3">Guess the Gender!</h1>
  {#if !didSubmit}
  <div class="flex flex-col justify-start mb-16 p-3 max-w-full">
    <label for="name" class="text-xl font-bold">Name</label>
    <input disabled={isSubmitting} bind:value={name} name="name" class="shadow-lg text-4xl p-2 rounded-lg bg-white text-black" />
    <div disabled={isSubmitting} class="my-4 flex items-center justify-center gap-3">
      <button on:click={() => setIsMale(true)} class={`${isMale ? 'bg-blue-400 text-white' : 'bg-white text-blue-400'} rounded-lg py-3 px-6 font-extrabold text-4xl transition-all duration-500`}>Boy</button>
      <button on:click={() => setIsMale(false)} class={`${!isMale ? 'bg-pink-400 text-white' : 'bg-white text-pink-400 '} rounded-lg py-3 px-6 font-extrabold text-4xl transition-all duration-500`}>Girl</button>
    </div>
    <button disabled={isSubmitting} on:click={newGuess} class="bg-white text-black text-3xl font-bold rounded-lg w-1/2 m-auto my-4 py-3">Submit</button>
  </div>
  {:else}
  <div>
    Thank you!
  </div>
  {/if}
  <a href="/results">Check Current Results</a>
</main>
