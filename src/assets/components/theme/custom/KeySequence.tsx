import { useState, useEffect } from "react";

const KeySequenceComponent: React.FC = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const correctSequence = ["h", "a", "y", "a", "t", "a"];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...keySequence, event.key];
      setKeySequence(newSequence);

      if (newSequence.length >= correctSequence.length) {
        setKeySequence([event.key]);
      }

      if (newSequence.join("") === correctSequence.join("")) {
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
