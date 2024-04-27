import mongoose from "mongoose";
/*
       userId: faker.string.uuid(),
       username: faker.internet.userName(),
       email: faker.internet.email(),
       avatar: faker.image.avatar(),
       password: faker.internet.password(),
       birthdate: faker.date.birthdate(),
       registeredAt: faker.date.past(),
*/ 
const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    username:{
        type: String
    },
    email:{
        type: String
    },
    avatar:{
        type: String
    },
    password: {
        type: String
    },
    birthdate: {
        type:Date
    },
    registeredAt: {
        type:Date

    },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
