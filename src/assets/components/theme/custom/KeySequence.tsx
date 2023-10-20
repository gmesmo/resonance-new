import { useState, useEffect } from "react";

const KeySequenceComponent: React.FC = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const correctSequences: { [key: string]: string[] } = {
    hayata: ["h", "a", "y", "a", "t", "a"],
    judy: ["j", "u", "d", "y"],
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.key];

      for (const theme in correctSequences) {
        const correctSequence = correctSequences[theme];
        const isCorrect = newSequence
          .join("")
          .endsWith(correctSequence.join(""));
        if (isCorrect) {
          // Sequência correta
          document.documentElement.setAttribute("data-theme", theme);
          setKeySequence([]);
          return;
        }
      }

      if (newSequence.length > 6) {
        // Se a tecla pressionada não corresponder a nenhuma sequência válida
        setKeySequence([]);
      } else {
        setKeySequence(newSequence);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keySequence]);

  return <></>;
};

export default KeySequenceComponent;
