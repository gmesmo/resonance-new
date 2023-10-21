import chapters from "./chapters.json";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { Card } from "@mui/material";
import Divider from "@mui/material/Divider";

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
  const { id } = useParams();

  const chapter = chapters.find(
    (chapter) => chapter.chapterNumber.toString() === id
  );

  return (
    <Card className="bg-bg w-11/12 md:w-3/4 h-5/6 mx-auto self-center rounded-lg overflow-y-auto">
      <h1 className="text-accent text-xl md:text-3xl text-center m-4">
        {chapter ? chapter.title : "Capítulo não encontrado"}
      </h1>
      <Divider variant="middle" sx={{ background: "lightgray" }} />

      {chapter?.pages?.map((page, i) => {
        return (
          <div
            key={page.number}
            className="text-content text-justify indent-10 text-lg w-11/12 mx-auto mt-10"
          >
            {textFormat({ text: page.text })}
          </div>
        );
      })}
    </Card>
  );
}

function textFormat(props: TextFormatProps) {
  const text = props.text;
  return text.split("\n").map((str: string) => <p>{str}</p>);
}

export { ChapterSelector, ChapterDisplay };
