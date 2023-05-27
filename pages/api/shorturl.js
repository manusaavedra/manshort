
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

  let method = req.method

  switch (method) {
    case "GET": {

      const links = await prisma.shortLinks.findMany()
      res.status(200).send({ links })
      break;
    }
    case "POST": {

      let { url } = req.body
      let shortURL = Math.random().toString(36).substring(2, 8)

      try {

        const isExists = await prisma.shortLinks.findUnique({
          where: {
            url: url
          }
        })

        if (isExists) {

          const data = await prisma.shortLinks.update({
            where: {
              url: url
            },
            data: {
              url: url,
              shortURL: shortURL
            }
          })

          return res.status(200).send(data)
        }

        const data = await prisma.shortLinks.create({
          data: {
            url: url,
            shortURL: shortURL,
            fullShortUrl: `${process.env.NEXT_PUBLIC_HOST}/${shortURL}`
          }
        })

        return res.status(200).send(data)
      } catch (error) {
        return res.status(500).send(error)
      }
      break
    }
  }
}
