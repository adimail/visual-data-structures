type SLNode = {
  id: string;
  value: number;
  next: SLNode | null;
};

type SLHead = SLNode | null;

type SLSetHead = React.Dispatch<React.SetStateAction<SLHead>>;
