
CRUD_mySQL_P7

First, clone this repository : 

git clone https://github.com/vinceny-hub/CRUD_mySQL_P7.git

****************************************
Database MySQL 
Create a MySQL database like following in your MySQL path :

CREATE DATABASE database_development;

CREATE USER 'administrator'@'localhost' IDENTIFIED BY 'admin';

GRANT INSERT ON *.* 'administrator'@'localhost';


' Or you can use your own MySQL Database ' 

For that you can modify parameters as it is convenient for you in the file :

Backend/app/config/db.config.js

and modify fields USER, PASSWORD, & DB as you configure your database

{
"development": {
"username": "administrator",
"password": "admin",
"database": "database_development",
"host": "127.0.0.1",
"dialect": "mysql"
},

*******************************************************************************************************
Open folder CRUD_mySQL_P7 in the terminal of your favorite SOURCE-CODE EDITOR and follow the next steps
*******************************************************************************************************

Frontend 
Type in the Frontend folder :

> cd frontend

> npm install

> npm run serve

if the navigator is not open automatically go to :

http://localhost:8081/

******************************************************************
Backend 
Type in the Backend folder :

> cd backend

> npm install

> nodemon

At this point, an administrator account would be created. To login into the application as administrator: 

Username : admin
Password : ADMIN 

