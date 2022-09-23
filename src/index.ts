import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv"
import connectDB from "./config/db";
import session = require("express-session");
import { sessionOption } from "./redis";
import cors = require("cors");

dotenv.config()

connectDB()

const main = async () => {
    const schema = await buildSchema({
      // get all resolvers in directory
      resolvers: [__dirname + "/modules/**/*.ts"],
        // authChecker: ({ context: { req } }) => {
        //   // returns  true if the user is logged in else false
        //     return !!req.session.userId
        // }
    })
    
   const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }), // pass the express request to the context to be used in the resolvers 
})

    const app = Express();

    await apolloServer.start();

    app.set('trust proxy', process.env.NODE_ENV !== 'production')
    
    const corsOptions = {
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
      credentials: true
    };
    app.use(cors(corsOptions))
    
      app.use(session(sessionOption));

    apolloServer.applyMiddleware({ app, cors: corsOptions });
    
    app.listen(4000, () => console.log("Server started on http://localhost:4000/graphql"))

}

main()