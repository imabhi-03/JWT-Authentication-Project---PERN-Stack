import pg from "pg";

const db=new pg.Client   (
    {
    user:"postgres",
    host:"localhost",
    database:"jwt",
    password:"postgres@37",
    post:5432,
  }   
);

db.connect();

export default db;