import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { pages } from "../constants";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.replace(pages[0].pathName);
  }, []);
  return <></>;
}
