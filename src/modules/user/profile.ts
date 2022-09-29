import { Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import User from "../../models/UserModel"
import { Person } from "../../types/gqlTypes";
import { ProfileInput } from "./userProfile/profileInputs";
import { MyContext } from "src/types/myContext";
import isAuthorized from "../../middleware/auth";


@Resolver()
export class ProfileResolver {

    @UseMiddleware(isAuthorized)
  @Mutation(() => Person) // return type
  async profile(
    @Arg("data") {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        gender
    }: ProfileInput,
    @Ctx() ctx: MyContext
  ): Promise<Person> {

    const user = await User.findById(ctx.req.user)

        if(!user) {
            throw new Error("No user found");
        }

        

        user.firstName = firstName;
        user.lastName = lastName;
        // date of birth accepted by mongoose as a Date object
        user.dateOfBirth = new Date(dateOfBirth);
        user.phoneNumber = phoneNumber;
        user.gender = gender as any;

        await user.save();

        return user;
  }
}
