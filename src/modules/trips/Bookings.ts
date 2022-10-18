import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import isAuthorized from "../../middleware/auth";
import { Bookings } from "../../types/gqlTypes";
import { BookingsInput } from "./inputs/bookingsInputs";
import BookingsModel from "../../models/BookingsModel";

@Resolver()
export class BookingsResolver {
  @UseMiddleware(isAuthorized)
  @Mutation(() => Bookings, {nullable: true}) // return type
  async bookings(
    @Arg("data") {
        distance,
        time,
        price,
        date,
        origin,
        destination
    }: BookingsInput,
   
  ): Promise<Bookings | null> {

//    add bookings to database and return the bookings
    const bookings = await BookingsModel.create({
        distance,
        time,
        price,
        date,
        origin,
        destination
    })

    return bookings;
  }
}
