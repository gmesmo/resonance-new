import { ReactNode, createContext, useState, useContext } from "react";

interface ChapterContextProps {
  children: ReactNode;
}

interface ChapterContextValue {
  currentChapter: string;
  setCurrentChapter: (chapter: string) => void;
}

const ChapterContext = createContext<ChapterContextValue | undefined>(
  undefined
);

export const ChapterProvider: React.FC<ChapterContextProps> = ({
  children,
}) => {
  const [currentChapter, setCurrentChapter] = useState("0");

  return (
    <ChapterContext.Provider value={{ currentChapter, setCurrentChapter }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapterContext = () => {
  const context = useContext(ChapterContext);

  if (!context) {
    throw new Error("useChapterContext must be used within a ChapterProvider");
  }

  return context;
};
