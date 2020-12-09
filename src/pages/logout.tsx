import Head from "next/head";
import { useRouter } from "next/router";
import LoaderWheel from "../components/common/LoaderWheel";
import { useEffect } from "react";

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Logging out - Quantum Budget</title>
      </Head>
      <LoaderWheel title="Logging out" description="You're being logged out" />
    </>
  );
};

export default Logout;
