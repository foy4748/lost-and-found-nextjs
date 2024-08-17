import Claims from "./components/Claims";
function ClaimsForFounder({ params }: { params: { foundById: string } }) {
  return (
    <>
      <Claims enableEditButton={true} foundById={params.foundById} />
    </>
  );
}

export default ClaimsForFounder;
