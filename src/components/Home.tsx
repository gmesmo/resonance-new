import logo from "./MARK.png";
import styles from "./Home.module.css";
import {
  JumpToLastPage,
  LastPageLink,
} from "./localStorage/LocalStorageHandler";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function Home() {
  const LinkToLastPage = LastPageLink();

  if (LinkToLastPage !== "./") {
    return (
      <>
        <div
          className={`${styles.logoWrapper} relative w-72 md:w-[20%] h-auto flex flex-row my-0 mx-auto`}
        >
          <Tooltip
            title="Continuar leitura"
            followCursor={true}
            placement="top"
            arrow={true}
          >
            <Link to={LastPageLink()}>
              <img className={`absolute w-full translate-y-[15%]`} src={logo} />
              <img
                className={`absolute w-full translate-y-[10%] translate-x-[10%]`}
                src={logo}
              />
              <img
                className={`absolute w-full translate-y-[10%] translate-x-[-10%]`}
                src={logo}
              />
            </Link>
          </Tooltip>
        </div>

        <JumpToLastPage />
      </>
    );
  } else {
    return (
      <>
        <div
          className={`${styles.logoWrapper} relative w-72 md:w-[20%] h-auto flex flex-row my-0 mx-auto`}
        >
          <Link to={LastPageLink()}>
            <img className={`absolute w-full translate-y-[15%]`} src={logo} />
            <img
              className={`absolute w-full translate-y-[10%] translate-x-[10%]`}
              src={logo}
            />
            <img
              className={`absolute w-full translate-y-[10%] translate-x-[-10%]`}
              src={logo}
            />
          </Link>
        </div>

        <JumpToLastPage />
      </>
    );
  }
}
