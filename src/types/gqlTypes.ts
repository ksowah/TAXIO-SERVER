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

    @Field()
    profileUpdated: boolean
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

@ObjectType()
export class Rides {
    @Field()
    description: string;

    @Field()
    lat: string;

    @Field()
    lng: string;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    user: string;
}

@ObjectType()
export class Bookings {
    @Field()
    distance: string;

    @Field()
    time: string;

    @Field()
    price: string;

    @Field()
    date: Date;

    @Field()
    origin: string;

    @Field()
    destination: string;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;

    @Field()
    user: string;

    @Field()
    cancelled: boolean;
}
