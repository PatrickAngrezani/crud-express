import express from "express";
import cors from "cors";
import {router} from "./routes/userRoutes"
import { authRouter } from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use("/api/auth", authRouter);

export default app;