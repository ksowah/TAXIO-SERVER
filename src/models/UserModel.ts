import mongoose from 'mongoose'
import { ObjectType, Field, ID } from "type-graphql"


// create user type for gql
@ObjectType()
export class Person {
    // fields to be returned to gql/client 
  @Field()
  firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    // dont return password and confirmed to gql/client
    password: string;

    confirmed: boolean;

    @Field(() => ID)
    _id: mongoose.Types.ObjectId;
}

// create user schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
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
    }
}   
)

// create user model
const User = mongoose.model('User', UserSchema)

export default User