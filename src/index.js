"use strict";
// require('dotenv').config()
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("./database");
const graphql_1 = require("./graphql");
// import {schema} from './graphql'
// import bodyParser from 'body-parser'
// import { listings } from './listings'
// const port = 9000
const mount = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.connectDatabase();
    app.use(body_parser_1.default.json({ limit: "2mb" }));
    app.use(cookie_parser_1.default(process.env.SECRET));
    app.use(compression_1.default());
    app.use(express_1.default.static(`${__dirname}/client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: graphql_1.typeDefs,
        resolvers: graphql_1.resolvers,
        context: ({ req, res }) => ({ db, req, res })
    });
    server.applyMiddleware({ app, path: '/api' });
    app.listen(process.env.PORT);
    console.log(`[app]:http://localhost:${process.env.PORT}`);
    // const listings = await db.listings.find({}).toArray()
    // console.log(listings)
});
mount(express_1.default());
// const server = new ApolloServer({ typeDefs: ``, resolvers: {} });
//const server = new ApolloServer({schema});
// const server = new ApolloServer({typeDefs, resolvers})
// server.applyMiddleware({ app, path: '/api' })
// app.use(bodyParser.json());
// app.get('/listings', (_req, res) => {
//   return res.send(listings)
// })
// app.post('/delete-listing',(req, res) => {
//   const id: string = req.body.id
//   for(let i = 0; i < listings.length; i++){
//     if(listings[i].id === id){
//       return res.send(listings.splice(i, 1))
//     }
//   }
//   return res.send('failed to delete listing')
// })
// app.listen(port)
// console.log(`[app]:http://localhost:${port}`)
