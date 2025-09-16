"use client";
import { useGetClaimsAnalyticsQuery } from "@/redux/apiSlices/authApiSlice";
import { useGetFoundItemsAnalyticsQuery } from "@/redux/apiSlices/reportFoundItemApiSlice";
import AnalyticsS from "./AnalyticsS";
import { ReactGoogleChartProps } from "react-google-charts";
import CenterItem from "@/components/ui/CenterItem";

function Analytics() {
  const { data: foundItemsAnlytics } = useGetFoundItemsAnalyticsQuery(null);
  const { data: claimsAnlytics } = useGetClaimsAnalyticsQuery(null);
  console.log(claimsAnlytics);

  const foundItemsCount = foundItemsAnlytics?.data?.["foundItemsCount"];
  const lostItemsCount =
    foundItemsAnlytics?.data?.["allItemsCount"] -
    foundItemsAnlytics?.data?.["foundItemsCount"];

  const resolvedClaimsCount = claimsAnlytics?.data?.["approavedClaims"];
  const unresolvedClaimsCount =
    claimsAnlytics?.data?.["allClaims"] -
    claimsAnlytics?.data?.["approavedClaims"];

  const dataForFoundItems: ReactGoogleChartProps["data"] = [
    ["Task", "Count"],
    [`Found Items ${foundItemsCount}`, foundItemsCount],
    [`Lost Items ${lostItemsCount}`, lostItemsCount],
  ];

  const dataForClaimItems: ReactGoogleChartProps["data"] = [
    ["Claims", "Counts"],
    [`Unresolved ${unresolvedClaimsCount}`, unresolvedClaimsCount],
    [`Resolved ${resolvedClaimsCount}`, resolvedClaimsCount],
  ];
  return (
    <>
      <h1 className="form-title">Analytics</h1>
      <CenterItem>
        <AnalyticsS
          dataForFoundItems={dataForFoundItems}
          dataForClaimItems={dataForClaimItems}
        />
      </CenterItem>
    </>
  );
}

export default Analytics;
