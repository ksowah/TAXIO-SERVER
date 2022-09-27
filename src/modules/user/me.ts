import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import User, { Person } from "../../models/UserModel"
import { MyContext } from "src/types/myContext";
import isAuthorized from "../../middleware/auth";

// fix the error userId is not a property of session
declare module 'express-serve-static-core' {
  interface Request {
   user: any
 }
}

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuthorized)
  @Query(() => Person, { nullable: true })
  async me(@Ctx() ctx: MyContext) : Promise<Person | null> {

console.log("me id",ctx.req.user)

    if(!ctx.req.user) {
      console.log("no user found");       
      return null;
    }
    
    const user = await User.findById(ctx.req.user)
    
    return user;
  }
}
