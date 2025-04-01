import { Sequelize } from "sequelize-typescript";
import { Person } from "../src/models/person";


const connection = new Sequelize({
database: 'sisweb_db',
dialect: 'postgres',
username: 'sisweb_user',
password: 'HDK#$%Ljkwerff.89',
storage: ':memory:',
models: [
Person
]
});

async function connectionDB(){
try{
await connection.sync();
}catch(e){
console.log(e);
}
} 

export default connectionDB;
