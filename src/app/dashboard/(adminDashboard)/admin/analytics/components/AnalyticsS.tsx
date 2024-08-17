import Chart, { ReactGoogleChartProps } from "react-google-charts";

function AnalyticsS({
  dataForFoundItems,
  dataForClaimItems,
}: {
  dataForFoundItems: ReactGoogleChartProps["data"];
  dataForClaimItems: ReactGoogleChartProps["data"];
}) {
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

export default AnalyticsS;
