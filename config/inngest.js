import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";


// Create a client to send and receive events
export const inngest = new Inngest({ id: "E-Commerce" });

// Inngest function to sve user to data a databse
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async({event}) => {
        const {id, first_name, last_name, email_address, image_url } = event.data
        const userData ={
            _id:id,
            email:email_address[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl:image_url
        }
        await connectDB()
        await User.create(userData)
    }

)

// Inngestn funcfion to update user data in database
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'updte-user-from-clerk'
    },
    {event: 'clerk/user.updated'},
    async({event}) => {
        const {id, first_name, last_name, email_address, image_url } = event.data
        const userData ={
            _id:id,
            email:email_address[0].email_address,
            name: first_name + ' ' + last_name,
            imageUrl:image_url
        }
        await connectDB()
        await User.findOneAndUpdate(id,userData)
    }
)

// Inngestn funcfion to delete user data fron database
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {event: 'clerk/user.deleted'},
    async({event}) => {
        const {id } = event.data
       
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)


