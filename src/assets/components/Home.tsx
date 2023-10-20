import logo from "./MARK.png";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div
      className={`${styles.logoWrapper} relative w-full md:w-[20%] h-auto flex flex-row my-0 mx-auto`}
    >
      <img className={`absolute w-full translate-y-[15%]`} src={logo} />
      <img
        className={`absolute w-full translate-y-[10%] translate-x-[10%]`}
        src={logo}
      />
      <img
        className={`absolute w-full translate-y-[10%] translate-x-[-10%]`}
        src={logo}
      />
    </div>
  );
}
