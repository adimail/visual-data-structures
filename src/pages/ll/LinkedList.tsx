import { listToArray } from "./algorithms";
import Node from "./Node";
import Styles from "./LinkedList.module.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  head: SLHead;
};

export default function LinkedList({ head }: Props) {
  return (
    <motion.div className={Styles.linkedList}>
      <AnimatePresence mode="popLayout" initial={false}>
        {head &&
          listToArray(head).map((node) => (
            <Node key={node.id} value={node.value} />
          ))}
        <Node />
      </AnimatePresence>
    </motion.div>
  );
}
