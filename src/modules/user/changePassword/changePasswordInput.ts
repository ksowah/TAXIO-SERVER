import { PasswordInput } from "../../../shared/passwordInput";
import { Field, InputType } from "type-graphql";

@InputType()
export class ChangePasswordInputType extends PasswordInput {
    @Field() 
    token: string
}
