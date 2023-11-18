import chapters from "./chapters.json";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import {
  Fab,
  Fade,
  Card,
  Chip,
  Pagination,
  TextareaAutosize,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect, ChangeEvent } from "react";
import { OptionHandler } from "./options/Options";
import { scrollToTop } from "../theme/ThemeHandler";
import { cookiesCheck, lastRead } from "../localStorage/LocalStorageHandler";
import { useChapterContext } from "./context/context";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ViewHeadlineRoundedIcon from "@mui/icons-material/ViewHeadlineRounded";

type MenuHandlerType = () => void;

type Habits = {
  choiceID: number;
  options: Options;
};

type Options = {
  id: number;
  text: string;
  reaction?: string;
  default?: boolean;
};

interface Pages {
  number: number;
  text: string;
  options?: {
    id: number;
    text: string;
    reaction: string;
    default?: boolean;
  }[];
  habits?: {
    choiceID: number;
    options: {
      id: number;
      text: string;
      default?: boolean;
    }[];
  };
  continue?: string;
}

type Chapter = {
  chapterNumber: number;
  title: string;
  releaseDate: string;
  pages: Pages[];
};

const defaultChapter: Chapter[] = [
  {
    chapterNumber: 0,
    title: "",
    releaseDate: "2023-11-19",
    pages: [
      {
        number: 1,
        text: "",
      },
    ],
  },
];

function ChapterSelector({ menuHandler }: { menuHandler: MenuHandlerType }) {
  const { currentChapter } = useChapterContext();

  return (
    <div className="flex flex-col w-full my-10">
      <Stack spacing={1} className="w-full">
        <Link to={`/`} className="block w-full">
          <Button
            key={0}
            variant="outlined"
            className="text-white w-full bg-accent hover:border-accent bg-opacity-100 rounded-xl border-accent"
          >
            Capa
          </Button>
        </Link>
        {chapters.map((chapter, i) => {
          return (
            <Link
              key={`link_${i}`}
              to={`/chapter/${chapter.chapterNumber}/page/1`}
              className="w-full"
              onClick={() => menuHandler()}
            >
              <Button
                key={i}
                variant="outlined"
                className={`text-white w-full bg-accent border-accent hover:border-accent bg-opacity-100 rounded-xl ${
                  isNewChapter(new Date(chapter.releaseDate)) &&
                  `border-r-4 hover:border-r-4 border-r-orange-500 hover:border-r-orange-500`
                }
                ${
                  currentChapter === chapter.chapterNumber.toString() &&
                  `font-bold`
                }  `}
              >
                {chapter.title}
              </Button>
            </Link>
          );
        })}
      </Stack>
    </div>
  );
}

