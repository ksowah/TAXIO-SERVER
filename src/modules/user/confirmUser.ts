import { Resolver, Mutation, Arg } from "type-graphql";
import User from "../../models/UserModel"
import { redis } from "../../redis";


// fix the error userId is not a property of session
declare module 'express-session' {
  export interface SessionData {
    userId: any;
  }
}


@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean) // return type nullable because we might not find a user
  async confirmUser(
    @Arg("token") token: string,
  ): Promise<Boolean> {

    const userId = await redis.get(token);
   
    if(!userId) {
        return false;
    }

    await User.findByIdAndUpdate(userId, {confirmed: true}, {new: true});

    await redis.del(token);

    return true
  }
}
