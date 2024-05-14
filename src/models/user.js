import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  registeredAt: {
    type: Date,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
