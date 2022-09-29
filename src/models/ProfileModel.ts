import mongoose from 'mongoose'
import { ObjectType, Field } from "type-graphql"


// create user type for gql
@ObjectType()
export class Profile{
    // fields to be returned to gql/client 

    @Field()
    firstName: string;

    // dont return password and confirmed to gql/client
    @Field()
    lastName: string;

    @Field()
    dateOfBirth: Date;

    @Field()
    email: string;

    @Field()
    phoneNumber: string;

    @Field()
    gender: string
}

// create user schema
const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "PREFER NOT TO SAY"]
    }
}   
)

// create user model
const ProfileModel = mongoose.model('Profile', ProfileSchema)

export default ProfileModel