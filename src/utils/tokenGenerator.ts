import jwt = require("jsonwebtoken");

export const generateToken = (id: String) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || "", {
        expiresIn: "5d"
    })

    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || "", {
        expiresIn: "1y"
    })

    return {accessToken, refreshToken}
}