
const multer = require('multer');                                       // import multer
const path = require('path');
// path.join(__dirname , '..' ,'images')
const storage = multer.diskStorage({                                    // path destination
  destination: (req, file, callback) => {
  callback(null, path.join(__dirname , '..' ,'..','images'));
  },

  filename: (req, file, callback) => {                                  //  name / extension / date
    const fileName = file.originalname.split('.')[0]
    const extension = file.originalname.split('.')[1]
    const name = fileName.split(' ').join('_');
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('file');












// const multer = require('multer')
// //type d'images
// const MIME_TYPES = {
//     'image/jpg': 'jpg',
//     'image/jpeg': 'jpg',
//     'image/png': 'png'
// }
// //destination folder
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => { 
//     callback(null, 'images')
// },
// //file image, new name depend of creation date
// filename: (req, file, callback) => {
//     const name = file.originalname.split(' ').join('_')
//     const extension = MIME_TYPES[file.mimetype]
//     callback(null, name + Date.now() +'.'+ extension)
//     console.log(name)
// }
// })

// module.exports = multer({ storage }).single('image')