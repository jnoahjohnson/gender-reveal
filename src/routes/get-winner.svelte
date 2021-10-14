<script lang="ts" context="module">
    import * as db from '$lib/db'
  
    export async function load() {
      const winners = await db.getWinners.all()
 
  
  
      return {
        props: { winners }
      }
    }
  </script>
  
  <script lang="ts">
    
      export let winners;

      let currentWinner = "";

      function getNewWinner() {
        currentWinner = winners[Math.floor(Math.random() * winners.length)].name
      }
    
    </script>
    
    <main class="h-screen bg-gradient-to-r from-blue-400 to-pink-400 text-white w-full flex flex-col justify-center items-center">
        <h1 class="text-6xl mb-2 font-black text-center p-3">Guess the Gender!</h1>
        <h2 class="m-4 text-white text-4xl font-extrabold">{currentWinner}</h2>
        <button on:click={getNewWinner} class="bg-white text-black py-2 px-4 m-2 font-bold text-2xl shadow-lg rounded-lg" >Get Winner</button>
    </main>
    