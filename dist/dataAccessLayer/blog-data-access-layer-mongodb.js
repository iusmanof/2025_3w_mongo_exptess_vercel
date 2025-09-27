"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogDataAccessLayerMongoDB = void 0;
const db_1 = require("../repositories/db");
const mongodb_1 = require("mongodb");
exports.blogDataAccessLayerMongoDB = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.find({}).toArray();
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogCreated = {
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
            };
            yield db_1.blogCollection.insertOne(blogCreated);
            return blogCreated;
            // return {
            //     ...blogCreated,
            //     id: result.insertedId.toString(),  // возвращаем id как строку
            // };
        });
    },
    updateBlog(id, blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const isUpdated = yield db_1.blogCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { name: blog.name, description: blog.description, websiteUrl: blog.websiteUrl } });
            return isUpdated.matchedCount !== 0;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const isDeleted = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return isDeleted.deletedCount !== 0;
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.blogCollection.deleteMany({});
        });
    }
};
