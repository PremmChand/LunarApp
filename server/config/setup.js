
import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import * as AdminJsMongoose from "@adminjs/mongoose";
import { COOKIE_PASSWORD, MONGO_URI } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";
import Category from "../models/category.js";

import session from "express-session";
import MongoStore from "connect-mongo";   // ✅ NEW PACKAGE

AdminJs.registerAdapter(AdminJsMongoose);

const DEFAULT_ADMIN = {
  email: "test@gmail.com",
  password: "123456789",
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const buildAdminJS = async (app) => {
  const admin = new AdminJs({
    resources: [
      { resource: Product },
      { resource: Category },
      { resource: Order },
      { resource: User },
      { resource: Transaction },
    ],
    branding: {
      companyName: "Kart",
      withMadeWithLove: false,
      favicon: "https://i.posting.cc/ZRCCXLgg/temp-Imagef-Coi-ZY.avif",
      logo: "https://i.posting.cc/ZRCCXLgg/temp-Imagef-Coi-ZY.avif",
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
  });

  // ✅ FIXED SESSION STORE
  const adminRouter = AdminJsExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: COOKIE_PASSWORD,
    },
    null,
    {
      secret: COOKIE_PASSWORD,
      resave: false,
      saveUninitialized: false,

      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        collectionName: "sessions",
      }),

      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};

export default buildAdminJS;



















// import AdminJs from "adminjs";
// import AdminJsExpress from "@adminjs/express";
// import Product from "../models/product.js";
// import Order from "../models/order.js";
// import User from "../models/user.js";
// import Transaction from "../models/transaction.js";
// import * as AdminJsMongoose from "@adminjs/mongoose";
// import { COOKIE_PASSWORD, MONGO_URI } from "./config.js";
// import { dark, light, noSidebar } from "@adminjs/themes";
// import Category from "../models/category.js";

// import session from "express-session";
// import connectMongoDBSession from "connect-mongodb-session";

// const MongoDBStore = connectMongoDBSession(session);

// const sessionStore = new MongoDBStore({
//   uri: MONGO_URI,
//   collection: "sessions",
// });

// AdminJs.registerAdapter(AdminJsMongoose);

// const DEFAULT_ADMIN = {
//   email: "premmchand131@gmail.com",
//   password: "123456789",
// };

// const authenticate = async (email, password) => {
//   if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
//     return Promise.resolve(DEFAULT_ADMIN);
//   }
//   return null;
// };

// const buildAdminJS = async (app) => {
//   const admin = new AdminJs({
//     resources: [
//       { resource: Product },
//       { resource: Category },
//       { resource: Order },
//       { resource: User },
//       { resource: Transaction },
//     ],
//     branding: {
//       companyName: "Kart",
//       withMadeWithLove: false,
//       favicon: "https://i.posting.cc/ZRCCXLgg/temp-Imagef-Coi-ZY.avif",
//       logo: "https://i.posting.cc/ZRCCXLgg/temp-Imagef-Coi-ZY.avif",
//     },
//     defaultTheme: dark.id,
//     availableThemes: [dark, light, noSidebar],
//     rootPath: "/admin",
//   });

//   const adminRouter = AdminJsExpress.buildAuthenticatedRouter(
//     admin,
//     {
//       authenticate,
//       cookieName: "adminjs",
//       cookiePassword: COOKIE_PASSWORD,
//     },
//     null,
//     {
//       store: sessionStore,
//       resave: true,
//       saveUninitialized: true,
//       secret: COOKIE_PASSWORD,
//       cookie: {
//         httpOnly: process.env.NODE_ENV === "production",
//         secure: process.env.NODE_ENV === "production",
//       },
//       name: "adminjs",
//     }
//   );

//   app.use(admin.options.rootPath, adminRouter);
// };

// export default buildAdminJS;


