import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyUsed";


@InputType()
export class RegisterInput {
    
    @Field() 
    @Length(1, 255, {message: "First name must be more than 1 character"})  
    firstName: string

    @Field() 
    @Length(1, 255, {message: "Last name must be more than 1 character"})
    lastName: string

    @Field() 
    @IsEmail({message: "email must be a valid email"})
    @IsEmailAlreadyExist({message: "A user already exists with this email"})
    email: string

    @Field() 
    @Length(6, 255, {message: "Password must be more than 6 characters"})
    password: string
  
}
