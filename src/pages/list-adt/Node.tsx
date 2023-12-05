import { motion } from "framer-motion";
import styles from "./Node.module.css";

type Props = {
  value?: number | string;
};

export default function Node({ value }: Props) {
  return (
    <motion.div
      className={styles.node_container}
      layout
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
    >
      <p className={styles.node}>
        <span>{value}</span>
      </p>
    </motion.div>
  );
}
