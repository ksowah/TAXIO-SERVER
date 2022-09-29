import { Arg, Mutation, Resolver } from "type-graphql";
import User from "../../models/UserModel";
import bcrypt = require("bcryptjs");
import { ChangePasswordInputType } from "./changePassword/changePasswordInput";
import { Person } from "../../types/gqlTypes";


@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Person, { nullable: true })
  async changePassword(
    @Arg("data") {password, code}: ChangePasswordInputType,
  ): Promise<Person | null> {

    const user = await User.findOne({verificationCode: code});

    if (!user) {
      return null;
    }

    if(user.verificationCode !== code) {
      return null
    }

    const updatePassword = await bcrypt.hash(password, 12);

    await user.updateOne({ password: updatePassword }, { new: true });

    user.verificationCode = "";

    await user.save();

    return user;
  }
}
