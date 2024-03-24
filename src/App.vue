<script setup>
  import { ref, onMounted, nextTick, defineAsyncComponent } from 'vue';
  import Header from './components/Header.vue';

  const Pixis = defineAsyncComponent(() => import('./components/Pixis.vue'));
  const Div1 = defineAsyncComponent(() => import('./components/Div1.vue'));
  const Div2 = defineAsyncComponent(() => import('./components/Div2.vue'));

  const showPixis = ref(false);
  const showDiv1 = ref(false);
  const showDiv2 = ref(false);

  onMounted(() => {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      console.log('scrollPosition:', scrollPosition);
      console.log('pageHeight:', pageHeight);
      if (Math.abs(scrollPosition - pageHeight) < 1) {
        if (!showPixis.value) {
          showPixis.value = true;
        } else if (!showDiv1.value) {
          setTimeout(() => { showDiv1.value = true; }, 10000); // 20 seconds delay
        } else if (!showDiv2.value) {
          setTimeout(() => { showDiv2.value = true; }, 20000); // 20 seconds delay
        }
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
  <Div1 v-if="showDiv1"/>
  <Div2 v-if="showDiv2"/>
</template>

<style scoped>
.pixis, .div1, .div2 {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>