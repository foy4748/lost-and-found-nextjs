import Claims from "./components/Claims";
async function ClaimsForFounder(props: {
  params: Promise<{ foundById: string }>;
}) {
  const params = await props.params;
  return (
    <>
      <Claims enableEditButton={true} foundById={params.foundById} />
    </>
  );
}

export default ClaimsForFounder;
