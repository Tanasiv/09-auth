import Link from "next/link";
import styles from "./Sidebar.module.css";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={styles.menuList}>
      <li className={styles.menuItem}>
        <Link className={styles.menuLink} href="/notes/filter/all">
          All notes
        </Link>
      </li>

      {tags.map((tag) => (
        <li key={tag} className={styles.menuItem}>
          <Link
            className={styles.menuLink}
            href={`/notes/filter/${tag}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}