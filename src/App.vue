<script setup>
  import { ref, onMounted, nextTick, defineAsyncComponent } from 'vue';
  import Header from './components/Header.vue';

  const Pixis = defineAsyncComponent(() => import('./components/Pixis.vue'));

  const showPixis = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      console.log('scrollPosition:', scrollPosition);
      console.log('pageHeight:', pageHeight);
      if (Math.abs(scrollPosition - pageHeight) < 1) {
        showPixis.value = true;
        nextTick(() => {
          let lastScrollPosition = -1;
          const intervalId = setInterval(() => {
            if (window.pageYOffset === lastScrollPosition) {
              clearInterval(intervalId);
            } else {
              lastScrollPosition = window.pageYOffset;
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
          }, 20);
        });
      }
    });
  });
</script>

<template>
  <Header/>
  <Pixis v-if="showPixis"/>
</template>

<style scoped>
.pixis {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>