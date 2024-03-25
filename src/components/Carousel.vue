<template>
    <div class="carousel" @wheel="handleMouseWheel">
      <div class="carousel-inner" :style="{ transform: 'translateX(' + (-currentIndex * 100) + '%)' }">
        <div class="carousel-item" v-for="(slide, index) in images" :key="index">
          <img :src="slide" :alt="'Slide ' + (index + 1)" @click="handleClick(index)">
        </div>
      </div>
      <div class="carousel-dots">
        <span v-for="(slide, index) in images" :key="index" 
              :class="{ active: index === currentIndex, dot: true }" 
              @click="goToSlide(index)"></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue';
  
  const currentIndex = ref(0);
  const emits = defineEmits(['imageClick'])
  
  const props = defineProps({
    images: {
      type: Array,
      required: true
    }
  });
  
  const goToSlide = (index) => {
    currentIndex.value = index;
  };
  
  const handleMouseWheel = (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    if (delta > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };
  
  const prevSlide = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextSlide = () => {
    if (currentIndex.value < props.images.length - 1) {
      currentIndex.value++;
    }
  };

  const handleClick = (index) => {
    emits('imageClick', props.images[index]);
  }
  </script>
  
  <style scoped>
  .carousel {
    width: 600px; /* Adjust width as needed */
    overflow: hidden;
    position: relative;
    height: 350px;
    margin: 0 auto; /* Center horizontally */
    margin-bottom: 30px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
}
  
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .carousel-item {
    flex: 0 0 auto;
  }
  
  .carousel-item img {
    width: 100%;
    height: 100%;
    display: block;
    cursor: pointer;
  }

  .carousel-item img:active {
    opacity: 0.6;
  }
  
  .carousel-dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  
  .carousel-dots span {
    width: 10px;
    height: 10px;
    background-color: #cccccc69;
    border: 1px solid rgba(0, 0, 0, 0.577);
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
  }
  
  .carousel-dots span.active {
    background-color: rgb(83, 53, 6);
    border: 1px solid rgba(0, 0, 0, 0.577);
  }
  </style>
  