<template>
    <div>
        <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
    </div>
</template>

<script setup>
    import Carousel from './Carousel.vue';
    import jvSlide1 from '../assets/jv-slide-1.png';
    import jvSlide2 from '../assets/jv-slide-2.png';

    const carouselImages = [
        jvSlide1,
        jvSlide2
    ]

    const handleImageClick = (imageUrl) => {
        console.log('Clicked image URL:', imageUrl);
    }
</script>