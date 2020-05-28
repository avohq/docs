import Head from "next/head";
import Logo from "../components/Logo";

import styles from "./index.module.css";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Avo Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.center}>
        <Logo />
      </div>
    </div>
  );
}
