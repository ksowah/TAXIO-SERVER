import User from "../../models/UserModel";
import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from "../../redis";
import { v4 } from "uuid";
import { sendEmail } from "../../utils/sendMail";
import { forgotPasswordPrefix } from "../../constatnts/prefixes";


@Resolver()
export class ForgotPasswordResolver {
    @Mutation(()=> Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<Boolean> {

        const user = await User.findOne({email});

        if(!user) {
            return true;
        }

        const token = v4();

        await redis.set(forgotPasswordPrefix + token, user.id, "EX", 60 * 60 * 24);

        // send email with the token
        await sendEmail(email, `http://localhost:3000/user/change-password/${token}`);

        return true;
    }

}