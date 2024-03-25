<template>
    <div>
        <Carousel :images="carouselImages" @imageClick="handleImageClick"/>
    </div>
</template>

<script setup>
    import Carousel from './Carousel.vue';

    const carouselImages = [
        'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://via.placeholder.com/600x400?text=Slide+2'
    ]

    const handleImageClick = (imageUrl) => {
        console.log('Clicked image URL:', imageUrl);
    }
</script>