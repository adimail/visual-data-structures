import { listToArray } from "./algorithms";
import Node from "./Node";
import StackStyles from "./stack.module.css";
import QueueStyles from "./queue.module.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  head: SLHead;
};

const ListADTStack: React.FC<Props> = ({ head }) => {
  return (
    <motion.div className={StackStyles.stack}>
      <AnimatePresence mode="popLayout" initial={false}>
        {head &&
          listToArray(head).map((node) => (
            <Node key={node.id} value={node.value} />
          ))}
        <Node />
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
        <Node />
      </AnimatePresence>
    </motion.div>
  );
};

export { ListADTStack, ListADTQueue };
