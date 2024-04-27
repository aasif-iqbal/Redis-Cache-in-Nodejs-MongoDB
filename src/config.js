import mongoose from "mongoose";

export default async function connectionDB(){
    const url = 'mongodb://localhost:27017/user_db'

    try{
        const client = await mongoose.connect(url);
        console.log('database is connected');
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}







//https://blog.appsignal.com/2023/08/09/how-to-use-mongodb-and-mongoose-for-nodejs.html
// export const port = process.env.PORT;
