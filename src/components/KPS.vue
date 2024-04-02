<template>
  <div>
    <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button id="cross" @click="showModal = false">x</button>
        <div class="canvas-container">
          <kpsCanvas :numPoints.number="numPoints" ref="canvasRef" @updatePoints="updateNumPoints" />
        </div>
        <RangeBar class="rangebar" :numPoints.number="numPoints" @updatePoints="updateNumPoints" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import kpsCanvas from './kpsCanvas.vue';
import Carousel from './Carousel.vue';
import RangeBar from './RangeBar.vue';
import kpsSlide1 from '../assets/kps-slide-1.png';
import kpsSlide2 from '../assets/kps-slide-2.png';

const carouselImages = [
  kpsSlide1,
  kpsSlide2
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
  margin-top: 50px;
}

.modal-content {
  display: flex;
  background-color: white; /* Modal content background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Drop shadow */
  width: 510px; /* Adjust width as needed */
  height: 360px;
  overflow: auto; /* Allow scrolling if content exceeds modal size */
}

.modal-content p {
  margin-top: 300px;
  margin-left: 20px;
}

.modal-content #cross {
  position: absolute;
  top: 18.5px;
  right: 215px;
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
  width: 600px; /* Adjust as needed */
  height: 310px; /* Adjust as needed */
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
}
</style>