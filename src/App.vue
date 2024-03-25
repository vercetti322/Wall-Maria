<script setup>
  import Div1 from './components/KPS.vue'
  import Div2 from './components/JV.vue';
  import '@fortawesome/fontawesome-free/css/all.css';
</script>

<template>
  <img src="./assets/wave.png" alt="" style="position: absolute; max-width:100%; left:0; margin-top: -15px; margin-right:-10px; max-width: 100vw; height:auto; z-index: -1; margin-bottom: 10px; overflow-x:hidden">
  <Header>
    <div class="intro">
      <h1>Visual Hull</h1>
      <p>Welcome to Visual Hull, a place to understand, learn and visualize the convex hull problem via- prune & search, i.e. Seidel and incremental apporaches, i.e. Jarvis March.</p>
    </div>
  </Header>
  <div class="kps">
    <h1>Kirkpatrick Seidel Algorithm</h1>
    <p>Explore the Kirkpatrick-Seidel Algorithm, a systematic method for computing convex hulls with precision. By intelligently pruning and searching, it minimizes computational complexity while accurately identifying convex shapes, making it ideal for large datasets in computational geometry tasks...</p>
  </div>
  <Div1/>
  <div class="jv">
    <h1>Jarvis March Algorithm</h1>
    <p>Discover the Jarvis March Algorithm, an efficient method for computing convex hulls. By iteratively selecting the next vertex with the smallest polar angle, it swiftly identifies convex shapes, making it ideal for computational geometry tasks with large datasets...</p>
  </div>
  <Div2/>
  <div class="footer">
      <div class="socials">
        <h3>Media links</h3>
        <a href="https://example.com/facebook"><i class="fab fa-facebook"></i></a>
        <a href="https://example.com/twitter"><i class="fab fa-twitter"></i></a>
        <a href="https://example.com/instagram"><i class="fab fa-instagram"></i></a>
    </div>
    <div class="references"></div>
  </div>
</template>

<style scoped>
  .kps, .jv, Header .intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .kps h1,
.jv h1 {
  margin-bottom: 0.01em;
  font-weight: 700;
  font-size: 42px;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
}

Header .intro h1 {
  margin-top: 200px;
  font-size: 64px;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
  margin-bottom: 1px;
} 

Header .intro p {
  margin-top: 60px;
  margin-bottom: 1.5rem;
  font-size: 20px;
  max-width: 750px;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
}

.kps p,
.jv p {
  margin-bottom: 1.75em;
  font-size: 18px;
  max-width: 750px;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
}

Header .intro {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
}

.footer {
  position: absolute;
  top: 1550px; /* Adjust the top position as needed */
  left: 0;
  width: 100%;
  padding: 20px; /* Example padding */
  background-color: #f2f2f2; /* Example background color */
  z-index: 999;
  display: flex;
  justify-content: center;
  background-image: url('./assets/footer.svg');
  background-size: auto 120px;
  background-repeat: no-repeat;
}

.socials {
  padding: 1px;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.socials h3 {
  margin-top: 5px;
  font-family: "Avantgarde", "TeX Gyre Adventor", "URW Gothic L", sans-serif;
}

.socials a i {
  font-size: 24px;
  color: black;
}

.socials a {
  margin-right: 30px; /* Adjust the spacing as needed */
  display: inline-block;
}

.socials a:last-child {
  margin-right: 0; /* Remove margin for the last anchor element */
}
</style>