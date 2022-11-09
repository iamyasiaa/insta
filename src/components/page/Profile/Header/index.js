import styles from "./style.module.scss";
import { Add, Burger, Dropdown } from "../../../ui/icon";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.username}>
          <p className={styles.text}>username</p>
          <Dropdown />
        </div>
        <div className={styles.add}>
          <Add className={styles.icon} />
          <Burger className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
