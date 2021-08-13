<template>
  <div id="app">  
    <nav id="#top" class="navbar navbar-expand-lg navbar-light bg-white border-nav static-top">
      <div class="container">
        <div class="titi_bloc">
        <a class="navbar-brand head-logo titi_bloc"  @click.prevent href="#">
          
          <img class="head-img" src="./img/titi0.png" alt="logo titi">
           <p class="titi_title"> Le coin de Titi </p>
        </a>
        </div>
        <button class="navbar-toggler border" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse navbar-light" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li v-if="currentUser" class="nav-item">
              <router-link to="/posts" class="nav-link">
                <font-awesome-icon icon="home" />Home
              </router-link>
            </li>
            <li v-if="showAdminBoard" class="nav-item">
              <router-link to="/admin" class="nav-link">Admin Board</router-link>
            </li>
            <li v-if="showModeratorBoard" class="nav-item">
              <router-link to="/mod" class="nav-link">Moderator Board</router-link>
            </li>        
            <div v-if="!currentUser" class="navbar-nav">
              <li class="nav-item">
                <router-link to="/register" class="nav-link">
                  <font-awesome-icon icon="user-plus" />Sign Up
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/login" class="nav-link">
                  <font-awesome-icon icon="sign-in-alt" />Login
                </router-link>
              </li>
            </div>      
            <div v-if="currentUser" class="navbar-nav">
              <li class="nav-item">
                <router-link to="/profile" class="nav-link">
                  <font-awesome-icon icon="user" />
                  {{ currentUser.username }}
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href @click.prevent="logOut">
                  <font-awesome-icon icon="sign-out-alt" />LogOut
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container"> 
      <router-view />
    </div>
    <footer id="sticky-footer" class="py-4  text-white-50">
      <div  id="commentArea" class="container text-center">
        <small>Copyright  &copy;  <img class="foot-img" src="./img/titiCage.png" alt="footer logo titi"></small> 
      </div>
    </footer>
  </div>   
</template>


// export default {
//  name: "app"
//   };


<script>

export default {
  name: "app",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>


nav{
  margin-top: 10px;
  margin-bottom: 30px;
}

.navbar-brand img {
  height: 50px;
  
}

.head-img{
  width: 50px;
  height: 0px;
  border-radius: 50%;

  float: left;
}

.foot-img{
  width: 35px;
  height: 32.5px;
  border-radius: 50%;
  margin-left: 25px;
}
footer{  
  background-color:#091f43;  
  bottom:0;
  width:100%;
}

.border-nav{
  border-bottom: 1px solid #091f43 ;
}
.titi_title{
  padding-top: 5px;
  margin-left: 60px;
  font-weight: bold;
  font-size: 25px;
  color:rgb(55, 13, 133);
  font-family:Verdana;
 

}
 /* .titi_bloc{
  display: table-cell;
 
  
} */
 /* .titi_title > img{
  width: 50px;
 
   
}  */



/* .titi_bloc > h3{
  line-height: 50px;
} */ 

</style>
