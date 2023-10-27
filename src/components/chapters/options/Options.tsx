import React, { useEffect, useState } from "react";
import {
  cookiesCheck,
  findChoice,
  saveChoice,
} from "../../localStorage/LocalStorageHandler";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

interface Page {
  number: number;
  text: string;
  options?: {
    id: number;
    text: string;
    reaction: string;
    default?: boolean;
  }[];
}

interface OptionHandlerProps {
  page: Page;
  chapter: string | null;
}

interface TextFormatProps {
  text: string;
}

const OptionHandler: React.FC<OptionHandlerProps> = ({ page, chapter }) => {
  const [display, setDisplay] = useState<React.ReactNode>(<></>);
  const [hasCookies, setHasCookies] = useState(false);
  const [choiceJustMade, setChoiceJustMade] = useState("");
  const cookiesResult = cookiesCheck();

  const choiceMade = (id: string, choice: number): void => {
    saveChoice(id, choice);
    setChoiceJustMade(choice.toString());
  };

  useEffect(() => {
    setHasCookies(cookiesResult);
    if (chapter) {
      // Verifique se há uma escolha no localStorage e atualize choiceJustMade, se disponível
      const choiceFromLocalStorage = findChoice(chapter + page.number);
      if (choiceFromLocalStorage) {
        setChoiceJustMade(choiceFromLocalStorage[0]);
      }
    }
  }, [cookiesResult, chapter, page.number]);

  useEffect(() => {
    if (page.options) {
      if (!hasCookies) {
        const selectedOption = page.options.find(
          (option) => option.default === true
        );
        const fullText = page.text + (selectedOption?.reaction || "");
        setDisplay(<>{textFormat({ text: fullText })}</>);
      } else if (choiceJustMade) {
        const selectedChoiceId = parseInt(choiceJustMade);
        const selectedChoice = page.options.find(
          (option) => option.id === selectedChoiceId
        );
        const fullText = page.text + (selectedChoice?.reaction || "");
        setDisplay(<>{textFormat({ text: fullText })}</>);
      } else {
        setDisplay(
          <>
            {textFormat({ text: page.text })}
            <ButtonGroup className="w-full flex justify-center mt-3">
              {page.options.map((option) => (
                <Button
                  key={option.id}
                  className="option text-contrast border-accent hover:border-accent hover:text-white hover:bg-accent rounded-lg"
                  onClick={() =>
                    choiceMade(chapter + page.number.toString(), option.id)
                  }
                >
                  {option.text}
                </Button>
              ))}
            </ButtonGroup>
          </>
        );
      }
    } else {
      const fullText = page.text;
      setDisplay(<>{textFormat({ text: fullText })}</>);
    }
  }, [page, chapter, hasCookies, choiceJustMade]);

  return <>{display}</>;
};

interface DefaultOptionProps {
  page: Page;
}

const DefaultOption: React.FC<DefaultOptionProps> = ({ page }) => {
  const selectedOption = page!.options!.find(
    (option) => option.default === true
  );

  if (selectedOption) {
    return <div>{selectedOption.reaction}</div>;
  }
};

function textFormat(props: TextFormatProps) {
  const text = props.text;
  return text
    .split("\n")
    .map((str: string, index: number) => <p key={index}>{str}</p>);
}

// function choiceId({ page }: { page: Page }) {
//   return page.number.toString() + page.options!.id.toString();
// }

export { DefaultOption, OptionHandler };
