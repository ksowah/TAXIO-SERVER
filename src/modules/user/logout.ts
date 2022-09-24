import { MyContext } from "../../types/myContext";
import { Resolver, Mutation, Ctx } from "type-graphql";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: MyContext): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }
        ctx.res.clearCookie("qid", {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
        });
        return resolve(true);
      });
    });
  }
}
