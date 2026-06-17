
import styles from "./Header.module.css";
import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.headerLink} href="/">
        NoteHub
      </Link>

      <nav>
        <ul className={styles.navigation}>
          <li className={styles.navigationItem}>
            <Link className={styles.navigationLink} href="/notes">
              Notes
            </Link>
          </li>

          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}