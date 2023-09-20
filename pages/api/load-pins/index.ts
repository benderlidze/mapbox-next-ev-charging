import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req);

  const apiKey = "Pf2pX3LeQgclbSAbkvRp927FRkYnVqMZEeYglPS4";
  const data = await fetch(
    "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=100&",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
        format: "json",
      },
    }
  );
  const json = await data.json();
  res.status(200).json(json);
}
