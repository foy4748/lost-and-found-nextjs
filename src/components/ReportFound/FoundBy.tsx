import { Button } from "flowbite-react";
import CreateClaim from "./CreateClaim";

async function FoundBy({ foundItemId }: { foundItemId: string }) {
  const res = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/found-by/${foundItemId}`
  );
  const { data } = await res.json();
  return (
    <>
      {JSON.stringify(data)}
      <CreateClaim foundItemId={foundItemId} />
    </>
  );
}

export default FoundBy;
