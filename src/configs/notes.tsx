/* eslint-disable prettier/prettier */
import type { NotesData } from "~/types";
import { BsFolder2 } from "react-icons/bs";
import { usePortfolioData } from "~/hooks/usePortfolioData";

function Emoji(props: any) {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );
}

// Convert JSON data to JSX elements
const convertNotesData = (notesData: any[]): NotesData[] => {
  if (!notesData) return [];
  
  return notesData.map((note) => ({
    ...note,
    icon: <BsFolder2 />,
    md: note.md.map((md: any) => ({
      ...md,
      icon: (
        <Emoji
          label={md.icon.match(/label='(.+?)'/)[1]}
          symbol={md.icon.match(/symbol='(.+?)'/)[1]}
        />
      )
    }))
  }));
};

// Create a hook to get the notes data
export const useNotes = () => {
  const { data, loading, error } = usePortfolioData();
  return {
    notes: data ? convertNotesData(data.notes) : [],
    loading,
    error
  };
};

// Add default export
export default useNotes;
