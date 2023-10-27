import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Primeiro aviso de cookies (localStorage)
function LocalStorageHandler() {
  const [cookies, setCookies] = useState(false);
  const [cookiesAlert, setCookiesAlert] = useState(false);

  useEffect(() => {
    // Verifica se o localStorage é suportado pelo navegador
    if (typeof window !== "undefined" && window.localStorage) {
      // Recupera o valor do localStorage com a chave "cookies"
      const storedCookies = localStorage.getItem("cookies");

      // Converte o valor para um booleano
      const cookiesValue = storedCookies === "true";

      // Atualiza o estado com o valor encontrado no localStorage
      setCookies(cookiesValue);
      if (!cookiesValue) {
        setCookiesAlert(true);
      }
    }
  }, []);

  function choiceHandler(e: boolean) {
    const choice = e;
    if (choice) {
      setCookies(true);
      setCookiesAlert(false);
      localStorage.setItem("cookies", JSON.stringify(choice));
    } else {
      setCookies(false);
      setCookiesAlert(false);
    }
  }

  return (
    <>
      {cookiesAlert && !cookies && (
        <div
          className={`flex flex-col text-justify items-center absolute z-10 left-1/2 bottom-5 -translate-x-1/2 p-5 w-menu md:w-1/4 bg-slate-500 rounded-lg glass`}
        >
          Esse site utiliza biscoitos para funcionar corretamente, podemos
          guardar eles no seu PC?
          <span className="mt-2 text-sm">
            Não aceitar implica em não ter a melhor experiência, pense bem!
          </span>
          <Stack spacing={2} direction={"row"} style={{ marginTop: "1rem" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => choiceHandler(false)}
            >
              Não
            </Button>
            <Button
              variant="contained"
              color="success"
              className="bg-[#1e7924]"
              onClick={() => choiceHandler(true)}
            >
              Claro!
            </Button>
          </Stack>
        </div>
      )}
    </>
  );
}

//Verifica se cookies estão habilitados (localStorage)
function cookiesCheck() {
  const [cookies, setCookies] = useState(false);

  useEffect(() => {
    // Verifica se o localStorage é suportado pelo navegador
    if (typeof window !== "undefined" && window.localStorage) {
      // Recupera o valor do localStorage com a chave "cookies"
      const storedCookies = localStorage.getItem("cookies");

      // Converte o valor para um booleano
      const cookiesValue = storedCookies === "true";

      // Atualiza o estado com o valor encontrado no localStorage
      setCookies(cookiesValue);
    }
  }, []);

  return cookies;
}

function JumpToLastPage() {
  const cookiesEnabled = cookiesCheck();
  const existingChapter = localStorage.getItem("Last Chapter");
  const existingPage = localStorage.getItem("Last Page");

  const [isDialogOpen, setIsDialogOpen] = useState(true);

  if (cookiesEnabled && existingChapter && existingPage) {
    return (
      <>
        {isDialogOpen && (
          <div
            className={`flex flex-col text-justify items-center absolute z-10 left-1/2 bottom-5 -translate-x-1/2 p-5 w-menu md:w-1/4 bg-slate-500 rounded-lg glass`}
          >
            Parece que parou no Capítulo {existingChapter}, página{" "}
            {existingPage}.<span>Deseja continuar sua leitura?</span>
            <Stack spacing={2} direction={"row"} style={{ marginTop: "1rem" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setIsDialogOpen(false)}
              >
                Não
              </Button>

              <Link to={`/chapter/${existingChapter}/page/${existingPage}`}>
                <Button
                  variant="contained"
                  color="success"
                  className="bg-[#1e7924]"
                >
                  Claro!
                </Button>
              </Link>
            </Stack>
          </div>
        )}
      </>
    );
  }
}

function LastPageLink() {
  const cookiesEnabled = cookiesCheck();
  const existingChapter = localStorage.getItem("Last Chapter");
  const existingPage = localStorage.getItem("Last Page");

  if (cookiesEnabled && existingChapter && existingPage) {
    return `./chapter/${existingChapter}/page/${existingPage}`;
  } else {
    return `./`;
  }
}

//Salva escolha feita pelo usuário
function saveChoice(id: string, choice: number) {
  const existingChoices = JSON.parse(localStorage.getItem("choices") || "{}");

  if (!existingChoices[id]) {
    existingChoices[id] = [];
  }

  existingChoices[id].push(choice);

  localStorage.setItem("choices", JSON.stringify(existingChoices));
}

//Procura se escolha foi feita pelo usuário e retorna ela em caso positivo
function findChoice(id: string): string | null {
  const existingChoicesJSON = localStorage.getItem("choices");

  if (existingChoicesJSON) {
    const existingChoices = JSON.parse(existingChoicesJSON);
    return existingChoices[id] || null;
  }

  return null;
}

function saveTheme(theme: string) {
  localStorage.setItem("theme", theme);
}

function getStoredTheme() {
  const existingThemeJSON = localStorage.getItem("theme");

  return existingThemeJSON || false;
}

function lastRead(lastChapter: string, lastPage: string) {
  const existingChapter = localStorage.getItem("Last Chapter");
  const existingPage = localStorage.getItem("Last Page");

  if (existingChapter && existingPage) {
    if (
      Number(existingChapter) < Number(lastChapter) ||
      (Number(existingChapter) === Number(lastChapter) &&
        Number(existingPage) < Number(lastPage))
    ) {
      localStorage.setItem("Last Chapter", lastChapter);
      localStorage.setItem("Last Page", lastPage);
    }
  } else {
    localStorage.setItem("Last Chapter", lastChapter);
    localStorage.setItem("Last Page", lastPage);
  }
}

export {
  LocalStorageHandler,
  cookiesCheck,
  saveChoice,
  findChoice,
  saveTheme,
  getStoredTheme,
  lastRead,
  JumpToLastPage,
  LastPageLink,
};
