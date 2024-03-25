<template>
    <div>
        <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
    </div>
</template>

<script setup>
    import Carousel from './Carousel.vue';
    import kpsSlide1 from '../assets/kps-slide-1.png';
    import kpsSlide2 from '../assets/kps-slide-2.png';

    const carouselImages = [
        kpsSlide1,
        kpsSlide2
    ]

    const handleImageClick = (imageUrl) => {
        console.log('Clicked image URL:', imageUrl);
    }
</script>