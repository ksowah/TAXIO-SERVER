import { MyContext } from "src/types/myContext";
import { MiddlewareFn } from "type-graphql";
import jwt = require("jsonwebtoken")

declare module 'express-serve-static-core' {
    interface Request {
     user: any
   }
 }

const isAuthorized: MiddlewareFn<MyContext> = async ({ context }, next) => {
   let token
    try {
        token = context.req.headers.authorization?.split(" ")[1]
        const decoded: any = jwt.verify(token || "", process.env.JWT_SECRET || "")
        context.req.user = decoded.id
    } catch (error) {
        console.log(error)
        throw new Error("Not authorized, no token")
    }
    return next();
  };

export default isAuthorized