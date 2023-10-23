import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

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
      {cookiesAlert === true && cookies == false && (
        <div
          className={`flex flex-col text-justify items-center absolute left-1/2 bottom-5 -translate-x-1/2 p-5 w-menu md:w-1/4 bg-slate-500 rounded-lg glass`}
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

export { LocalStorageHandler, cookiesCheck, saveChoice, findChoice };
