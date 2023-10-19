import { useState, useEffect } from "react";

const KeySequenceComponent: React.FC = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const correctSequence = ["h", "a", "y", "a", "t", "a"];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeySequence((prevSequence) => [...prevSequence, event.key]);

      if (keySequence.length >= correctSequence.length) {
        setKeySequence([event.key]);
      }

      if (keySequence.join("") === correctSequence.join("")) {
        // Sequência correta
        document.documentElement.setAttribute("data-theme", "hayata");
        setKeySequence([]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keySequence, correctSequence]);

  return <></>;
};

export default KeySequenceComponent;
