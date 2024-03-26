<template>
  <div ref="canvasContainer" class="canvas-container"></div>
  <button @click="clicked = !clicked">next</button>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import p5 from 'p5';
import { generateRandomPoints, getExtremePoints, highlightExtremePoints } from './utils.js';

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
const clicked = ref(false);

let pInstance = null;
let leftMost, rightMost;

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
  ({ leftMost, rightMost } = getExtremePoints(points.value));
  emit('updatePoints', points.value.length);
};

const draw = () => {

  if (clicked.value) {
    pInstance.background(220);
    for (const pt of points.value) {
      pInstance.stroke(0);
      pInstance.strokeWeight(1.5);
      pInstance.point(pt.x, pt.y);
    }
    highlightExtremePoints(pInstance, leftMost, rightMost);
  } else {
    pInstance.background(220);
    for (const pt of points.value) {
      pInstance.stroke(0);
      pInstance.strokeWeight(1.5);
      pInstance.point(pt.x, pt.y);
    }
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
  border-radius: 20px;
  overflow: hidden;
}
</style>