function ChapterDisplay() {
  const { chapterId, pageId } = useParams();

  const itemsPerPage = 1;

  const chapter = chapters.find(
    (chapter) => chapter.chapterNumber.toString() === chapterId
  );

  const currentPage = pageId ? Number(pageId) : 1; // Convert to a number

  const [pageNumber, setPageNumber] = useState(currentPage);
  const { currentChapter, setCurrentChapter } = useChapterContext();

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value); // Convert to a string for the URL
  };

  const cookiesEnabled = cookiesCheck();

  //Setas direcionais para mudar de página
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (chapter?.pages) {
        if (event.key === "ArrowLeft") {
          // Tecla de seta para a esquerda, vá para a página anterior
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        } else if (event.key === "ArrowRight") {
          // Tecla de seta para a direita, vá para a próxima página
          if (pageNumber < chapter.pages.length) {
            setPageNumber(pageNumber + 1);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Remova o event listener quando o componente for desmontado
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pageNumber, chapter]);

  // Handler para definir primeira página
  useEffect(() => {
    if (Number(pageId) == 1) {
      setPageNumber(1);
    }
    setCurrentChapter(chapterId! || "0");
  }, [chapterId]);

  function NextChapter(next: number) {
    console.log(next);
    setCurrentChapter(`${next}`);
    setPageNumber(1);
  }

  //Handler para salvar último capítulo e página lidos
  useEffect(() => {
    if (cookiesEnabled) {
      if (chapter?.chapterNumber && pageNumber) {
        lastRead(chapter.chapterNumber.toString(), pageNumber.toString());
      }
    }
  }, [currentChapter, pageNumber, currentPage]);

  useEffect(() => {
    () => scrollToTop();
  }, [currentChapter, currentPage]);

  return (
    <Card className="relative bg-bg w-11/12 md:w-3/4 h-5/6 mx-auto self-center rounded-lg">
      {/* Título */}
      <h1
        className={`text-accent text-xl md:text-3xl text-center m-4 font-bold`}
      >
        {chapter &&
          (!chapter.extra
            ? `Capítulo ${
                chapter && `${chapter.chapterNumber} - ${chapter.title}`
              }`
            : `${chapter.title}`)}
      </h1>
      {/* Divisor + Data de lançamento */}
      <DividerDisplay date={new Date(chapter!.releaseDate!)} />
      {/* Paginas */}
      <div className="overflow-y-auto m-4 h-5/6 p-3 pb-24 md:pb-20">
        {chapter?.pages?.map((page) => {
          if (page.number === pageNumber) {
            return (
              <div
                key={page.number}
                className="text-content text-justify indent-10 text-lg font-weight"
              >
                <OptionHandler page={page} chapter={chapterId ?? null} />
              </div>
            );
          }
          return null;
        })}
      </div>
      {/* Botões paginação */}
      <div className="w-full flex justify-end absolute bottom-0 bg-bg py-2">
        {chapter && chapter.pages && chapter.pages.length > 1 && (
          <Pagination
            count={Math.ceil(chapter.pages.length / itemsPerPage)}
            page={pageNumber}
            siblingCount={1}
            boundaryCount={1}
            onChange={handleChange}
            className="mr-3"
            sx={{ color: "white" }}
            variant="outlined"
          />
        )}
        {/* Botão próximo cap */}
        {chapter &&
          chapter.chapterNumber > -1 &&
          chapter.chapterNumber < chapters.length - 1 &&
          pageNumber > chapter.pages!.length - 1 && (
            <Stack>
              <Link
                to={`/chapter/${chapter.chapterNumber + 1}`}
                onClick={() => NextChapter(chapter.chapterNumber + 1)}
              >
                <Button
                  variant="outlined"
                  className="bg-accent border-accent hover:border-accent text-white hover:text-accent rounded-lg mr-3"
                >
                  Próximo Capítulo
                </Button>
              </Link>
            </Stack>
          )}
      </div>
    </Card>
  );
}

