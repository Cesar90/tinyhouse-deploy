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
exports.resolvers = void 0;
const mongodb_1 = require("mongodb");
exports.resolvers = {
    Query: {
        listings: (_root, _args, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield db.listings.find({}).toArray();
        })
    },
    Mutation: {
        deleteListing: (_root, { id }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            const deleteRes = yield db.listings.findOneAndDelete({
                _id: new mongodb_1.ObjectId(id)
            });
            if (!deleteRes.value) {
                throw new Error('failed to delete listing');
            }
            return deleteRes.value;
            // for(let i = 0; i < listings.length; i++){
            //     if(listings[i].id === id){
            //         return listings.splice(i, 1)[0]
            //     }
            // }
            // throw new Error("failed to delete listing")
        })
    },
    Listing: {
        id: (listing) => listing._id.toString()
    }
};
