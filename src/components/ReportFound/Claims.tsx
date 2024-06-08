"use client";

import { useEffect, useState } from "react";

function Claims({ foundById }: { foundById: string }) {
  const [claims, setClaims] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/claims/${foundById}`,
        {
          credentials: "include",
        }
      );
      const { data } = await res.json();
      console.log("Claims data", data);
      setClaims(data);
    })();
  }, []);

  return <>{JSON.stringify(claims)}</>;
}

export default Claims;
