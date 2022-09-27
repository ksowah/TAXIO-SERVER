import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs"
import User from "../../models/UserModel"
import { RegisterInput } from "./register/registerInput";
import isAuthorized from "../../middleware/auth";
import { sendEmail } from "../../utils/sendMail";
import { generateOTP } from "../../utils/generateOTP";


@Resolver()
export class RegisterResolver {
  // its okay to leave a dummy querry to make the resolver work
  // we can use the @Authorized decorator to protect a resolver either this or a middleware
  // @Authorized()
  // this is how its done with a middleware
  @UseMiddleware(isAuthorized)
  @Query(() => String)
  async hello() {
    return "Hello world!";
  }

  @Mutation(() => String) // return type
  async register(
    @Arg("data") {
        email,
        password
    }: RegisterInput,
   
  ): Promise<String> {

    const hashedPassword = await bcrypt.hash(password, 12);

    // save user to database
    const verificationCode = generateOTP(4);
    const user = await User.create({
        email,
        password: hashedPassword,
        verificationCode
    })

    console.log(user)

    // send email with the token
    await sendEmail(email, verificationCode)

    return "User registered successfully";
  }
}
