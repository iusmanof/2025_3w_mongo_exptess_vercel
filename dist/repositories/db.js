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
exports.runDB = exports.postCollection = exports.blogCollection = void 0;
const mongodb_1 = require("mongodb");
// const url = "mongodb+srv://igralex1:qwert!@cluster0.uocz9zz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const url = "mongodb://localhost:27017";
console.log("url", url);
const client = new mongodb_1.MongoClient(url);
exports.blogCollection = client.db('local').collection('blogs');
exports.postCollection = client.db('local').collection('post');
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connect successfully to server");
    }
    catch (e) {
        console.error("Don't connect to server");
        console.log(e);
        yield client.close();
    }
});
exports.runDB = runDB;
