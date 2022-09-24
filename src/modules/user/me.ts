import { Resolver, Query, Ctx } from "type-graphql";
import User, { Person } from "../../models/UserModel"
import { MyContext } from "src/types/myContext";

// fix the error userId is not a property of session
declare module 'express-session' {
    export interface SessionData {
      userId: any;
    }
  }

@Resolver()
export class MeResolver {
  @Query(() => Person, { nullable: true })
  async me(@Ctx() ctx: MyContext) : Promise<Person | null> {

    if(!ctx.req.session!.userId) {
      return null;
    }

    const user = await User.findById(ctx.req.session.userId);
    
    return user;
  }
}
