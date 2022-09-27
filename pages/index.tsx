import InvalidRequestError from "@apptypes/InvalidRequestError";
import MessageModal from "@components/MessageModal";
import validationSchema from "@schemas/shortenRequestSchema";
import styles from "@styles/index.module.scss";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiFillGithub } from "react-icons/ai";
import { FaCut } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";

const Home = () => {
  const [url, setUrl] = useState("");
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    if (success) setSuccess("");

    setUrl(e.target.value);
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await shortenUrl();
    }
  };

  const shortenUrl = async () => {
    setBusy(true);
    try {
      const reqBody = validationSchema.safeParse({ url });
      if (!reqBody.success) {
        throw new InvalidRequestError(reqBody.error.issues[0].message);
      }
      const response = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify(reqBody.data),
      });
      const body = await response.json();
      setSuccess(`${process.env.NEXT_PUBLIC_URL}/${body.slug}`);
    } catch (e) {
      setBusy(false);
      if (e instanceof InvalidRequestError) {
        return setError(e.message);
      }
      setError("unknown error");
      console.error(e);
    }
    setBusy(false);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.header}>
        <h2 className={styles.title}>URL Shortener</h2>
        <a
          href="https://github.com/ealpizr/url-shortener"
          className={styles["github-link"]}
        >
          <AiFillGithub />
        </a>
      </nav>
      <section className={styles.main}>
        {error && (
          <MessageModal type="error">
            <p>{error}</p>
          </MessageModal>
        )}
        <div className={styles["main-container"]}>
          <input
            className={styles.input}
            type="text"
            placeholder="Paste your long url here"
            value={url}
            onChange={handleUrlChange}
            onKeyDown={handleKeyDown}
            disabled={isBusy}
          />
          <button
            className={styles.button}
            onClick={shortenUrl}
            disabled={isBusy}
          >
            <FaCut />
            Shorten it
          </button>
        </div>
        {success && (
          <MessageModal type="success">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <a href={success}>{success}</a>
              <CopyToClipboard text={success}>
                <button
                  onClick={() => {
                    setCopied(true);
                    window.setTimeout(() => {
                      setCopied(false);
                    }, 3000);
                  }}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.4rem",
                  }}
                >
                  {copied && (
                    <span
                      style={{
                        visibility: `${copied ? "visible" : "hidden"}`,
                        position: "absolute",
                        bottom: "125%",
                        backgroundColor: "#555",
                        fontSize: "1.4rem",
                        padding: "0.2rem 1rem",
                        borderRadius: "6px",
                      }}
                    >
                      Copied!
                    </span>
                  )}
                  <FiCopy />
                </button>
              </CopyToClipboard>
            </div>
          </MessageModal>
        )}
      </section>
    </div>
  );
};

export default Home;
