import express, { Request, Response } from "npm:express";
const app = express();

import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
const { PORT } = config();
console.log(PORT);

import signJwt from "./utils/jwtSigner.ts";
import verifyJwt from "./utils/jwtVerifier.ts";

app.get("/sign", async (req: express, res: Response) => {
  const name = req.headers["name"];
  console.log(req.headers);
  const signedJwt = await signJwt(name);
  res.status(200).json({
    jwt: signedJwt,
  });
});

app.get("/verify", (req: Request, res: Response) => {
  const token = req.headers["jwt"];
  res.send(verifyJwt(token));
});

app.get("/", (res: Response) => {
  res.status(200).json({
    hello: "hello",
  });
});

app.listen(PORT);
