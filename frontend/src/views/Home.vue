<template>
  <div class="container">
    <header class="home-logo-color-titi">
      <a class=""  @click.prevent href="#">
          <img class="head-img-logo" src="../img/titi1.png" alt="header logo titi "><h3 class="font-weight-bold"></h3>
        </a>
      <!-- <h3>{{content}}</h3> -->
    </header>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style>
.home-logo-color-titi{
 width: 50vw; 
 height: 32.5vw;
 margin: 0 auto;
 text-align: center;
 background-color:yellow;
 margin-bottom: 150px;
}
.home-logo-color img{
 width: 50vw;
 height: 10vw;
}
.head-img-logo{
  width: 32.5vw;
  height: 32.5vw;
  border-radius:50%;
  
}

</style>
