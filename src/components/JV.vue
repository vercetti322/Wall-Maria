<template>
    <div>
        <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
        <div v-if="showModal" class="modal-overlay">
            <div class="modal-content">
                <button @click="showModal = false">x</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from "vue";
    import Carousel from './Carousel.vue';
    import jvSlide1 from '../assets/jv-slide-1.png';
    import jvSlide2 from '../assets/jv-slide-2.png';

    const carouselImages = [
        jvSlide1,
        jvSlide2
    ]

    const showModal = ref(false);

    const handleImageClick = () => {
        showModal.value = true;
    }
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white; /* Modal content background */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Drop shadow */
    width: 850px; /* Adjust width as needed */
    height: 350px;
    overflow: auto; /* Allow scrolling if content exceeds modal size */
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
</style>