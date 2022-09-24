import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {

    @Field() 
    @Length(6, 255, {message: "Password must be more than 6 characters"})    
    password: string
  
}
