import jwt from 'jsonwebtoken'
import {Client} from 'pg';
import dotenv from 'dotenv'

dotenv.config()

const user = new Client({
  user: 'app_db_nexushml',
  host: dotenv.get.USER_HOST,
  database: dotenv.get.USER_BANCO,
  password: dotenv.get.USER_PASSWORLD,
  port: dotenv.get.USER_PORT,
});

user.connect();
user.query('SELECT key FROM auth_key WHERE id=1', (err, res) => {
  if (err) throw err;
  const authKey = res.rows[0].key;

  const payload = {
    
  }
})