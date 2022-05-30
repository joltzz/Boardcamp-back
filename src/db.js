import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

if(process.env.MODE==="PROD"){
  db.ssl={
    rejectUnauthorized: false
  }
}

export default db;