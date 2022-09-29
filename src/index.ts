import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import * as Express from "express"
import { buildSchema } from "type-graphql";
import * as dotenv from "dotenv"
import connectDB from "./config/db";
import cors = require("cors");
import { config } from "./config";


dotenv.config()

connectDB()

const main = async () => {
    const schema = await buildSchema({
      // get all resolvers in directory
      resolvers: [__dirname + "/modules/**/*.ts"],
    })
    
   const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }), // pass the express request to the context to be used in the resolvers 
})

    const app = Express();

    await apolloServer.start();
    
    const corsOptions = {
      origin: true,
      credentials: true,
    };
    app.use(cors(corsOptions))

    apolloServer.applyMiddleware({ app, cors: corsOptions });

    app.listen(config.server.port, () => console.log("Server started on http://localhost:4000/graphql"))

}

main()