<template>
    <div ref="canvasContainer" class="canvas-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, getCurrentInstance } from 'vue';
  import p5 from 'p5';
  
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
  
  let pInstance = null;
  
  const generateRandomPoints = () => {
    points.value = [];
    const numPoints = props.numPoints;
    const radiusX = pInstance.width / 3.2; // Horizontal radius of the oval
    const radiusY = pInstance.height / 4; // Vertical radius of the oval
    const centerX = pInstance.width / 2; // X position of the oval center
    const centerY = pInstance.height / 2; // Y position of the oval center
    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * 2 * Math.PI + (Math.random() - 0.5) * 1.0; // Random angle with increased noise
      const r = Math.sqrt(Math.random()) + (Math.random() - 0.5) * 1.0; // Random radius with increased noise
      const x = centerX + r * radiusX * Math.cos(angle);
      const y = centerY + r * radiusY * Math.sin(angle);
      points.value.push(pInstance.createVector(x, y));
    }
    updatePoints();
  };
  
  const updatePoints = () => {
    emit('updatePoints', points.value.length);
  };
  
  const createCanvas = () => {
    sketch = new p5(p5Sketch, canvasContainer.value);
  };
  
  const p5Sketch = (p) => {
    pInstance = p;
  
    p.setup = () => {
      p.createCanvas(500, 340);
      generateRandomPoints();
    };
  
    p.draw = () => {
      p.background('red');
      // Draw points
      for (const pt of points.value) {
        p.stroke(0);
        p.strokeWeight(1.5);
        p.point(pt.x, pt.y);
      }
    };
  };
  
  onMounted(() => {
    createCanvas();
  });
  
  watch(() => props.numPoints, () => {
    if (sketch) {
      generateRandomPoints();
    }
  });
  </script>
  
  <style scoped>
  .canvas-container {
    width: 500px;
    height: 340px;
    border-radius: 20px;
    overflow: hidden;
  }
  </style>