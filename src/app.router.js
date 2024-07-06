import cors from "cors";
import connectDB from "../DB/connection.js";

import authRouter from "../src/modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import categoryRouter from "./modules/category/category.router.js"

const initApp = (app, express) => {
  connectDB();
  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome To Mobile Store" });
  });

  app.use("/auth", authRouter);
  app.use("/user",userRouter);
  app.use("/category",categoryRouter);

 

}
export default initApp;
