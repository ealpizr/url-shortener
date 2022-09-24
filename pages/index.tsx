import InvalidRequestError from "@apptypes/InvalidRequestError";
import MessageModal from "@components/MessageModal";
import validationSchema from "@schemas/shortenRequestSchema";
import styles from "@styles/index.module.scss";
import { ChangeEvent, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaCut } from "react-icons/fa";

const Home = () => {
  const [url, setUrl] = useState("");
  const [isBusy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) setError("");
    if (success) setSuccess("");

    setUrl(e.target.value);
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
          href="https://github.com/ealpizr/url-shortener-2"
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
            <a href={success}>{success}</a>
          </MessageModal>
        )}
      </section>
    </div>
  );
};

export default Home;
