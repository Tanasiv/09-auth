import styles from "./Modal.module.css";

type ModalProps = {
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {children}

        {onClose && (
          <button onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
}