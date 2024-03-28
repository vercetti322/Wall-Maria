<template>
    <div class="rangebar">
      <input type="range" :step="step" min="1" max="1000" v-model="selectedValue" class="slider" />
      <input type="number" min="1" max="1000" v-model.number="selectedValue" class="number-input" />
    </div>
  </template>
  
<script setup>
import { ref, watch, defineEmits } from 'vue';

const stopPoints = [1, 10, 100, 1000];
const step = stopPoints[1] - stopPoints[0];
const selectedValue = ref(10);
const numPoints = ref(1);
const emit = defineEmits(['updatePoints']);


watch(selectedValue, (newVal) => {
  numPoints.value = parseInt(newVal); 
  emit('updatePoints', numPoints.value); 
});

watch(selectedValue, (newVal) => {
  if (newVal > 1000) {
    selectedValue.value = 1000;
  }
});
</script>

<style scoped>
.rangebar {
    display: flex;
    align-items: center;
}

input[type="number"].number-input {
  margin-left: 20px; /* Add left margin to the number input */
  width: 55px;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: inner-spin-button;
    opacity: 1; /* Make the arrows fully visible */
  }
}

input[type="range"].slider {
    flex: 1;
    width: 100%;
    -webkit-appearance: none;
    appearance: none;
    height: 5px;
    border-radius: 5px;
    background: #ccc; /* default background color */
    outline: none;
    margin: 0;
    padding: 0;
}

input[type="range"].slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: black; /* thumb color */
    cursor: pointer;
}

input[type="range"].slider::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: black; /* thumb color */
    cursor: pointer;
}

</style>
