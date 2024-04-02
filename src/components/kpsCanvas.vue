<template>
  <div ref="canvasContainer" class="canvas-container"></div>
  <button @click="clicked++"><b>{{names[clicked]}}</b></button>
</template>

<script setup>
import { ref, onMounted, watch, defineProps, defineEmits } from 'vue';
import p5 from 'p5';
import { generateRandomPoints, getExtremePointsLower, highlightExtremePoints, getMedianOfMedians, drawVerticalLineThroughMedian, findLowerBridge, lowerHull, upperHull } from './utils.js';

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
const names = ref(['get extreme points', 'get median line', 'get lower bridge', 'recurse through for other bridges', 'get upper bridge', 'exit']);


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
  ({ leftMost, rightMost } = getExtremePointsLower(points.value));
  emit('updatePoints', points.value.length);
};

let upperBridgeCalculated = false;
let upperBridgePoints;
let hullCalculated = false
let hullPoints
let hull = false
let lowerHullPoints
let upperHullPoints

const draw = async () => {

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

      upperBridgePoints = findLowerBridge(points.value, median);
      upperBridgeCalculated = true;
    }

    // Draw the upper bridge line using p5.js line function
    pInstance.strokeWeight(2);
    pInstance.stroke(0, 155, 0); // Green color
    pInstance.line(upperBridgePoints[0].x, upperBridgePoints[0].y, upperBridgePoints[1].x, upperBridgePoints[1].y);
  } else if (clicked.value == 4) {
    if (!hullCalculated) {
      pInstance.background(220);
      for (const pt of points.value) {
        pInstance.stroke(0);
        pInstance.strokeWeight(1.5);
        pInstance.point(pt.x, pt.y);
      }

      hullPoints = lowerHull(points.value);
      hullCalculated = true;
    }

    // Draw the hull lines using p5.js line function
    pInstance.strokeWeight(2);
    pInstance.stroke(0, 155, 0); // Green color
    let sortedHullPoints = [];
    let leftmostPoint = hullPoints[0][0];

    for (let i = 0; i < hullPoints.length; i++) {
      if (hullPoints[i][0].x < leftmostPoint.x) {
        leftmostPoint = hullPoints[i][0];
      }
    }
    let currentPoint = leftmostPoint;

    while (sortedHullPoints.length < hullPoints.length) {
      for (let i = 0; i < hullPoints.length; i++) {
        if (hullPoints[i][0] === currentPoint) {
          sortedHullPoints.push(hullPoints[i]);
          currentPoint = hullPoints[i][1];
          break;
        }
      }
    }

    for (let i = 0; i < sortedHullPoints.length; i++) {
      await new Promise(resolve => setTimeout(resolve, i + 100));
      pInstance.line(sortedHullPoints[i][0].x, sortedHullPoints[i][0].y, sortedHullPoints[i][1].x, sortedHullPoints[i][1].y);
    }
  } else if (clicked.value == 5) {
      if (!hull) {
        pInstance.background(220);
        for (const pt of points.value) {
          pInstance.stroke(0);
          pInstance.strokeWeight(1.5);
          pInstance.point(pt.x, pt.y);
        }

        lowerHullPoints = lowerHull(points.value);
        upperHullPoints = upperHull(points.value);
        hull = true;
      }

      // Draw the lower hull lines using p5.js line function
      pInstance.strokeWeight(2);
      pInstance.stroke(0, 155, 0); // Green color
      let sortedLowerHullPoints = [];
      let leftmostPoint = lowerHullPoints[0][0];

      for (let i = 0; i < lowerHullPoints.length; i++) {
        if (lowerHullPoints[i][0].x < leftmostPoint.x) {
          leftmostPoint = lowerHullPoints[i][0];
        }
      }
      let currentPoint = leftmostPoint;

      while (sortedLowerHullPoints.length < lowerHullPoints.length) {
        for (let i = 0; i < lowerHullPoints.length; i++) {
          if (lowerHullPoints[i][0] === currentPoint) {
            sortedLowerHullPoints.push(lowerHullPoints[i]);
            currentPoint = lowerHullPoints[i][1];
            break;
          }
        }
      }

      for (let i = 0; i < sortedLowerHullPoints.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i + 100));
        pInstance.line(sortedLowerHullPoints[i][0].x, sortedLowerHullPoints[i][0].y, sortedLowerHullPoints[i][1].x, sortedLowerHullPoints[i][1].y);
      }

      // Draw the upper hull lines using p5.js line function
      pInstance.strokeWeight(2);
      pInstance.stroke(0, 0, 155); // Blue color
      let sortedUpperHullPoints = [];
      let rightmostPoint = upperHullPoints[0][0];

      for (let i = 0; i < upperHullPoints.length; i++) {
        if (upperHullPoints[i][0].x > rightmostPoint.x) {
          rightmostPoint = upperHullPoints[i][0];
        }
      }
      currentPoint = rightmostPoint;

      while (sortedUpperHullPoints.length < upperHullPoints.length) {
        for (let i = 0; i < upperHullPoints.length; i++) {
          if (upperHullPoints[i][0] === currentPoint) {
            sortedUpperHullPoints.push(upperHullPoints[i]);
            currentPoint = upperHullPoints[i][1];
            break;
          }
        }
      }

      for (let i = 0; i < sortedUpperHullPoints.length; i++) {
        await new Promise(resolve => setTimeout(resolve, i + 100));
        pInstance.line(sortedUpperHullPoints[i][0].x, sortedUpperHullPoints[i][0].y, sortedUpperHullPoints[i][1].x, sortedUpperHullPoints[i][1].y);
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
  border-radius: 5px;
  overflow: hidden;
}
</style>