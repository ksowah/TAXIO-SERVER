import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import * as bcrypt from "bcryptjs"
import User, { Person } from "../../models/UserModel"
import { RegisterInput } from "./register/registerInput";
import { isAuthorized } from "../../middleware/auth";
import { sendEmail } from "../../utils/sendMail";
import { createConfirmationUrl } from "../../utils/confirmationUrl";


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

  @Mutation(() => Person) // return type
  async register(
    @Arg("data") {
        firstName,
        lastName,
        email,
        password
    }: RegisterInput,
   
  ): Promise<Person> {

    const hashedPassword = await bcrypt.hash(password, 12);

    // save user to database
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    console.log("the user >>",user);
    

    sendEmail(email, await createConfirmationUrl(user.id));

    return user;
  }
}
