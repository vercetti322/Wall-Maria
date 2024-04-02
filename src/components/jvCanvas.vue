<template>
  <div ref="canvasContainer" class="canvas-container"></div>
  <button @click="startOrStopHull()"><b>{{names[clicked]}}</b></button>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import p5 from 'p5';
import { generateRandomPoints, drawJVHull, convexHull } from './utils.js';

const props = defineProps({
  numPoints: {
    type: Number,
    required: true
  }
});

const canvasContainer = ref(null);
let sketch;
const points = ref([]);
const emit = defineEmits(['updatePoints']);
const clicked = ref(0);
const names = ref(['start making the hull!', 'exit']);

let pInstance = null;
let hullGenerator = null;
let intervalId = null;
let finalHull = null;

const createCanvas = () => {
  sketch = new p5(p5Sketch, canvasContainer.value);
};

const p5Sketch = (p) => {
  pInstance = p;

  p.setup = setup;
  p.draw = draw;
};

const setup = () => {
  pInstance.createCanvas(475, 340);
  points.value = generateRandomPoints(props.numPoints, pInstance);
  emit('updatePoints', points.value.length);
  pInstance.noLoop();
};

const draw = () => {
  pInstance.background(220);
  for (const pt of points.value) {
    pInstance.stroke(0);
    pInstance.strokeWeight(1.5);
    pInstance.point(pt.x, pt.y);
  }

  if (hullGenerator && intervalId) {
    let result = hullGenerator.next();
    if (!result.done) {
      let hull = result.value;
      drawJVHull(hull, pInstance);
    } else {
      clearInterval(intervalId); // Clear the interval
      intervalId = null;
      hullGenerator = null;
      finalHull = result.value; // Store the final hull
    }
  }

  if (finalHull) {
    drawJVHull(finalHull, pInstance); // Draw the final hull
  }
};

const startOrStopHull = () => {
  if (clicked.value == 0) {
    hullGenerator = convexHull(points.value);
    intervalId = setInterval(() => {
      pInstance.redraw();
    }, 200);
    clicked.value = 1;
  } else {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      hullGenerator = null;
      finalHull = null; // Clear the final hull
    }
    clicked.value = 0;
  }
};

onMounted(() => {
  createCanvas();
});

watch(() => props.numPoints, () => {
  if (sketch) {
    setup();
  }
});
</script>

<style scoped>
.canvas-container {
  width: 475px;
  height: 340px;
  border-radius: 5px;
  overflow: hidden;
}
</style>