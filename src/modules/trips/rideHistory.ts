import RideHistoryModel from "../../models/RideHistoryModel";
import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import isAuthorized from "../../middleware/auth";
import { Rides } from "../../types/gqlTypes";

@Resolver()
export class RideHistoryResolver {

  @UseMiddleware(isAuthorized)
  @Query(() => [Rides])
  async getRideHistory(
    @Arg("user") user: string,
  ): Promise<[Rides]> {

    // get ride history from db based on user id
    const history = await RideHistoryModel.find({ user }) as [Rides];

    return history;
  }

  @UseMiddleware(isAuthorized)
  @Mutation(() => Rides, {nullable: true}) 
  async history(
    @Arg("description") description: string,
    @Arg("lat") lat: string,
    @Arg("lng") lng: string,
    @Arg("user") user: string,
  ): Promise<Rides | null> {

    // check if description is unique
    const isUnique = await RideHistoryModel.findOne({ description });

    if (isUnique) {
      return null
    }

    const history = await RideHistoryModel.create({
        description,
        lat,
        lng,
        user
    })

    return history;
  }
}
