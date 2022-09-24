import styles from "@styles/message.module.scss";
import { BiErrorCircle } from "react-icons/bi";
import { BsCheckCircle } from "react-icons/bs";

interface Props {
  type: "error" | "success";
  children: JSX.Element;
}

const MessageModal = ({ type, children }: Props) => {
  return (
    <div className={`${styles.container} ${styles[type]}`}>
      {type === "error" ? (
        <BiErrorCircle className={styles.icon} />
      ) : (
        <BsCheckCircle className={styles.icon} />
      )}
      <div className={styles.message}>{children}</div>
    </div>
  );
};

export default MessageModal;
