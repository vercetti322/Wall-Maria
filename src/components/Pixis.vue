<script setup>
import { ref, onMounted } from 'vue';
import pixisLogo from '../assets/pixis-logo.jpg';
import arminLogo from '../assets/armin-logo.webp';

const transcript = ref(['sentence 1', 'sentence 2', 'sentence 3']);
const currentIndex = ref(0);
const typedText = ref('');
const showNextButton = ref(false);
const expanded = ref(false);
const images = ref([pixisLogo, arminLogo]);
const currentImage = ref(images.value[0]);

let typingTimer;

const startTyping = () => {
    let index = 0;
    typingTimer = setInterval(() => {
        typedText.value += transcript.value[currentIndex.value][index];
        index++;
        if (index === transcript.value[currentIndex.value].length) {
            clearInterval(typingTimer);
            if (currentIndex.value < transcript.value.length - 1) {
                showNextButton.value = true;
            } else {
                showNextButton.value = false;
            }
        }
    }, 75);
};

const toggleText = () => {
    if (currentIndex.value < transcript.value.length - 1) {
        clearInterval(typingTimer);
        currentIndex.value += 1;
        typedText.value = '';
        currentImage.value = images.value[currentIndex.value % 2];
        startTyping();
    }
    expanded.value = true;
};

const expandDiv = () => {
    if (!expanded.value) {
        startTyping();
    }
    expanded.value = true;
    // Remove event listener after the div is expanded
    document.querySelector('.pixis img').removeEventListener('click', expandDiv);
};

onMounted(() => {
    // Add event listener to the image to expand the div
    document.querySelector('.pixis img').addEventListener('click', expandDiv);
});
</script>

<template>
    <div class="pixis" :class="{ expanded: expanded }">
        <img :src="currentImage">
        <p v-if="expanded">{{ typedText }}</p>
        <button v-if="showNextButton && expanded" @click="toggleText"><b>Next</b></button>
    </div>
</template>


<style scoped>

  Header, .pixis {
    margin-bottom: 30px;
  }

  .pixis {
    position: relative;
    opacity: 0;
    transition: opacity 1s, width 0.5s; /* Add transition for opacity and width */
    width: 100px;
    display: flex;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.5s;
    margin-left: 65px;
  }
  
  .pixis.expanded {
    position: relative;
    display: flex;
    margin-left: 65px;
    width: 82%;
    display: flex;
    padding: 10px;
    background-color: #EADDCA;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
}
  
  .pixis img {
    max-height: 125px;
    border-radius: 5px;
    border: 1px solid #C19A6B;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 90px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
    cursor: pointer;
  }
  
  .pixis p {
    margin: 0;
    padding: 0;
    margin-top: 30px;
    max-width: 390px;
    word-wrap: break-word;
  }
  
  .pixis button {
    position: absolute;
    color: rgb(84, 50, 6);
    height: 25px;
    border: 1px solid rgb(84, 50, 6);
    padding: 5px;
    background-color: wheat;
    border-radius: 2px;
    right: 0;
    margin-right: 20px;
    margin-top: 10px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    } 
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      width: 97.5%;
    } 
    to {
      width: 100px;
    }
  }
</style>