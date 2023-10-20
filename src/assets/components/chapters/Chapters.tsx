import chapters from "./chapters.json";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

function ChapterSelector() {
  return (
    <div className="flex flex-col w-full my-10">
      <Stack spacing={1} className="w-full">
        {chapters.map((chapter, i) => {
          return (
            <Button
              key={i}
              variant="outlined"
              className="text-content bg-accent hover:border-accent bg-opacity-100 rounded-xl border-accent"
            >
              <Link to={`/chapter/${chapter.chapterNumber}`}>teste</Link>
              {chapter.title}
            </Button>
          );
        })}
      </Stack>
    </div>
  );
}

function ChapterDisplay() {
  const { id } = useParams();

  return <>{id}</>;
}

export { ChapterSelector, ChapterDisplay };
