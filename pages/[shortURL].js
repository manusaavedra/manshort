
import { ShorlinksModel } from "../database"

export default function ShortIdPage() {
    return (
        <h1>redirect...</h1>
    )
}

export async function getServerSideProps({ params }) {
    const { shorturl } = params

    if (!shorturl) {
        return { redirect: { destination: '/' } }
    }

    const data = await ShorlinksModel.findOne({
        where: {
            shorturl
        }
    })

    if (!data) {
        return { redirect: { destination: '/' } }
    }

    const shortlink = data.dataValues

    return {
        redirect: { destination: shortlink.url }
    }
}
