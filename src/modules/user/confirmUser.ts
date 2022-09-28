import { Resolver, Mutation, Arg } from "type-graphql";
import User from "../../models/UserModel"


@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean) 
  async confirmUser(
    @Arg("code") code: string,
    @Arg("email") email: string,
  ): Promise<Boolean> {

    const user = await User.findOne({email});

    if (!user) {
        throw new Error("User not found")
    }

    if(user.verificationCode !== code) {
      throw new Error("Invalid code")
    }

    user.confirmed = true;
    user.verificationCode = "";

    await user.save();

    return true
  }
}
