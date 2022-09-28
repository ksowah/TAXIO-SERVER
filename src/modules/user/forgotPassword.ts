import User from "../../models/UserModel";
import { Arg, Mutation, Resolver } from "type-graphql";
import { sendEmail } from "../../utils/sendMail";
import { generateOTP } from "../../utils/generateOTP";


@Resolver()
export class ForgotPasswordResolver {
    @Mutation(()=> Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<Boolean> {

        const user = await User.findOne({email});

        if(!user) {
            return true;
        }

        const verificationCode = generateOTP(4)

        user.verificationCode = verificationCode;

        await user.save();

        // send email with the code
        await sendEmail(email, verificationCode)

        return true;
    }

}