<template>
    <div>
        <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
    </div>
</template>

<script setup>
    import Carousel from './Carousel.vue';

    const carouselImages = [
        'https://via.placeholder.com/600x400?text=Slide+1',
        'https://via.placeholder.com/600x400?text=Slide+2'
    ]

    const handleImageClick = (imageUrl) => {
        console.log('Clicked image URL:', imageUrl);
    }
</script>