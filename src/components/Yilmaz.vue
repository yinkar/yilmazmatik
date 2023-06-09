<script setup>
import { onMounted, ref } from 'vue';
import voices from '../assets/voices.json';

// Element references
const yilmaz = ref(null);
const player = ref(null);
const audioSource = ref(null);

// Variable references
const isLoading = ref(false);
const isTalking = ref(false);
const isBegin = ref(true);
const voiceFiles = ref([]);
const randomStack = ref(new Set([]));

// Say an idiom method
function idiom() {
  // Stop on pressing again
  if (isTalking.value) {
    player.value.pause();
    player.value.currentTime = 0;
    return;
  }

  // Loading state
  isLoading.value = true;

  const random = (max) => {
    return Math.floor(Math.random() * max);
  }

  let randomIndex;

  // Get random voice but prevent same one after another by using a stack
  do {
    randomIndex = random(voiceFiles.value.length);
  } while (randomStack.value.has(randomIndex));

  randomStack.value.add(randomIndex);

  // Clear random stack when stack size reached number of voice files
  if (randomStack.value.size >= voiceFiles.value.length) {
    randomStack.value.clear();
  }
  
  audioSource.value.src = voiceFiles.value[randomIndex];

  player.value.load();
  player.value.play();
}

// Start to talk method
function talk() {
  isTalking.value = true;
  isLoading.value = false;
  isBegin.value = false;
}

// Stop to talk method
function silence() {
  isTalking.value = false;
  isLoading.value = false;
}

onMounted(() => {
  // Set voice files to array
  voices.forEach(v => {
    voiceFiles.value.push(`/yilmazmatik/${v.file}`);
  });

  // Assign keyboard keys to say an idiom
  window.addEventListener('keydown', idiom)
});
</script>

<template>
  <button
    @click="idiom()"
    class="yilmaz"
    ref="yilmaz" 
    :class="{
      talking: isTalking,
      loading: isLoading,
      begin: isBegin
    }"
  >
    <img src="../assets/yilmaz.png" alt="Yılmaz">
  </button>

  <audio id="player" ref="player" @ended="silence" @pause="silence" @playing="talk" v-show="false" preload="auto">
    <source id="audio-source" ref="audioSource" src="" type="audio/mp3" />
  </audio>
</template>

<style scoped>
  .yilmaz {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    transform-origin: bottom center;
    outline: none;
  }

  .yilmaz > img {
    width: 200px;
    height: 253px;
  }

  .talking {
    animation: shake 1s linear infinite;
  }

  .loading {
    animation: loading 400ms ease-in infinite;
  }

  .begin {
    animation: shine 1s ease-out infinite;
  }

  @keyframes shine {
    0% {
      filter: drop-shadow(0 0 4px #0099e6);
    }
    80% {
      filter: drop-shadow(0 0 20px #005a88);
    }
    90% {
      filter: drop-shadow(0 0 4px #006ba0);
    }
  }

  @keyframes loading {
    0% {
      opacity: .9;
    }
    80% {
      opacity: .7;
    }
    100% {
      opacity: .65;
    }
  }

  @keyframes shake {
    0% {
      transform: translate(0, 0) rotate(0);
    }
    10% {
      transform: translate(-4px, -3px) rotate(2deg);
    }
    20% {
      transform: translate(5px, 1px) rotate(-4deg);
    }
    30% {
      transform: translate(3px, 6px) rotate(3deg);
    }
    35% {
      transform: translate(0, -2px) rotate(0);
    }
    35% {
      transform: translate(-4px, -4px) rotate(4deg);
    }
    40% {
      transform: translate(-3px, 2px) rotate(-1deg);
    }
    50% {
      transform: translate(5px, -4px) rotate(-3deg);
    }
    60% {
      transform: translate(-5px, 3px) rotate(-2deg);
    }
    70% {
      transform: translate(2px, -3px) rotate(2deg);
    }
    80% {
      transform: translate(-2px, -3px) rotate(5deg);
    }
    80% {
      transform: translate(-3px, 0) rotate(-1deg);
    }
    90% {
      transform: translate(1px, -1px) rotate(-6deg);
    }
    100% {
      transform: translate(0, 0) rotate(0);
    }
  }
</style>
