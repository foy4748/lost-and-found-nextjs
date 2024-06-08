"use client";

import { useEffect, useState } from "react";

function MyItemsPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/found-items/by-user`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data: result } = await res.json();
      setData(result);
    })();
  }, []);
  return <>{JSON.stringify(data)}</>;
}

export default MyItemsPage;
