import type IShortenResponse from "@apptypes/IShortenResponse";
import { prisma } from "@lib/prisma";
import validationSchema from "@schemas/shortenRequestSchema";
import cryptoRandomString from "crypto-random-string";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IShortenResponse>
) => {
  const body = validationSchema.safeParse(req.body);
  if (!body.success) {
    return res.status(400).json({
      error: "bad request",
      message: body.error.issues[0].message,
    });
  }

  let slug = (await prisma.uRL.findFirst({ where: { url: body.data.url } }))
    ?.slug;
  if (slug === undefined) {
    slug = cryptoRandomString({ length: 6, type: "distinguishable" });
    await prisma.uRL
      .create({
        data: {
          url: body.data.url,
          slug: slug,
        },
      })
      .catch((e) => {
        console.error(e);
        return res.status(500).json({
          error: "internal server error",
          message: "could not create shortened url",
        });
      });
  }
  res.status(201).json({ message: "url shortened successfully", slug: slug });
};

export default handler;
