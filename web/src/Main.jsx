import React, {useRef, useState} from 'react'
import Link from './Link'
import './Main.css'

const Main = () => {

  const inputRef = useRef("")
  const [err, setErr] = useState("")
  const [url, setUrl] = useState("")

  const shortenLink = async e => {
    e.preventDefault()
    const link = inputRef.current.value
    if (!link) {
      setErr("You need to enter a link")
    }

    fetch('http://localhost:3001/api/shorten', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: link })
    }).then(res => res.json()).then(data => {
      setUrl(data.shortenedUrl)
    }).catch(e => setErr(e.message))
  }

  return (
    <main className="main-container">
      <form className="form" action="">
      {err && <p>{err} </p>}
      <input ref={inputRef} onChange={() => {setErr("")}} className="form-input" type="text" placeholder="Long url..."/>
      {url && <Link url={url} />}
      <input className="form-button" type="submit" value="Shorten It!" onClick={shortenLink} />
    </form>
    </main>
  )
}

export default Main