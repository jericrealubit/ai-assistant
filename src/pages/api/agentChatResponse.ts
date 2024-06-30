// pages/api/tavilyResponse.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  error?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { question, chat_history } = req.body;

    const data = JSON.stringify({
      chat_history: [],
      Agent: "FinancePlanner",
      question: "name of company in report",
      topic:
        "https://s201.q4cdn.com/287523651/files/doc_financials/2023/ar/cost-annual-report-final-pdf-from-dfin.pdf",
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.BASE_URL}`,
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`, //use the .env.local file to put the bearer token in here. Then once its deployed in the static web app it should be on the configuration section
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      res.status(200).json({ data: response.data });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while making the API call." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
