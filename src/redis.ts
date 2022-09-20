import session = require('express-session');
import Redis from 'ioredis';
import connectRedis = require("connect-redis");
import * as dotenv from "dotenv";

dotenv.config();


// fix the error userId is not a property of session
declare module 'express-session' {
    export interface SessionData {
      userId:  any | null;
    }
  }

export const redis = new Redis();

 // create and store session in redis
const RedisStore = connectRedis(session)

export const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: "qid",
    secret: process.env.SESSION_SECRET || "",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  

