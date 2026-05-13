import mysql from 'mysql2'
import 'dotenv/config'
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"learningfullstack",
password:"PASSWORDISJIA13@",

})
db.connect()
export default db