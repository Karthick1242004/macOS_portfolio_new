export interface NotesMdData {
  id: string;
  title: string;
  file: string;
  icon: JSX.Element;
  excerpt: string;
  link?: string;
}

export interface NotesData {
  id: string;
  title: string;
  icon: JSX.Element;
  md: NotesMdData[];
}
