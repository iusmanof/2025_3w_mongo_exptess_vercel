import {blogCollection} from "../repositories/db";
import {BlogInputModel} from "../model_types/BlogInputModel";
import {ObjectId} from "mongodb";

export const blogDataAccessLayerMongoDB = {
    async getAllBlogs(){
        return await blogCollection.find({}).toArray()
    },
    async getBlogById(id: string){
        return await blogCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlog(blog: BlogInputModel){
        const blogCreated: BlogInputModel = {
            name: blog.name!,
            description: blog.description!,
            websiteUrl: blog.websiteUrl,
        };
        await blogCollection.insertOne(blogCreated)
        return blogCreated
        // return {
        //     ...blogCreated,
        //     id: result.insertedId.toString(),  // возвращаем id как строку
        // };
    },
    async updateBlog(id: string, blog: BlogInputModel){
      const isUpdated = await blogCollection.updateOne({ _id: new ObjectId(id) }, {$set: {name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl}});

      return isUpdated.matchedCount !== 0;

    },
    async deleteBlog(id: string){
        const isDeleted = await blogCollection.deleteOne({_id: new ObjectId(id)})

        return isDeleted.deletedCount !== 0;

    },
    async deleteAllBlogs(){
        return await blogCollection.deleteMany({})
    }
}