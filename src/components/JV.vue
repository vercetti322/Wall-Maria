<template>
    <div>
      <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <button @click="showModal = false">x</button>
          <div class="canvas-container">
            <Canvas :numPoints="numPoints" @updatePoints="updateNumPoints" />
          </div>
          <RangeBar class="rangebar" :numPoints="numPoints" @updatePoints="updateNumPoints" />
          <div class="algo">
            <h1>Hi</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi nostrum repellendus eaque dolore nam quibusdam. Ipsum esse quidem voluptatem modi atque delectus blanditiis, qui sint commodi amet nulla! Aliquam, quidem.</p>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Canvas from './Canvas.vue';
  import Carousel from './Carousel.vue';
  import RangeBar from './RangeBar.vue';
  import jvSlide1 from '../assets/jv-slide-1.png';
  import jvSlide2 from '../assets/jv-slide-2.png';
  
  const carouselImages = [
    jvSlide1,
    jvSlide2
  ];
  
  const showModal = ref(false);
  const numPoints = ref(10);
  
  const handleImageClick = () => {
    showModal.value = true;
  };
  
  
  const updateNumPoints = (newNumPoints) => {
    numPoints.value = newNumPoints;
  };
  </script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    z-index: 1000; /* Ensure modal is on top of other content */
    justify-content: center;
    align-items: center;
    display: flex;
}

.modal-content .rangebar {
    position: absolute;
    width: 500px;
    bottom: 30px;
}

.modal-content {
    display: flex;
    background-color: white; /* Modal content background */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Drop shadow */
    width: 850px; /* Adjust width as needed */
    height: 350px;
    overflow: auto; /* Allow scrolling if content exceeds modal size */
}

.modal-content .algo p {
  max-width: 250px;
  left: 0;
  margin-top: 5px;
  margin-left: 10px;
}

.modal-content .algo {
  padding: 10px;
}

.modal-content .algo h1 {
  margin-left: 10px;
}

.modal-content .algo button {
  margin-top: 250px;
  margin-right: 258px;
  color: black;
  background-color: white;
  border: 1px solid black;
  border-radius: 2px;
}

.modal-content button {
    position: absolute;
    top: 17.5px;
    right: 37.5px;
    border: none;
    border-radius: 100%;
    text-align: center;
    background-color: black;
    color: white;
    cursor: pointer;
    font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
}

.canvas-container {
    position: relative;
    width: 500px; /* Adjust as needed */
    height: 310px; /* Adjust as needed */
    border: 1px solid black;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    margin-right: 40px;
}
</style>
