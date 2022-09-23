import { forgotPasswordPrefix } from "../../constatnts/prefixes";
import { redis } from "../../redis";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import User, { Person } from "../../models/UserModel";
import bcrypt = require("bcryptjs");
import { ChangePasswordInputType } from "./changePassword/changePasswordInput";
import { MyContext } from "../../types/myContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Person, { nullable: true })
  async changePassword(
    @Arg("data") {password, token}: ChangePasswordInputType,
    @Ctx() ctx: MyContext
  ): Promise<Person | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return null;
    }

    const user = await User.findById(userId);

    if (!user) {
      return null;
    }

    const updatePassword = await bcrypt.hash(password, 12);

    await user.updateOne({ password: updatePassword }, { new: true });

    await redis.del(token);

    ctx.req.session!.userId = user.id;

    return user;
  }
}
