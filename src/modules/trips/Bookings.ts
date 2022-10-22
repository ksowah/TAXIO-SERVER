import { Resolver, Mutation, Arg, UseMiddleware, Query } from "type-graphql";
import isAuthorized from "../../middleware/auth";
import { Bookings } from "../../types/gqlTypes";
import { BookingsInput } from "./inputs/bookingsInputs";
import BookingsModel from "../../models/BookingsModel";

@Resolver()
export class BookingsResolver {

  @UseMiddleware(isAuthorized)
  @Query(() => [Bookings])
  async getBookings(
    @Arg("user") user: string,
  ): Promise<[Bookings]> {


    const getBookings = await BookingsModel.find({user}) as [Bookings];

    return getBookings;
  }

  @UseMiddleware(isAuthorized)
  @Mutation(() => Bookings, {nullable: true}) // return type
  async bookings(
    @Arg("data") {
        distance,
        time,
        price,
        date,
        origin,
        destination,
        user
    }: BookingsInput,
   
  ): Promise<Bookings | null> {

    const addToBookings = await BookingsModel.create({
        distance,
        time,
        price,
        date,
        origin,
        destination,
        user
    })

    return addToBookings;
  }

  // create mutation to cancel bookings
  @UseMiddleware(isAuthorized)
  @Mutation(() => Bookings, {nullable: true}) // return type
  async cancelBookings(
    @Arg("id") id: string,
  ): Promise<Bookings | null> {
      
      const cancelBooking = await BookingsModel.findByIdAndUpdate(id, {cancelled: true}, {new: true}) as Bookings;
  
      return cancelBooking;
    }
}
