import styles from "./style.module.scss";
import { Add, Burger, Dropdown } from "../../../ui/icon";

export default function Header({ onSelectFile }) {
  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.username}>
          <p className={styles.text}>username</p>
          <Dropdown />
        </div>
        <div className={styles.add}>
          <input
            id="selectHeader"
            className={styles.input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onSelectFile}
          />
          <label htmlFor={"selectHeader"} className={styles.label}>
            <Add className={styles.icon} />
          </label>
          <Burger className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
