<script setup>
    import { ref, onMounted } from 'vue';

    const transcript = ref(['sentence 1', 'sentence 2', 'sentence 3']);
    const currentIndex = ref(0);
    const typedText = ref('');
    const showNextButton = ref(false);
    const expanded = ref(false); // New ref to control the expansion of the div

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
        }, 50);
    };

    const toggleText = () => {
        if (currentIndex.value < transcript.value.length - 1) {
            clearInterval(typingTimer);
            currentIndex.value += 1;
            typedText.value = '';
            startTyping();
        }
        expanded.value = true; // Expand the div when the button is clicked
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
        <img src="../assets/pixis-logo.jpg" @click="expandDiv">
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
    transition: width 1s; /* Add transition for width */
    width: 100px; /* Initial width */
    display: flex;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.5s;
  }

  .pixis.expanded {
    position: relative;
    display: flex;
    margin-left: 2px;
    width: 97.5%;
    display: flex;
    padding: 10px;
    background-color: #EADDCA;
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
}

  .pixis img {
    max-height: 200px;
    border-radius: 5px;
    border: 1px solid #C19A6B;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 130px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
    cursor: pointer;
  }

  .pixis #pixis-intro {
    left: 0;
    height: 100%;
    margin-right: 80px;
    width: 100%;
    margin-top: 35px;
    margin-bottom: 35px;
    float: right;
    padding: 5px;
    font-size: 18px;
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
    margin-right: 10px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    } 
    to {
      opacity: 1;
    }
  }
</style>