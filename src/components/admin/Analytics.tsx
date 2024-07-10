"use client";
import { useGetFoundItemsAnalyticsQuery } from "@/redux/apiSlices/reportFoundItemApiSlice";
import Chart from "react-google-charts";

function Analytics() {
  const { data: foundItemsAnlytics } = useGetFoundItemsAnalyticsQuery(null);
  const data = [
    ["Task", "Count"],
    ["Found Items", foundItemsAnlytics?.data?.["foundItemsCount"]],
    [
      "Lost Items",
      foundItemsAnlytics?.data?.["allItemsCount"] -
        foundItemsAnlytics?.data?.["foundItemsCount"],
    ],
  ];
  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
        options={{
          title: "Found Items",
          slices: { 1: { offset: 0.2 } },
        }}
        width="100%"
        height="300px"
      />
    </>
  );
}

export default Analytics;
