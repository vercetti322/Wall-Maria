

<template>
  <Header/>
  <div class="pixis">
      <img src="../assets/pixis-logo.jpg">
      <p id="pixis-intro">Lorem ipsum do
        lor, sit amet consectetur adipis
        icing elit. Nesciunt hic nam ani
        
        mi suscipit explicabo alias rerum at, vitae recusandae doloremque unde molestiae eligendi, ipsa sapiente, ea repellat sit necessitatibus non. Numquam molestiae cum porro, nisi consequuntur exercitationem saepe omnis eligendi, nam magnam cumque sapiente sint ea nesciunt repudiandae expedita eos.
      </p>
  </div>
</template>

<style scoped>

  Header, .pixis {
    margin-bottom: 30px;
  }

  .pixis {
    opacity: 0;
    display: flex;
    padding: 10px;
    background-color: #EADDCA;
    border: none;
    border-radius: 5px;
    animation: fadeIn 1s ease-in-out forwards;
    animation-delay: 0.5s;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
  }

  .pixis img {
    max-height: 200px;
    border-radius: 5px;
    border: 1px solid #C19A6B;
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 130px;
    box-shadow: 0 2px 4px rgba(121, 74, 20, 0.75);
  }

  .pixis #pixis-intro {
    left: 0;
    height: 100%;
    margin-right: 80px;
    width: 100%;
    margin-top: 35px;
    margin-bottom: 35px;
    float: right;
    padding: 5px;
    font-size: 18px;
  } 

  @keyframes fadeIn {
    from {
      opacity: 0;
    } 
    to {
      opacity: 1;
    }
  }
</style>