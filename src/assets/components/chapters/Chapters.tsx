import chapters from "./chapters.json";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { ButtonGroup, Card, Chip, Pagination } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface TextFormatProps {
  text: string;
}

function ChapterSelector() {
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
            <Link to={`/chapter/${chapter.chapterNumber}`} className="w-full">
              <Button
                key={i}
                variant="outlined"
                className="text-white w-full bg-accent hover:border-accent bg-opacity-100 rounded-xl border-accent"
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

  const currentPage = pageId ? parseInt(pageId, 10) : 1; // Convert to a number

  const [pageNumber, setPageNumber] = useState(currentPage);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value); // Convert to a string for the URL
  };

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

  useEffect(() => {
    setPageNumber(1);
  }, [chapterId]);

  return (
    <Card className="relative bg-bg w-11/12 md:w-3/4 h-5/6 mx-auto self-center rounded-lg">
      <h1 className="text-accent text-xl md:text-3xl text-center m-4">
        {chapter ? chapter.title : "Capítulo não encontrado"}
      </h1>
      <Divider variant="middle" className="before:bg-accent after:bg-accent">
        <Chip
          className="text-accent border-accent border-2 border-solid"
          label={chapter && format(new Date(chapter.releaseDate), "dd/MM/yyyy")}
        />
      </Divider>

      <div className="overflow-y-auto m-4 h-5/6 p-3 pb-20">
        {chapter?.pages?.map((page) => {
          if (page.number === pageNumber) {
            // Compare as numbers
            return (
              <div
                key={page.number}
                className="text-content text-justify indent-10 text-lg"
              >
                {textFormat({ text: page.text })}

                <ButtonGroup className="w-full flex justify-center mt-3">
                  {page.options &&
                    page.options[1].map((option, index) => (
                      <Button
                        key={index}
                        className="option text-accent border-accent hover:border-accent hover:text-white hover:bg-accent rounded-lg"
                      >
                        {option.text}
                      </Button>
                    ))}
                </ButtonGroup>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="w-full flex justify-end absolute bottom-0 bg-bg pb-3">
        {chapter && chapter.pages && chapter.pages.length > 1 && (
          <Pagination
            count={Math.ceil(chapter.pages.length / itemsPerPage)}
            page={pageNumber}
            onChange={handleChange}
            className="mr-3"
            sx={{ color: "white" }}
          />
        )}

        {chapter &&
          chapter.chapterNumber > -1 &&
          chapter.chapterNumber < chapters.length - 1 &&
          pageNumber > chapter.pages.length - 1 && (
            <Stack>
              <Link to={`/chapter/${chapter.chapterNumber + 1}`}>
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

function textFormat(props: TextFormatProps) {
  const text = props.text;
  return text.split("\n").map((str: string) => <p>{str}</p>);
}

export { ChapterSelector, ChapterDisplay };
