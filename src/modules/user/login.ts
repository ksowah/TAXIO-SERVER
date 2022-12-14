import { Resolver, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs"
import User from "../../models/UserModel"
import { generateToken } from "../../utils/tokenGenerator";
import { UserType } from "../../types/gqlTypes";



@Resolver()
export class LoginResolver {
  @Mutation(() => UserType, {nullable: true}) // return type nullable because we might not find a user
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<UserType | null> {

    const user = await User.findOne({email});

    if (!user) {
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

    const data = {
      success: true,
      user,
      token: generateToken(user.id).accessToken
    }
    

    return data;
  }
}
