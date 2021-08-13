const HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'us-cdbr-east-04.cleardb.com';
const USER = process.env.NODE_ENV === 'development' ? 'administrator' : 'bc01683a59f1ae';
const PASSWORD = process.env.NODE_ENV === 'development' ? 'admin' : '39e7c0e4';
const DB = process.env.NODE_ENV === 'development' ? 'database_development' : 'heroku_3b2b8dfa8d264d5';
console.log('DB CONFIG' ,HOST )
console.log('DB CONFIG' ,process.env.NODE_ENV )
module.exports = {
  HOST,
  USER,
  PASSWORD,
  DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000

  }
};


// mysql --us-cdbr-east-04.cleardb.com --user=bc01683a59f1ae --password="39e7c0e4 --reconnect heroku_3b2b8dfa8d264d5 < schema.sql