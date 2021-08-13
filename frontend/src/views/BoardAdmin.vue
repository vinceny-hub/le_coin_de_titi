<template>
  <div class="container-fluid">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-8 gedf-main">
        <div class="">          
          <div class="d-inline-flex p-2"> <img class="title-img" src="../img/titi1.png" alt="icon logo titi"><h4 class="title-pos">Posts</h4></div>
          <div class="">
            <div class="post-heading">            
              <ul class="list-group">                             <!-- set active user -->
                <li class="card rounded card-white postBox" @click="setActiveUser(user)" :class="{ active: user == currentUser}" v-for="(user, index) in users" v-bind:key="user.id"> 
                  <div class="card-body">
                    <div class="float meta ">
                      <div class="title h5">
                        <ul>                              <!-- list of users -->
                          <li><b> Username : {{ user.username }} </b></li> 
                          <li  :href="'/profile/' + post.id"><b> email : {{ user.email }} </b></li> 
                          <li  :href="'/profile/' + post.id"><b> date d'inscription : {{ user.createdAt }} </b></li> 
                          <li  :href="'/profile/' + post.id"><b> id : {{ user.id }} </b></li> 
                        </ul>                        
                      </div>                      
                    </div>           
                    <div class="">
                      <div class="post-heading">
                        <div class="float meta">
                          <div class="title h5"></div> 
                        </div>
                      </div>
                    </div>              
                    <div>                                               <!-- part to delete an user -->
                      <img class="card-img" src="../img/icon-left-font-sized.png" alt="logo titi">
                      <a><button  href="#top" class=" btn btn-sm btn-danger float-right float-bottom" @click="deleteUser(user, index)"> Delete </button></a>
                    </div>
                  </div>             
                </li>
              </ul>            
            </div>                                          <!-- Option to remove all users in progress -->
          </div>
          <!-- <button v-if="showAdminBoard" class="m-3 btn btn-sm btn-danger" @click="removeAllUsers"> Remove All </button>  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "post-list",
  data() {
    return {
      posts:[],
      currentPost: null,
      currentIndex: -1,         
      message: '',

      post: {
      id: null,    
      description: "",
      user_Id: "",
      published: false
      },

      submitted: false,
      selectedIndex: null,
      editing: false,
      emptyError:false,
      users:'',
      index:'',
      selectUser:""
  }    
},

  computed: {
    dataUser(){  return JSON.parse(localStorage.getItem("user"))
    },

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
    // cancel button
    cancel(){
       this.editing = this.editing == false
    },
    // edit a post
    editPost(){    
    this.editing = this.editing == true?false:true
    if(this.editing== false){
    this.updatePost()
    }        
    console.log(this.editing)
    },
    // update a post
    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then(response => {
        console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // delete an user
    deleteUser(user, index) {
      this.selectUser = user;
      this.currentIndex = index;    
        console.log(user.id)  
      this.$confirm("Account will be deleted this action is irreversible", 'Are you sure ?').then(() => {
      PostDataService.deleteUser(user.id)    
      this.users.splice(index,1)
        console.log(user.id)
      })
        // .then(response => {
        // console.log(response.data);    
        // })
       .catch(e => {
        console.log(e);
        });    
    },
    // delete a post
    deletePost() {    
      PostDataService.delete(this.currentPost.id)
        .then(response => {
          console.log(response.data);
          this.retrievePosts();       
        })
        .catch(e => {
          console.log(e);
        });       
    },
    // get all posts
    retrievePosts() {
      PostDataService.getAllUsers()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })        
        .catch(e => {
          console.log(e);
        });
    },
    // refreshing list
    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },
    // activate part
    setActiveUser(user, index) {
      this.selectUser = user;
      this.currentIndex = index;
      
      console.log(user.id)
    },
    // removing all posts
    removeAllPosts() {
      PostDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    // search by title ... in progress
    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // save a post
    savePost() {
      if (!this.post.description) {
      this.emptyError = this.emptyError == true?false:true
      error => {      
        this.message =
        (error.response && error.response.data)             
      }}else{      
      let dataUser = JSON.parse(localStorage.getItem("user"))
      console.log(dataUser)
      // this.user = response.data1;
      var data = {       
        // title: this.post.title,
        description: this.post.description,
        user_Id : dataUser.id,        
      }}   
      PostDataService.create(data)
        .then(response => {
          this.post.id = response.data.id;
          // this.user_Id = 
          console.log(response.data);
          this.submitted = true;
          this.posts.push(data)
           this.retrievePosts();
          this.newPost()
        })
        .catch(e => {
          console.log(e);
        });
    },  
    // submit post
    newPost() {
      this.submitted = false;
      this.post = {};
    },
    // to logout
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
},
    // get all posts
    retrievePosts() {
      PostDataService.getAll()
      console.log(this.users)
        .then(response => {
          this.posts = response.data;
          console.log(response.data);        
        })
        .catch(e => {
        console.log(e);
        });
    },
    
    mounted() {
      this.retrievePosts();
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
#images-tab{
  border: 1px solid #e1e1e1;
  border-bottom: none;
}
.nav-link{
  color: white;
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
