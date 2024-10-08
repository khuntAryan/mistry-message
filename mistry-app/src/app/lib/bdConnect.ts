import mongoose, { Mongoose } from "mongoose"

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("already connected to db !!");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState

        console.log("db connected successfully !!")
    } catch (error) {
        console.log("connection failed !!", error);
        process.exit(1)
    }
}

export default dbConnect;