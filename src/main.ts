// @deno-types="npm:@types/express"
import express, { Request, Response,  } from "npm:express";
const app = express();
app.use(express.json());

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const { PORT } = config();

import signJwt from "./utils/jwtSigner.ts";
import verifyJwt from "./utils/jwtVerifier.ts";

app.post("/sign", async (req: Request, res: Response) => {
  const username = req.body("username");
  console.log(req.header);
  const signedJwt = await signJwt(username);
  res.status(200).json({
    jwt: signedJwt,
  });
});

app.get("/verify", (req: Request, res: Response) => {
  const token = req.header("token") as string;
  verifyJwt(token);
  res.status(200).json({
    message: "verified",
  });
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({
    hello: "hello",
  });
});

app.listen(PORT, () => console.log("Listening on port " + PORT));
