import mongoose, { Schema, Document } from "mongoose";


//creating interface (Certain Rules that should be Followed)
export interface message extends Document {
    content: string;
    createdAt: Date
}

//Creating Schema using the interface above, all the fields must be present
const messageSchema: Schema<message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

//creating the interface for the user 
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean
    messages: message[]
}

//creating the Schema 
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User Name is Required !!"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "field is required !!"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
        //this will check for the user validation regexr code
    },
    password: {
        type: String,
        required: [true, "Password is Required !!"],
        unique: true,
    },
    verifyCode: {
        type: String,
        required: [true, "Code is Required !!"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Code is Required !!"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [messageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("UserModel", UserSchema)

export default UserModel; 