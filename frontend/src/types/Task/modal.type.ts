export interface DeleteModalProps {
  remove: (id: string) => void;
  id: string;
}

export interface EditCardModalProps {
  id: string;
  title: string;
  description: string;
  status: string;
}
