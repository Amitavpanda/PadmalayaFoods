import { PrismaClient, User } from "@repo/db/client";

import express, {Request, Response} from  "express";
import cors from "cors";
import dotenv from 'dotenv';
// import routes from "./routes";
dotenv.config();
import { info } from "@repo/logs/logs";
import routes from "./routes.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

console.log("cors enabled")

app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.json());

const prisma = new PrismaClient();
const port = parseInt(process.env.PORT || '4000');

const host = process.env.HOST || '0.0.0.0';



app.listen(port, host, async () => {
    info(`App is running at port: http://${host}:${port}`);
    await routes(app);
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });


export default app;