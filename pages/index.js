import Head from 'next/head'
import { useRef, useState } from 'react'

export default function Home() {
  const [link, setLink] = useState(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()

  let redirectURL = `${process.env.NEXT_PUBLIC_HOST}/${link}`

  const handleShortUrl = async (e) => {

    e.preventDefault()

    const form = Object.fromEntries(new FormData(e.target))

    setLoading(true)

    const res = await fetch('/api/shorturl', {
      method: 'POST',
      body: JSON.stringify({ ...form }),
      headers: {
        "Content-type": "application/json"
      }
    })

    setLoading(false)

    const data = await res.json()
    setLink(data.shorturl)
  }

  return (
    <div>
      <Head>
        <title>ShortUrl</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleShortUrl}>
          <div className="form-control">
            <label htmlFor="">Page your URL</label>
            <input autoFocus={true} ref={inputRef} type="text" name="url" placeholder="Pega una URL" />
          </div>
          <div className="form-control">
            <button className="primary" type="submit">
              Acortar Url {loading ? <ActivityIndicator /> : null}
            </button>
          </div>
          {
            link &&
            <div className="card">
              <a href={redirectURL}>
                {redirectURL}
              </a>
              <ButtonClipboard content={redirectURL} />
            </div>
          }
        </form>
      </main>
      <footer>
        💻 Hecho por <a href="https://github.com/manusaavedra">Manuel Saavedra ✌</a>
      </footer>
    </div >
  )
}

function ActivityIndicator() {
  return (
    <div className="activityIndicator"></div>
  )
}

function ButtonClipboard({ content }) {

  const [copy, setCopy] = useState(false)

  const handleClipboard = (e) => {

    e.preventDefault()

    navigator.clipboard.writeText(content)
      .then(() => {
        setCopy(true)
      })
      .catch(err => {
        setCopy(false)
      })
  }

  return (
    <button className={`small ${copy ? 'primary' : undefined}`} onClick={handleClipboard} >
      {copy ? 'Copied!' : 'Copy'}
    </button>
  )
}
