import { MyContext } from "src/types/myContext";
import { MiddlewareFn } from "type-graphql";

export const isAuthorized: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error("Not authenticated");
    }
    return next();
  };