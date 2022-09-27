import { IsEmail } from "class-validator";
import { PasswordInput } from "../../../shared/passwordInput";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyUsed";


@InputType()
export class RegisterInput extends PasswordInput {

    @Field() 
    @IsEmail({message: "email must be a valid email"})
    @IsEmailAlreadyExist({message: "A user already exists with this email"})
    email: string
  
}
