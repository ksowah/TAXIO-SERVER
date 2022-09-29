import { Field, InputType } from "type-graphql";


@InputType()
export class ProfileInput {

    @Field() 
    firstName: string

    @Field()
    lastName: string

    @Field()
    dateOfBirth: Date

    @Field()
    phoneNumber: string

    @Field()
    gender: string

}
