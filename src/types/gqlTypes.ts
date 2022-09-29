import mongoose from 'mongoose'
import { ObjectType, Field, ID } from "type-graphql"


// create user type for gql
@ObjectType()
export class Person {

    @Field()
    email: string;

    password: string;

    verificationCode: string;

    confirmed: boolean;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    dateOfBirth: Date;

    @Field()
    phoneNumber: string;

    @Field()
    gender: string
}

@ObjectType()
export class UserType {
    @Field()
    success: boolean;

    @Field()
    user: Person;

    @Field()
    token: string;
}
