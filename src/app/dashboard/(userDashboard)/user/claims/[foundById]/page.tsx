import Claims from "@/components/ReportFound/Claims";
function ClaimsForFounder({ params }: { params: { foundById: string } }) {
  return (
    <>
      <Claims foundById={params.foundById} />
    </>
  );
}

export default ClaimsForFounder;
