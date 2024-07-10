"use client";
import { useGetClaimsAnalyticsQuery } from "@/redux/apiSlices/authApiSlice";
import { useGetFoundItemsAnalyticsQuery } from "@/redux/apiSlices/reportFoundItemApiSlice";
import Chart from "react-google-charts";

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

  const dataForFoundItems = [
    ["Task", "Count"],
    [`Found Items ${foundItemsCount}`, foundItemsCount],
    [`Lost Items ${lostItemsCount}`, lostItemsCount],
  ];

  const dataForClaimItems = [
    ["Claims", "Counts"],
    [`Unresolved ${unresolvedClaimsCount}`, unresolvedClaimsCount],
    [`Resolved ${resolvedClaimsCount}`, resolvedClaimsCount],
  ];
  return (
    <>
      <section className="flex w-full">
        <aside>
          <Chart
            chartType="PieChart"
            data={dataForFoundItems}
            options={{
              title: "Found Items",
              slices: { 1: { offset: 0.2 } },
            }}
            width="400px"
            height="300px"
          />
        </aside>
        <aside>
          <Chart
            chartType="PieChart"
            data={dataForClaimItems}
            options={{
              title: "Claims",
              slices: { 1: { offset: 0.2 } },
            }}
            width="400px"
            height="300px"
          />
        </aside>
      </section>
    </>
  );
}

export default Analytics;
