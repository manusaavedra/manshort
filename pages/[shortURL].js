
import { PrismaClient } from "@prisma/client"

export default function ShortIdPage() {
    return (
        <h1>redirect...</h1>
    )
}

export async function getServerSideProps({params}) {

    const prisma = new PrismaClient()
    const {shortURL} = params

    const data = await prisma.url.findUnique({
        where: {
            shortURL: shortURL
        }
    })

    if (!data)
        return { redirect: {destination: '/'}}

    return {
        redirect: { destination: data.url}
    }
}



