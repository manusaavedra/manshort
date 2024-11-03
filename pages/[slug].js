
import { ShorlinksModel } from "../database"

export default function ShortIdPage() {
    return (
        <h1>redirect...</h1>
    )
}

export async function getServerSideProps({ params }) {
    const { slug } = params

    if (!slug) {
        return { redirect: { destination: '/' } }
    }

    const data = await ShorlinksModel.findOne({
        where: {
            shorturl: slug
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
