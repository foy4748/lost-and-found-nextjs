import CreateClaim from "./CreateClaim";

async function FoundBy({
  foundById,
  foundItemId,
}: {
  foundById: string;
  foundItemId: string;
}) {
  return <CreateClaim foundById={foundById} foundItemId={foundItemId} />;
}

export default FoundBy;
