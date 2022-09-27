import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import * as bcrypt from "bcryptjs"
import User, { Person } from "../../models/UserModel"
import { MyContext } from "src/types/myContext";


// fix the error userId is not a property of session
declare module 'express-session' {
  export interface SessionData {
    userId: any;
  }
}


@Resolver()
export class LoginResolver {
  @Mutation(() => Person, {nullable: true}) // return type nullable because we might not find a user
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext // get the context from the request to set the cookie
  ): Promise<Person | null> {

    const user = await User.findOne({email});

    if (!user) {
      console.log("no user found");
        throw new Error("Make sure your email and password are correct");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        throw new Error("Make sure your email and password are correct");
    }

    if(!user.confirmed) {
      console.log("user not confirmed");
        throw new Error("Please confirm your email");
    }

    ctx.req.session.userId = user.id; // set the cookie with the user id

    console.log("context >>>>", ctx.req.session);
    

    return user;
  }
}
