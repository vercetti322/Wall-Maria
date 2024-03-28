<template>
  <div ref="canvasContainer" class="canvas-container"></div>
  <button @click="clicked++"><b>{{names[clicked]}}</b></button>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import p5 from 'p5';
import { generateRandomPoints, getExtremePoints, highlightExtremePoints, getMedianOfMedians, drawVerticalLineThroughMedian, findUpperBridge  } from './utils.js';

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
const names = ref(['get extreme points', 'get median line', 'get upper bridge', 'recurse through for other bridges']);


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

let upperBridgeCalculated = false;
let upperBridgePoints;

const draw = () => {

  if (clicked.value == 0) {
    pInstance.background(220);
    for (const pt of points.value) {
      pInstance.stroke(0);
      pInstance.strokeWeight(1.5);
      pInstance.point(pt.x, pt.y);
    }
    
  } else if (clicked.value == 1) {
    pInstance.background(220);
    for (const pt of points.value) {
      pInstance.stroke(0);
      pInstance.strokeWeight(1.5);
      pInstance.point(pt.x, pt.y);
    }
    const [xmin, xmax] = highlightExtremePoints(pInstance, leftMost, rightMost);
  } else if (clicked.value == 2) {
    pInstance.background(220);
    for (const pt of points.value) {
      pInstance.stroke(0);
      pInstance.strokeWeight(1.5);
      pInstance.point(pt.x, pt.y);
    }
    const [xmin, xmax] = highlightExtremePoints(pInstance, leftMost, rightMost);
    const median = getMedianOfMedians(points.value);
    drawVerticalLineThroughMedian(pInstance, median)

  } else if (clicked.value == 3) {
    if (!upperBridgeCalculated) {
      pInstance.background(220);
      for (const pt of points.value) {
        pInstance.stroke(0);
        pInstance.strokeWeight(1.5);
        pInstance.point(pt.x, pt.y);
      }
      const [xmin, xmax] = highlightExtremePoints(pInstance, leftMost, rightMost);
      const median = getMedianOfMedians(points.value);
      drawVerticalLineThroughMedian(pInstance, median)

      upperBridgePoints = findUpperBridge(points.value, median);
      upperBridgeCalculated = true;
    }

    // Draw the upper bridge line using p5.js line function
    pInstance.strokeWeight(2);
    pInstance.stroke(0, 255, 0); // Green color
    pInstance.line(upperBridgePoints[0].x, upperBridgePoints[0].y, upperBridgePoints[1].x, upperBridgePoints[1].y);
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