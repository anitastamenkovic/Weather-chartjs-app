import {
  ChartDataset,
  ChartEvent,
  ChartType,
  LegendElement,
  LegendItem,
  Scale,
  Tick,
  TooltipItem,
} from "chart.js";
import { colors, borderColors, chartColors } from "../constants";
import { FiveDaysWeatherType } from "../types";

export const useLineChart = (
  weatherForecast: FiveDaysWeatherType[],
  sliderValue: number
) => {
  const onClickHandler = (
    event: ChartEvent,
    legendItem: LegendItem,
    legend: LegendElement<ChartType>
  ) => {
    const legendTexts = legend?.chart?.data?.datasets?.map(
      (item) => item.label
    );
    const index = legendTexts.indexOf(legendItem.text);
    const isDataShown = legend.chart.isDatasetVisible(index);
    legend?.chart?.toggleDataVisibility(index);
    if (isDataShown === false) {
      legend.chart.show(index);
    } else {
      legend.chart.hide(index);
    }
    legend?.chart?.update();
  };

  const maxTemperatures = weatherForecast.map(
    (forecast: FiveDaysWeatherType) => {
      return Math.max(...forecast.temperatures);
    }
  );

  const maxTemperature = Math.max(...maxTemperatures);

  const yAxesMax = Math.ceil(maxTemperature / 10) * 10;

  const lineOptions = {
    indexAxis: "x" as const,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    tension: 0.4,
    scales: {
      x: {
        grid: {
          borderColor: chartColors["gray-3-op"],
          color: chartColors["gray-3-op"],
          drawTicks: false,
        },
        ticks: {
          padding: 10,
          maxRotation: 0,
          font: {
            size: 14,
          },
          callback: function (
            this: Scale,
            value: number | string,
            index: number,
            ticks: Tick[]
          ) {
            const allLabels = ticks.map((val, i) =>
              this.getLabelForValue(i).slice(0, 6)
            );

            const thisLabel = this.getLabelForValue(index).slice(0, 6);

            if (allLabels.indexOf(thisLabel) === index) {
              return thisLabel;
            }
            return null;
          },
        },
      },
      y: {
        grid: {
          borderColor: chartColors.transparent,
          color: chartColors["gray-3-op"],
          drawTicks: false,
        },
        ticks: {
          padding: 5,
          crossAlign: "far" as const,
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
        max: yAxesMax,
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
        labels: {
          generateLabels: (chart: any) => {
            let visibility: boolean[] = [];

            if (chart.data.datasets) {
              for (let i = 0; i < chart?.data?.datasets?.length - 1; i++) {
                if (chart?.getDataVisibility(i) === true) {
                  visibility.push(false);
                } else {
                  visibility.push(true);
                }
              }

              return chart.data.datasets
                .filter(
                  (item: ChartDataset, index: number, arr: ChartDataset[]) => {
                    if (index < arr.length - 1) {
                      return item;
                    }
                    return null;
                  }
                )
                .map((item: ChartDataset, index: number) => {
                  return {
                    text: item.label,
                    strokeStyle: item.borderColor,
                    fillStyle: item.backgroundColor,
                    hidden: visibility[index],
                  };
                });
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
        borderCapStyle: "round" as const,
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

  const labels = weatherForecast[0]?.times?.map((time) => {
    return new Date(time * 1000)
      .toLocaleDateString(navigator.language, {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", "");
  });

  const lineDatasets = weatherForecast.map(
    (forecast: FiveDaysWeatherType, index: number) => {
      return {
        type: "line" as const,
        label: forecast.city,
        data: forecast.temperatures,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        pointBackgroundColor: chartColors.transparent,
        pointBorderWidth: 0,
      };
    }
  );

  const barData = weatherForecast[0]?.temperatures?.map(
    (value: number, index: number) => {
      let x = 0;
      if ((sliderValue as number) - 1 === index) {
        x = yAxesMax;
      }
      return x;
    }
  );

  const barDataset = {
    type: "bar" as const,
    label: "",
    data: barData,
    backgroundColor: "white",
    borderColor: "white",
    categoryPercentage: 0.9,
    barPercentage: 0.8,
    maxBarThickness: 1.5,
  };

  const datasets = [...lineDatasets, barDataset];

  const lineData = {
    labels,
    datasets,
  };

  return { lineOptions, lineData };
};
