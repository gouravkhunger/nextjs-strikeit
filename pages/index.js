import Head from "next/head";
import { useRef } from "react";

export default function Home() {
  const previewRef = useRef(null);
  const descRef = useRef(null);

  function strike(text) {
    return text
      .split("")
      .map((char) => char + "\u0336")
      .join("");
  }

  const input = (event) => {
    const value = event.target.value;
    if (value === "") {
      descRef.current.innerText =
        "Striked text will automatically be copied to clipboard.";
    } else {
      descRef.current.innerHTML = `<className="text-[#0070f3]">Text Copied!</className=>`;
    }
    previewRef.current.innerText = strike(value);
    navigator.clipboard.writeText(previewRef.current.innerHTML);
  };

  return (
    <div className="min-h-screen py-2 flex flex-col items-center justify-center">
      <Head>
        <title>Strike it!</title>
        <meta
          name="description"
          content="Generate strike through text easily!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="py-6 flex-col items-center justify-center">
          <h1 className="text-2xl text-center">
            Enter Text to{" "}
            <span className="text-[#0070f3]">
              <strike>strike</strike>
            </span>
            !
          </h1>
          <p className="w-full text-center" ref={descRef}>
            Striked text will automatically be copied to clipboard.
          </p>
          <input
            name="go"
            className="w-full max-w-[70vw] min-w-[400px] p-5 rounded-[32px] shadow-md border-2 focus:outline-none focus:border-[#0070f3] border-transparent"
            placeholder="Enter text here"
            type="text"
            onChange={input}
          />
          <p
            className="w-full max-w-[70vw] text-center overflow-ellipsis overflow-hidden whitespace-nowrap p-1"
            ref={previewRef}
          ></p>
          <p className="w-full text-center mt-5">
            Crafted by{" "}
            <a
              className="text-[#0070f3]"
              href="https://github.com/gouravkhunger"
              target="_blank"
              rel="noreferrer"
            >
              Gourav
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
