/* eslint-disable prettier/prettier */
import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useNotes } from "~/configs/notes";
import { useAppSelector } from "~/redux/hooks";
import type { NotesData, NotesMdData } from "~/types";
import { AiOutlineLink } from "react-icons/ai";

interface ContentProps {
  contentID: string;
  contentURL: string;
}

interface MiddlebarProps {
  items: NotesMdData[];
  cur: number;
  setContent: (id: string, url: string, index: number) => void;
}

interface SidebarProps {
  cur: number;
  notes: NotesData[];
  setMidBar: (items: NotesMdData[], index: number) => void;
}

interface NotesState extends ContentProps {
  curSidebar: number;
  curMidbar: number;
  midbarList: NotesMdData[];
}

const Highlighter = (dark: boolean): any => {
  interface codeProps {
    node: any;
    inline: boolean;
    className: string;
    children: any;
  }

  return {
    code({ node, inline, className, children, ...props }: codeProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={dark ? dracula : prism}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    }
  };
};

const Sidebar = ({ cur, notes, setMidBar }: SidebarProps) => {
  return (
    <div className="sidebar w-full h-full overflow-y-scroll">
      <div className="h-8 pl-3 flex flex-row items-center text-xs">iCloud</div>
      <ul>
        {notes.map((item, index) => (
          <li
            key={`notes-sidebar-${item.id}`}
            className={`mx-2 px-3 h-8 flex flex-row items-center justify-between cursor-default rounded-md ${
              cur === index ? "bg-blue-400" : "bg-transparent"
            }`}
            onClick={() => setMidBar(item.md, index)}
          >
            <div className="flex flex-row items-center">
              <div
                className={`flex flex-row items-center ${
                  cur === index ? "" : "text-blue-400"
                }`}
              >
                {item.icon}
              </div>

              <span className={`ml-2`}>{item.title}</span>
            </div>
            <div className={`flex flex-row items-center`}>{item.md.length}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Middlebar = ({ items, cur, setContent }: MiddlebarProps) => {
  return (
    <div className="midbar w-full h-full border-r c-border-300 overflow-y-scroll bg-gray-50 dark:bg-gray-800">
      <ul>
        {items.map((item: NotesMdData, index: number) => (
          <li
            key={`notes-midbar-${item.id}`}
            className={`mx-2 h-24 flex flex-col cursor-default rounded-md ${
              cur === index ? "bg-blue-400" : "bg-transparent"
            }`}
            onClick={() => setContent(item.id, item.file, index)}
          >
            <div className="h-8 mt-3 flex flex-row flex-none items-center text-black">
              <span className="ml-5 relative flex-grow font-bold">
                {item.title}
                {"  "}
                {item.icon}
                {item.link && (
                  <a
                    className="absolute top-1 right-4"
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineLink className="c-text-500" />
                  </a>
                )}
              </span>
            </div>
            <div
              className={`h-16 ml-5 pb-2 pr-1 ${
                cur === index ? "" : "border-b c-border-300"
              } text-xs text-black`}
            >
              {item.excerpt}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const getRepoURL = (url: string) => {
  return url.slice(0, -10) + "/";
};

const fixImageURL = (text: string, contentURL: string): string => {
  text = text.replace(/&nbsp;/g, "");
  if (contentURL.indexOf("raw.githubusercontent.com") !== -1) {
    const repoURL = getRepoURL(contentURL);

    const imgReg = /!\[(.*?)\]\((.*?)\)/;
    const imgRegGlobal = /!\[(.*?)\]\((.*?)\)/g;

    const imgList = text.match(imgRegGlobal);

    if (imgList) {
      for (const img of imgList) {
        const imgURL = (img.match(imgReg) as Array<string>)[2];
        if (imgURL.indexOf("http") !== -1) continue;
        const newImgURL = repoURL + imgURL;
        text = text.replace(imgURL, newImgURL);
      }
    }
  }
  return text;
};

const Content = ({ contentID, contentURL }: ContentProps) => {
  const [storeMd, setStoreMd] = useState<{ [key: string]: string }>({});
  const dark = useAppSelector((state) => state.system.dark);

  const fetchMarkdown = useCallback(
    (id: string, url: string) => {
      if (!storeMd[id]) {
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            storeMd[id] = fixImageURL(text, url);
            setStoreMd({ ...storeMd });
          })
          .catch((error) => console.error(error));
      }
    },
    [storeMd]
  );

  useEffect(() => {
    fetchMarkdown(contentID, contentURL);
  }, [contentID, contentURL, fetchMarkdown]);

  return (
    <div className="markdown w-full h-full c-text-700 bg-gray-50 dark:bg-gray-800 overflow-scroll py-6">
      <div className="w-2/3 px-2 mx-auto">
        <ReactMarkdown
          linkTarget="_blank"
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={Highlighter(dark as boolean)}
        >
          {storeMd[contentID]}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const Notes = () => {
  const { notes, loading, error } = useNotes();
  
  const [state, setState] = useState<NotesState>(() => ({
    curSidebar: 0,
    curMidbar: 0,
    midbarList: [],
    contentID: "",
    contentURL: ""
  }));

  // Only run this effect when notes array changes
  useEffect(() => {
    if (notes.length > 0 && !state.contentID) {  // Add condition to prevent unnecessary updates
      setState({
        curSidebar: 0,
        curMidbar: 0,
        midbarList: notes[0].md,
        contentID: notes[0].md[0].id,
        contentURL: notes[0].md[0].file
      });
    }
  }, [notes]); // Only depend on notes array

  const setMidBar = useCallback((items: NotesMdData[], index: number) => {
    setState({
      curSidebar: index,
      curMidbar: 0,
      midbarList: items,
      contentID: items[0].id,
      contentURL: items[0].file
    });
  }, []);

  const setContent = useCallback((id: string, url: string, index: number) => {
    setState(prevState => ({
      ...prevState,
      curMidbar: index,
      contentID: id,
      contentURL: url
    }));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full">Error: {error}</div>;
  }

  if (!notes.length) {
    return <div className="flex items-center justify-center h-full">No notes found</div>;
  }

  return (
    <div className="notes font-avenir flex w-full h-full">
      <div className="flex-none w-44">
        <Sidebar 
          cur={state.curSidebar} 
          notes={notes}
          setMidBar={setMidBar} 
        />
      </div>
      <div className="flex-none w-60">
        <Middlebar
          items={state.midbarList}
          cur={state.curMidbar}
          setContent={setContent}
        />
      </div>
      <div className="flex-grow">
        <Content contentID={state.contentID} contentURL={state.contentURL} />
      </div>
    </div>
  );
};

export default Notes;
