import { Resolver, Query } from "type-graphql"

@Resolver()
class HelloResolver {

  @Query(() => String)
  async hello() {
    return "Hello world!"
  }
}

export default HelloResolver