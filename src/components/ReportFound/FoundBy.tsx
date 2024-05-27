async function FoundBy({ foundItemId }: { foundItemId: string }) {
  const res = await fetch(
    `${process.env.SERVER_ADDRESS}/api/found-items/found-by/${foundItemId}`
  );
  const { data } = await res.json();
  return <>{JSON.stringify(data)}</>;
}

export default FoundBy;
