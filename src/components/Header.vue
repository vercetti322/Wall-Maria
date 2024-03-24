<script setup>
    
</script>


<template>
    <header>
      <div class="left-header">
        <h1>Wall Maria</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam sapiente explicabo, provident atque assumenda
            placeat at ut ipsam quis quia minus perspiciatis a quae unde architecto sed quibusdam nam odit magni libero
            nesciunt? Quam dignissimos ducimus doloribus est eos. Culpa facere deserunt quaerat eligendi in, dolores
            doloremque excepturi harum? Optio laborum sit qui repellat ab hic fuga dolorem aliquam veritatis cum, omnis
            necessitatibus aperiam nihil molestiae ut exercitationem possimus nam impedit. Impedit fugiat quo ipsam omnis
            quisquam aliquid voluptatem nostrum voluptatum, deserunt incidunt, facilis repudiandae, adipisci maxime molestiae
            at! Illo labore in quae aspernatur inventore dolorem. Praesentium sunt explicabo nihil.
          </p>
      </div>
      <div class="right-header">
        <img src="../assets/garrison-flag.webp">
      </div>
    </header>
  </template>
  
  <style scoped>
  header {
    opacity: 0;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.5s;
    position: relative;
    display: flex;
    background-color: aquamarine;
    background-image: url('../assets/wallpaper.jpg');
    border: 2px solid black;
    background-size: cover;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    } 
    to {
      opacity: 1;
    }
  }
  
  header .left-header {
    max-width: 550px;
    min-width: 250px;
  }
  
  header .left-header h1 {
    font-weight: 600;
    font-size: 48px;
    margin-left: 30px;
    font-family: 'Times New Roman', Times, serif;
  }
  
  header .left-header p {
    font-family: 'Times New Roman', Times, serif;
    margin-left: 40px;
    font-weight: 400;
    font-size: 18px;
  }
  
  
  header .right-header img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    min-height: 100px;
  }
  
  header .right-header {
    position: absolute;
    margin-top: 5px; 
    right: 0;
    margin-right: 30px; 
  }
  </style>
  