<template>     
    <div> {{ $route.params.id }} {{ userProfile }}  </div>
</template>

<script>

import PostDataService from "../services/PostDataService";
export default {
  name: "ProfileOtherUser",

   data() {
    return {
      selectedUser: "",    
      editingUsername: false,
      editingEmail: false,
      isDisplay:false,
   }},

  
 created: function(){
  var id = this.$route.params.id
  console.log(id)

 },
  
  computed: {    
    dataUser(){  return JSON.parse(localStorage.getItem("user"))
}

},

   
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    created(){
      var id = this.$route.params.id
      console.log(id)

    },
    getUser(id) {
      PostDataService.getAnUser(id)
        .then(response => {
          this.userProfile = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    mounted() {        
        this.created()           
        this.getUrl()    
    },
  }
}

</script>


<style>

.card-header{
   background-color:  #091f43;
}

.title-pos{
  margin-top: 10px;
  color: #091f43;
  font-weight: bold;
}

.card-img{
  width: 125px;
}

.card-img-post{
  width: 125px;
  margin-top: 10px;
  border-bottom: none;
}

#posts-tab{
  border: 1px solid #e1e1e1;
  border-bottom: none; 
}

.btn-up{ 
  margin-bottom: 10px;
}

#images-tab{
  border: 1px solid #e1e1e1;
  border-bottom: none;
 
}
.nav-link{
  color: white;
  

} 
.p-dwn{
    margin-bottom: 2px;
}

.p-up{
  margin-bottom: -2px;
}

.btn-dwn{
  margin-bottom: 15px;
}
ul{
  list-style-type: none;
}

.box-header-body-input{
  box-shadow: 10px 7px 10px#091f43;
}

.card-body{
   box-shadow: 10px 7px 10px #091f43;
}
.title-img{
  width: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.gedf-main{
  margin-bottom: 100px;
}

.comment {
    width: 80%;
    overflow: hidden;
    border: 1px solid #091f43;
    margin-bottom: 30px;
    margin-left: 100px;
    box-shadow: 5px 5px 5px #091f43;  
} 

.aPost {
    width: 100%;
    min-height: px;
    overflow: hidden;
    border: 0.1vw solid white;
    margin-bottom: 30px;    
} 
.postBox {
    border: 1px solid #091f43;
    margin-bottom: 30px;    
} 
.list-group{
  border:white;
}
.list-group-item{
    border:white;
}
li{
   border:white
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  max-width: 100%;
  max-height: 500px;
}
.pink{
  border: 1px solid  #091f43;
  color:  #091f43;
}


</style>
