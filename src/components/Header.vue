<script setup>
    
</script>


<template>
    <header>
      <div class="left-header">
        <h1>Wall Maria</h1>
          <p>
            Paradis island is the last hope for humanity after the Titan genocide which occured 100 years ago
            brigning humanity to near extinction. Now humanity is well-protected in the walls which enclose thousands
            of houses, churches, palaces and gardens. The wall was created by Ymir (the Goddess for Eldians) by her mystical powers.
            Wall Maria has been built carefully so as to utilise as less resources as possible yet covering all the boundary of humanity's 
            habitat. Its only a matter of time till it's compromised....
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
    background-color: #C19A6B;
    background-image: url('../assets/wallpaper.jpg');
    background-size: cover;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
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
    font-weight: 800;
    font-size: 48px;
    margin-left: 175px;
    font-family: 'Times New Roman', Times, serif;
  }
  
  header .left-header p {
    font-family: 'Times New Roman', Times, serif;
    margin-left: 50px;
    font-weight: 400;
    margin-top: 15px;
    font-size: 22px;
    border: 2px solid rgb(19, 11, 2);
    border-radius: 5px;
    background-color: #C19A6B;
    padding: 6px;
    margin-right: 4px;
  }
  
  
  header .right-header img {
    width: 100%;
    height: 100%;
    margin-top: 35px;
    margin-right: 10px;
    max-height: 300px;
    min-height: 100px;
  }
  
  header .right-header {
    position: absolute;
    margin-top: 5px; 
    right: 0;
    margin-right: 30px; 
  }
  </style>
  