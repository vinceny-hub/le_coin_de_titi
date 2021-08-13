<template>
  <div id="#top" class="container-fluid">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col-md-6 gedf-main card">
        <div v-if="currentComment" class="card-body">
          <h4>Post</h4>
          <div class="">
            <div class="post-heading">            
              <div   class="list-group">
                <div class="float meta ">
                  <div class="title h5">                <!-- comment username -->
                    <a href="#"><b> {{ currentComment.user.username }} </b></a>
                      made a post.
                  </div>
                  <h6 class="text-muted time"> {{ currentComment.createdAt.slice(7,10).replace(/-/g,` `) }} {{ currentComment.createdAt.slice(5,7).replace(/-/g,` `) }} {{ currentComment.createdAt.slice(0,4).replace(/-/g,`.`) }} {{currentComment.createdAt.slice(11,16).replace(/:/g,`h`)}} (UTC)</h6>
                </div>                            
              </div>                                                 <!-- get comment if editing -->
              <div v-if="!editing"> <h5><strong>{{ currentComment.description }}</strong></h5></div> 
              <textarea-autosize placeholder="Type something here..." ref="myTextarea" :min-height="30" :max-height="350" v-else type="text"  class="form-control" id="description" v-model="currentComment.description"/>
            </div>                                              <!-- edit, cancel and upload button. This is accesssible if current user is user whom made post or administrator-->
            <img v-if="dataUser.id == currentComment.userId || showAdminBoard" class="card-ico" src="../img/titi1.png" alt="icon titi">
            <button v-if="dataUser.id == currentComment.userId || showAdminBoard" class="btn btn-success float-right" @click="editPost(currentComment)"> {{editing? 'Update':'Modify'}} </button>
            <button v-show="!editing" class="btn btn-secondary mr-2 float-right" @click="$router.go(-1)"> Back </button>   
            <button v-show="editing" v-if="dataUser.id == currentComment.userId || showAdminBoard" class="btn btn-secondary mr-2 float-right" @click="cancel()"> Cancel </button>
            <button  v-show="editing" v-if="dataUser.id == currentComment.userId || showAdminBoard" class="badge badge-danger mr-2" @click="deleteComment"> Delete </button>     
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostCommentService from "../services/PostCommentService";
// import CommentPostService from "../services/CommentPostService";

export default {
  name: "post",
  data() {
    return {
        comments:[],
        currentComment: null,
        currentIndex: -1,         
        message: '',
        comment: {
          id: null,
          post_id: "",      
          description: "",
          user_Id: "",
          username: "",
          published: false
      },
        currentPost: null,      
        editing: false,      
    };
  },

  methods: {
    // save a comment
    saveComment() {     
      let dataUser = JSON.parse(localStorage.getItem("user"))
      console.log(dataUser)  
      var data = {     
        description: this.comments.description,
        userId : dataUser.id,
        username : dataUser.username,
        postId : this.currentPost.id,
        id: this.comments.id,        
      }
    
    PostCommentService.create(data)
        .then(response => {
          this.comment.id = response.data.id;        
          console.log(response.data);
          this.submitted = true;       
        })
        .catch(e => {
          console.log(e);
        });
    },
    // get all comment
    getComment() {
      PostCommentService.getAll()
        .then(response => {
          this.comments = response.data;
          console.log(response.data);        
        })
        .catch(e => {
          console.log(e);
        });
    },
    // get a comment
    getCommentId(id) {
      PostCommentService.get(id)
        .then(response => {
          this.currentComment = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    // cancel button
    cancel(){
      this.editing = this.editing == false
    },
    // cancelled 
    cancelled(){
      this.$router.push({ name: "posts" });

    },
    // edit a post
    editPost(){    
      this.editing = this.editing == true?false:true    
        if(this.editing== false){
        this.updateComment()
        }      
      console.log(this.editing)
    },
    // update a comment
    updateComment() {
        var data = {    
       description: this.currentComment.description}
      PostCommentService.update(this.currentComment.id, data)
        .then(response => {
          console.log(response.data);
          this.message = 'The post was updated successfully!';
          this.$router.push({ name: "posts" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    // delete a comment
    deleteComment() {
      PostCommentService.delete(this.currentComment.id)    
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "posts" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },

  mounted() {
    this.message = '';    
    this.getCommentId(this.$route.params.id);
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
};

</script>

<style>
.comment {
    width: 80%;
    overflow: hidden;
    border: 0.1vw solid grey;
    margin-bottom: 30px;
    margin-left: 100px;
} 

.aPost {
    width: 100%;
    min-height: px;
    overflow: hidden;
    border: 0.1vw solid white;
     margin-bottom: 30px;  
} 
.postBox {   
    border: 0.1vw solid grey;
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
.card-ico{
  margin-top: -0px;
  width: 37px;
  border-radius: 50%;
}
.textBox{
   width: 100%;
}
.gedf-main{  
   margin-bottom: 200px;  
   box-shadow: 10px 7px 10px #091f43;
}
.marginBottomButton{
  margin-bottom: 30px;
  margin-right: 15px;
}
.marginRightButton{ 
  margin-bottom: 30px;
}

#description{
  margin-bottom: 15px;
}

</style>
