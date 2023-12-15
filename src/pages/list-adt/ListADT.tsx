import { listToArray } from "./algorithms";
import StackStyles from "./stack.module.css";
import QueueStyles from "./queue.module.css";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Node.module.css";

type nodeProps = {
  value?: number | string;
};

type Props = {
  head: SLHead;
};

function Node({ value }: nodeProps) {
  return (
    <motion.div
      className={`${styles.node_container} px-3`}
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

const ListADTStack: React.FC<Props> = ({ head }) => {
  return (
    <motion.div className={StackStyles.stack}>
      <AnimatePresence mode="popLayout" initial={false}>
        {head &&
          listToArray(head).map((node) => (
            <Node key={node.id} value={node.value} />
          ))}
      </AnimatePresence>
    </motion.div>
  );
};

const ListADTQueue: React.FC<Props> = ({ head }) => {
  return (
    <motion.div className={QueueStyles.queue}>
      <AnimatePresence mode="popLayout" initial={false}>
        {head &&
          listToArray(head).map((node) => (
            <Node key={node.id} value={node.value} />
          ))}
      </AnimatePresence>
    </motion.div>
  );
};

export { ListADTStack, ListADTQueue };
