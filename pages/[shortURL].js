
import { ShorlinksModel } from "../database"

export default function ShortIdPage() {
    return (
        <h1>redirect...</h1>
    )
}

export async function getServerSideProps({ params }) {
    const { shorturl } = params

    const data = await ShorlinksModel.findOne({
        where: {
            shorturl
        }
    })

    const shortlink = data.dataValues

    if (!shortlink)
        return { redirect: { destination: '/' } }

    return {
        redirect: { destination: shortlink.url }
    }
}



