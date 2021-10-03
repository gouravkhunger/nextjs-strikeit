import Head from "next/head";
import { useRef } from "react";
import styles from "../styles/Home.module.css";

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
    descRef.current.innerText =
      "Striked text will automatically be copied to clipboard.";
    if (value === "") {
      previewRef.current.innerText = "";
    } else {
      previewRef.current.innerText = strike(value);
    }
  };

	const setCaretPositionToEnd = (e) => e.target.setSelectionRange(e.target.value.length, e.target.value.length);

  let timeout = null;
  let cotime = null;
  function copyText() {
    const value = previewRef.current.innerHTML;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if(value) navigator.clipboard.writeText(previewRef.current.innerHTML);
    }, 1000);
    clearTimeout(cotime);
    cotime = setTimeout(function () {
      if(value) descRef.current.innerHTML = `<span class=${styles.span}>Text Copied!</span>`;
    }, 1000);
  }

  return (
    <div className={styles.container}>
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
        <div className={styles.main}>
          <h1 className={styles.title}>
            Enter Text to{" "}
            <span className={styles.span}>
              <strike>strike</strike>
            </span>
            !
          </h1>
          <p className={styles.desc} ref={descRef}>
            Striked text will automatically be copied to clipboard.
          </p>
          <input
            name="go"
            className={styles.input}
            placeholder="Enter text here"
            type="text"
            onChange={input}
            onKeyUp={copyText}
						onClick={setCaretPositionToEnd}
          />
          <p className={styles.preview} ref={previewRef}></p>
          <p className={styles.desc}>
            Crafted by{" "}
            <a
              className={styles.span}
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
