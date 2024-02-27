import {
  ChartEvent,
  ChartType,
  LegendElement,
  LegendItem,
  TooltipItem,
} from "chart.js";
import { colors, borderColors, chartColors } from "../constants";
import { CurrentWeather } from "../types";

export const useBarChart = (currentWeather: CurrentWeather[]) => {
  const onClickHandler = (
    event: ChartEvent,
    legendItem: LegendItem,
    legend: LegendElement<ChartType>
  ) => {
    const index = legend?.chart?.data?.labels?.indexOf(legendItem.text);
    legend?.chart?.toggleDataVisibility(index as number);
    legend?.chart?.update();
  };

  const barOptions = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          borderColor: chartColors.transparent,
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          borderColor: chartColors.transparent,
          display: false,
        },
        ticks: {
          crossAlign: "far" as const,
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        barPercentage: 0.75,
        borderWidth: 1,
        borderRadius: 5,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        onClick: (
          event: ChartEvent,
          legendItem: LegendItem,
          legend: LegendElement<ChartType>
        ) => onClickHandler(event, legendItem, legend),
        position: "top" as const,
        labels: {
          generateLabels: (chart: any) => {
            let visibility: boolean[] = [];
            if (chart.data.labels) {
              for (let i = 0; i < chart.data.labels.length; i++) {
                if (chart?.getDataVisibility(i) === true) {
                  visibility.push(false);
                } else {
                  visibility.push(true);
                }
              }

              return chart.data.labels.map((value: unknown, index: number) => ({
                text: value,
                strokeStyle: chart.data.datasets[0].borderColor[index],
                fillStyle: chart.data.datasets[0].backgroundColor[index],
                hidden: visibility[index],
              }));
            }
          },
          usePointStyle: true,
          boxWidth: 7,
          boxHeight: 7,
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      tooltip: {
        backgroundColor: chartColors["gray-1-op"],
        titleColor: chartColors["gray-4"],
        titleAlign: "center" as const,
        bodyColor: chartColors["gray-4"],
        bodyAlign: "center" as const,
        displayColors: false,
        callbacks: {
          label: function (context: TooltipItem<ChartType>) {
            return `${context.formattedValue}°C`;
          },
        },
      },
    },
  };

  const cities = currentWeather.map((item) => item.city);
  const currentTemperatures = currentWeather.map((item) => item.temp);

  const barData = {
    labels: cities,
    datasets: [
      {
        label: "",
        data: currentTemperatures,
        backgroundColor: colors,
        borderColor: borderColors,
        hoverBackgroundColor: borderColors,
        maxBarThickness: 70,
      },
    ],
  };

  return { barOptions, barData };
};
