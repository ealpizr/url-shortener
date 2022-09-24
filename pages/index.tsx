import styles from "@styles/index.module.scss";
import { AiFillGithub } from "react-icons/ai";
import { FaCut } from "react-icons/fa";

const Home = () => {
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
        <input
          className={styles.input}
          type="text"
          placeholder="Paste your long url here"
        />
        <button className={styles.button}>
          <FaCut />
          Shorten it
        </button>
      </section>
    </div>
  );
};

export default Home;
