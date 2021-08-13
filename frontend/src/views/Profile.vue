<template>
  <div class="container-fluid">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8 gedf-main">
        <div class="">          
          <div class="d-inline-flex p-2"> 
            <img class="title-img" src="../img/titi1.png" alt="icon logo titi">
            <h4 class="title-pos">Profil </h4>
          </div>
          <div class="card-body">
            <div class="">
              <div class="post-heading">
                <div class="container">
                  <header class="jumbotron">
                    <h3> <strong> {{currentUser.username}} </strong> Profil </h3>
                  </header>
                  <!-- <button v-if="currentUser.id" class="badge badge-danger mr-2 btn-up float-right" @click="editDeleteUser"> Delete account </button>   -->
                  <p class="p-up" v-if="!editingUsername"><strong>Username : {{currentUser.username}} </strong></p>
                  <input placeholder="Type something here..." ref="myTextarea" v-else type="text"  v-model="currentUser.username" class="form-control input-dwn" id="description"/>
                  <button v-show="editingUsername"   id="btnC" class="badge badge-secondary mr-2 btn-dwn " @click="cancelEditUsername()"> Cancel </button>
                  <button class="badge badge-success btn-dwn  buttonCEC" href="#top" @click="editUserUsername(currentUser)">  {{editingUsername? 'Update':'Edit'}} </button>
                  <p class="p-up" v-if="!editingEmail"><strong>Email : {{currentUser.email}}  </strong></p>
                  <input placeholder="Type something here..." ref="myTextarea" :min-height="30" :max-height="350" v-else type="text"  v-model="currentUser.email" class="form-control input-dwn" id="description"/>
                  <button v-show="editingEmail"   id="btnC" class="badge badge-secondary mr-2  btn-dwn " @click="cancelEditemail()"> Cancel </button>
                  <button class="badge badge-success  btn-dwn  buttonCEC" href="#top" @click="editUserEmail(currentUser)">  {{editingEmail? 'Update':'Edit'}} </button><p  v-show="editingEmail" class="warning"></p>
                  <br>
                  <!-- <p class="p-up" v-if="!editingPassword"><strong>AccessToken : {{currentUser.accessToken}}  </strong></p>
                  <input placeholder="Type something here..." ref="myTextarea" :min-height="30" :max-height="350" v-else type="text"  v-model="currentUser.accessToken" class="form-control input-dwn" id="description"/>
                  <button v-show="editingPassword"   id="btnC" class="badge badge-secondary mr-2  btn-dwn " @click="cancelEditPassword()"> Cancel </button>
                  <button class="badge badge-success  btn-dwn  buttonCEC" href="#top" @click="editUserPassword(currentUser)">  {{editingPassword? 'Update':'Edit'}} </button><p  v-show="editingPassword" class="warning"> Warning ! You will be logged-out to perform changes </p>
                  <br> -->
                  <p class=""> <strong>Id :</strong>  {{currentUser.id}}  </p>
                  <p class=""  v-for="(role,index) in currentUser.roles" :key="index"> <strong>Authorities:</strong> {{role}} </p>
                
                    <!-- <span v-for="(role,index) in currentUser.roles" :key="index">{{role}}</span>       -->
                  <!-- </div>   -->
                   <button v-if="currentUser.id" class="badge badge-danger mr-2 btn-up-del float-right" @click="editDeleteUser"> Delete account </button>   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>

import PostDataService from "../services/PostDataService";

export default {
  name: 'Profile',
  data() {
  return {
    user_Id: "",
    editingUsername: false,
    editingEmail: false,
    isDisplay:false,
  }},  

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
  logOut() {
    this.$store.dispatch('auth/logout');
    this.$router.push('/login');
  },

  editDeleteUser(){
      this.$confirm("Account will be deleted this action is irreversible", 'Are you sure ?').then(() => {
      this.deleteUser()
      })
        // .then(response => {
        // console.log(response.data);    
        // })
       .catch(e => {
        console.log(e);
        });     
  },

  deleteUser() {
    PostDataService.deleteUser(this.currentUser.id)     
      .then(()=> {
         this.logOut()
      })
      .catch(e => {
      console.log(e);
      });       
  },

  editUserUsername(){    
    this.editingUsername = this.editingUsername == true ? false : true    
    if(this.editingUsername == false){
    this.updateUserUsername()
      }
       // console.log(this.editingUsername)
  },

  editUserEmail(){    
    this.editingEmail = this.editingEmail == true ? false : true 
      // if(this.editingEmail== true){
      //  this.$alert("Warning ! After changing you will be logged-out to perform.")}
      if(this.editingEmail == false){
      this.updateUserEmail()    
      }  
  },

  // editUserPassword(){    
  //   this.editingPassword = this.editingPassword == true ? false : true    
  //   if(this.editingPassword == false){
  //   this.updateUserPassword()
  //     }
  //   },

  cancelEditUsername(){
    // this.show()
    this.editingUsername = this.editingUsername == false 
    let cUser = JSON.parse(localStorage.getItem('user'))
    console.log(cUser.username)
    this.currentUser.username = cUser.username
      // this.$router.go()   
  },

  cancelEditemail(){
    // this.show()
    this.editingEmail = this.editingEmail == false
      // this.$router.go()
    let cUser = JSON.parse(localStorage.getItem('user'))
    console.log(cUser.username)
    this.currentUser.email = cUser.email
  },

  updateUserEmail(){    
    PostDataService.updateUser(this.currentUser.id, this.currentUser)
    .then(res => {      
      if(res){ 
      localStorage.user = JSON.stringify(this.currentUser)  
      // this.$router.push({ name: "posts" });
      }              
    })     
      .catch(() => {
        let cUser = JSON.parse(localStorage.getItem('user'))
         console.log('email already exist')
          this.$alert("email already exist")
          .then(() =>
           this.currentUser.email = cUser.email
          // this.$router.go())
          )        
      })     
  },

  updateUserUsername(){    
    PostDataService.updateUser(this.currentUser.id, this.currentUser)
    .then(res => { 
     
      if(res){ 
      localStorage.user = JSON.stringify(this.currentUser)  
      // this.$router.push({ name: "posts" });
      }              
    })     
    .catch(() => {
      let cUser = JSON.parse(localStorage.getItem('user'))
      console.log('user already exist')
      this.$alert("user already exist")
      .then(() =>
      this.currentUser.username = cUser.username
        // this.$router.go())
        )
    })
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
.btn-up-del{ 
  margin-top: -10px;
}
.input-dwn{
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
  margin-bottom: 5px;
}
.btn-dwn{
  margin-bottom: 20px;
}
.warning{
  color: red;
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
  height: 50px;
  margin-top: 0px;
  margin-bottom: 0px;
  border-radius: 50%;
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
