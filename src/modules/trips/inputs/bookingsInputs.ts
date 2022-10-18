import { Field, InputType } from "type-graphql";


@InputType()
export class BookingsInput {

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

    @Field()
    user: string;

}
