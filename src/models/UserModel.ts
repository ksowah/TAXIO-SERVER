import mongoose from 'mongoose'
import { ObjectType, Field, ID } from "type-graphql"


// create user type for gql
@ObjectType()
export class Person {
    // fields to be returned to gql/client 

    @Field()
    email: string;

    // dont return password and confirmed to gql/client
    password: string;

    verificationCode: string;

    confirmed: boolean;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;
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

// create user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String,
        default: ""
    }
}   
)

// create user model
const User = mongoose.model('User', UserSchema)

export default User