import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo, memo } from "react";

interface CustomChartProps {
  distance: number;
}

const TOTAL_MILES_TO_RUN = 365;

const CustomChart = (props: CustomChartProps) => {
  const { distance } = props;
  const data = useMemo(() => {
    return {
      labels: ["Progress", "Training Left"],
      datasets: [
        {
          label: "Miles",
          data: [distance, TOTAL_MILES_TO_RUN - distance],
          backgroundColor: ["#61dafb", "#282c34"],
          borderColor: ["#61dafb", "#61dafb"],
          labelColor: ["#000"],
        },
      ],
    };
  }, [distance]);
  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <div className="chartAndPercentageContainer">
      <div className="chart-percentage">
        {`${Math.floor((distance / TOTAL_MILES_TO_RUN) * 100)}%`}
      </div>
      <div>
        <div className="chart-container">
          <Doughnut
            data={data}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#61dafb",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(CustomChart);
