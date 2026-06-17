import SidebarNotes from "./@sidebar/Sidebar";
import styles from "./layout.module.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>

      <main className={styles.notesWrapper}>
        {children}
      </main>
    </section>
  );
}