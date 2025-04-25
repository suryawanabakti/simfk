"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentsByYearChartProps {
  data: Record<string, number>
}

export function StudentsByYearChart({ data }: StudentsByYearChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const years = Object.keys(data).sort()
    const counts = years.map((year) => data[year])

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "Jumlah Mahasiswa",
            data: counts,
            fill: true,
            backgroundColor: "rgba(244, 63, 94, 0.1)",
            borderColor: "rgba(244, 63, 94, 1)",
            tension: 0.3,
            pointBackgroundColor: "rgba(244, 63, 94, 1)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              precision: 0,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || ""
                const value = context.raw as number
                return `${label}: ${value}`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <canvas ref={chartRef} />
}
