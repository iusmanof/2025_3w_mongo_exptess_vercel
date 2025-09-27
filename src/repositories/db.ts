import { MongoClient } from 'mongodb'
import {BlogViewModel} from "../model_types/BlogViewModel";
import {BlogInputModel} from "../model_types/BlogInputModel";

// const url = "mongodb+srv://igralex1:qwert!@cluster0.uocz9zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const url = "mongodb://localhost:27017"
console.log("url", url)

const client = new MongoClient(url)
export const blogCollection = client.db('local').collection<BlogInputModel>('blogs')
export const postCollection = client.db('local').collection<BlogViewModel>('post')

export const  runDB = async () =>{
    try {
        await client.connect();
        console.log("Connect successfully to server")
    } catch (e) {
        console.error("Don't connect to server")
        console.log(e)
        await client.close();
    }
}