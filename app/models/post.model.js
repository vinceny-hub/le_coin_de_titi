module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
   
    imageUrl: { 
      type: Sequelize.STRING(99)
    },  
    description: {
      type: Sequelize.STRING(255)
    },
  

    
  });
 

  return Post;
};

