import express from "express";
import cors from "cors";
import routes from "./routes";


const expressApp = express();

expressApp.use(express.json());
expressApp.use(cors());
expressApp.use(routes);

expressApp.listen(process.env.PORT, () => console.log(`Up & Running on port ${process.env.PORT}`));
