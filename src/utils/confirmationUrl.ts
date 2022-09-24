import { confirmationPrefix } from "../constatnts/prefixes";
import { v4 } from "uuid"
import { redis } from "../redis"

export const createConfirmationUrl = async (userId: string) => {
    const token = v4()

    // store userId with the token as a key in redis and set the expiration time to 1 day
    await redis.set(confirmationPrefix + token, userId, "EX", 60 * 60 * 24) // 1 day expiration

    return `http://localhost:3000/user/confirm/${token}`
}