function ChapterCreator() {
  const [newChapter, setNewChapter] = useState<Chapter[]>(() => [
    ...defaultChapter,
  ]);

  const [isViewMode, setIsViewMode] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Chapter
  ) => {
    setNewChapter((prev) => [
      {
        ...prev[0],
        [field]: e.target.value,
      },
    ]);
  };

  const handlePageChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    field: keyof Chapter | keyof Pages
  ) => {
    setNewChapter((prev) => {
      const updatedChapter: Chapter[] = prev.map((chapter) => ({ ...chapter }));

      if (field === "pages") {
        const pages = prev[0].pages || [];
        updatedChapter[0].pages = pages.map((page) => ({ ...page }));
      } else if (field === "text" && updatedChapter[0].pages) {
        // Se estiver alterando o texto da página, encontrar a página atual
        const currentPage = updatedChapter[0].pages.find(
          (page) => page.number === 1
        );
        if (currentPage) {
          currentPage.text = e.target.value;
        }
      }

      return updatedChapter;
    });
  };

  // useEffect(() => {
  //   console.log(newChapter);
  // }, [newChapter]);

  return (
    <Card className="relative bg-bg w-11/12 md:w-3/4 h-5/6 mx-auto self-center rounded-lg">
      <Fab
        className={`absolute right-2 top-2`}
        onClick={() => setIsViewMode(!isViewMode)}
        color={"primary"}
      >
        <Fade in={!isViewMode} timeout={500}>
          <Tooltip title={`Editar`}>
            <EditNoteRoundedIcon />
          </Tooltip>
        </Fade>
        <Fade in={isViewMode} timeout={500} style={{ position: "absolute" }}>
          <Tooltip title={`Preview`}>
            <ViewHeadlineRoundedIcon />
          </Tooltip>
        </Fade>
      </Fab>
      <form>
        <h1
          className={`text-accent text-xl md:text-3xl text-center m-4 font-bold`}
        >
          Capítulo{" "}
          {isViewMode ? (
            <>
              {newChapter[0].chapterNumber} - {newChapter[0].title}
            </>
          ) : (
            <>
              <input
                className={`w-12 text-center bg-gray-700 rounded-lg`}
                value={newChapter[0].chapterNumber}
                onChange={(e) => handleChange(e, "chapterNumber")}
              />{" "}
              {` - `}
              <input
                className={`text-center bg-gray-700 rounded-lg`}
                placeholder="Título do capítulo"
                value={newChapter[0].title}
                onChange={(e) => handleChange(e, "title")}
              />
            </>
          )}
        </h1>
        {isViewMode ? (
          <DividerDisplay date={new Date(newChapter[0].releaseDate)} />
        ) : (
          <>
            <DividerEditor
              field="releaseDate"
              value={newChapter[0].releaseDate}
              onChange={(e) => handleChange(e, "releaseDate")}
            />
          </>
        )}
        <div className="overflow-y-auto m-4 h-5/6 p-3 pb-24 md:pb-20">
          {newChapter[0].pages?.map((page) => (
            <div
              key={page.number}
              className="text-content text-justify text-lg font-weight "
            >
              {isViewMode ? (
                <>
                  <OptionHandler
                    page={page}
                    chapter={newChapter[0].chapterNumber.toString() ?? null}
                  />
                </>
              ) : (
                <TextareaAutosize
                  value={page.text.replace(/\\n/g, "\n")}
                  className={`p-2 bg-gray-700 w-full overflow-hidden m-0 focus-visible:outline-0 h-auto`}
                  onChange={(e) => handlePageChange(e, "text")}
                />
              )}
            </div>
          ))}
        </div>
      </form>
    </Card>
  );
}

function isNewChapter(date: Date) {
  const currentDate = new Date();
  const sevendays = new Date(currentDate);
  sevendays.setDate(currentDate.getDate() - 7);

  if (date >= sevendays) {
    return true;
  } else {
    return false;
  }
}

function DividerDisplay({ date }: { date: Date }) {
  if (isNewChapter(date)) {
    return (
      <Divider
        variant="middle"
        className={`before:bg-orange-500 after:bg-orange-500`}
      >
        <Tooltip title="Novo capítulo" arrow={true}>
          <Chip
            className={`border-orange-500 text-orange-500 border-2 border-solid 
            font-bold`}
            label={formatCustomDate(date)}
          />
        </Tooltip>
      </Divider>
    );
  } else {
    return (
      <Divider variant="middle" className={`before:bg-accent after:bg-accent`}>
        <Chip
          className={`border-accent text-accent border-2 border-solid 
            font-bold`}
          label={formatCustomDate(date)}
        />
      </Divider>
    );
  }
}

interface DividerEditorProps {
  field: keyof Chapter;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, field: keyof Chapter) => void;
}

const DividerEditor: React.FC<DividerEditorProps> = ({
  field,
  value,
  onChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event, field);
  };

  return (
    <Divider
      variant="middle"
      className={`before:bg-orange-500 after:bg-orange-500`}
    >
      <input
        type="date"
        className="bg-gray-700 p-1 text-center rounded-lg text-orange-500"
        value={value}
        onChange={handleInputChange}
      />
    </Divider>
  );
};

function formatCustomDate(date: Date): string {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Adicione 1 porque os meses começam em 0
  const year = date.getUTCFullYear();

  return `${day < 10 ? "0" : ""}${day}/${
    month < 10 ? "0" : ""
  }${month}/${year}`;
}

export { ChapterSelector, ChapterDisplay, ChapterCreator };
