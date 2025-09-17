import app from "./app";
import { AppDataSource } from "./database/data-source";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("err:", err);
  });
