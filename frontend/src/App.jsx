import { useState } from 'react'
import api from "./api/axios.api.js"
import { toast } from "react-toastify";

function App() {
  const [url, setUrl] = useState("")
  const [shorten, setShorten] = useState("")
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    try {
      const res = await api.post("/shorten", { originalUrl: url });
      if (!res) {
        toast.info(
          "Please Try after some time..."
        );
      }

      const shortID = res?.data?.data?.shortId
      setShorten(import.meta.env.VITE_API_URL + `/${shortID}`)
      console.log(res.data);
      console.log(shorten);
      toast.success("URl shorten successfully...")

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong..."
      );
    }
  }

  const handleCopy = () => {
    if (shorten.trim().length <= 0) {
      toast.info("Nothing to copy...")
    }
    setCopied(true)
    navigator.clipboard.writeText(shorten);
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <div className="w-full h-screen bg-gray-800 text-white flex flex-col items-center justify-center">

        <h1 className="text-8xl font-bold mb-10">
          URL Shortener
        </h1>

        <input
          type="text"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL here..."
          className="w-200 text-2xl px-8 py-5 mb-8 rounded-3xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-gray-500"
        />

        <button
          onClick={handleShorten}
          className="w-200 text-2xl px-8 py-5 bg-gray-600 hover:bg-gray-500 mb-8 rounded-3xl transition active:scale-95"
        >
          Shorten URL
        </button>

        <div className="text-2xl text-gray-400 mb-6">
          Your short URL will appear here
        </div>

        <div className="w-200 flex items-center justify-between gap-4 bg-gray-700 px-6 py-4 rounded-2xl">

          <input className="text-xl w-full text-green-400 "
            onChange={() => null}
            value={shorten} placeholder='shorten url will be displayed here....'
          />

          <button
            onClick={handleCopy}
            className={`px-5 py-2  hover:bg-gray-500 rounded-lg text-lg transition duration-200 active:scale-95 hover:shadow-lg ${copied ? "text-green-100 bg-gray-800" : "text-white bg-gray-600"}`}
          >
            {copied ? "copied" : "copy"}
          </button>

        </div>

      </div>

    </>
  )
}

export default App
