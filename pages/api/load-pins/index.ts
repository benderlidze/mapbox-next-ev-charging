import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("req", req.body);

  // const apiKey = "Pf2pX3LeQgclbSAbkvRp927FRkYnVqMZEeYglPS4";
  const apiKey = "DEMO_KEY";
  const query = req.body.join("&");

  const url = `https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=200&fuel_type=ELEC&${query}`;

  console.log("url", url);

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
      format: "json",
    },
  });
  const json = await data.json();
  res.status(200).json({
    data: json,
    url,
  });
}
