import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url =
      "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=100";
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
