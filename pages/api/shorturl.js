import { ShorlinksModel } from "../../database"

export default async function handler(req, res) {
  let method = req.method

  switch (method) {
    case "GET": {
      const links = await ShorlinksModel.findAll()
      return res.status(200).send({ links })
    }
    case "POST": {
      const { url } = req.body
      const shorturl = Math.random().toString(36).substring(2, 10)

      try {
        const [link] = await ShorlinksModel.findCreateFind({
          attributes: ["url", "shorturl"],
          where: {
            url
          },
          defaults: {
            shorturl
          }
        })

        return res.status(200).json(link)
      } catch (error) {
        console.log(error)
        return res.status(500).json(error)
      }
    }
  }
}
