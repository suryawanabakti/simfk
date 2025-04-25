"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentsByAdmissionChartProps {
  data: {
    SNMPTN: number
    SBMPTN: number
    Mandiri: number
    INTERNASIONAL: number
  }
}

export function StudentsByAdmissionChart({ data }: StudentsByAdmissionChartProps) {
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

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["SNMPTN", "SBMPTN", "Mandiri", "Internasional"],
        datasets: [
          {
            label: "Jumlah Mahasiswa",
            data: [data.SNMPTN, data.SBMPTN, data.Mandiri, data.INTERNASIONAL],
            backgroundColor: [
              "rgba(244, 63, 94, 0.7)",
              "rgba(236, 72, 153, 0.7)",
              "rgba(219, 39, 119, 0.7)",
              "rgba(190, 24, 93, 0.7)",
            ],
            borderColor: [
              "rgba(244, 63, 94, 1)",
              "rgba(236, 72, 153, 1)",
              "rgba(219, 39, 119, 1)",
              "rgba(190, 24, 93, 1)",
            ],
            borderWidth: 1,
            borderRadius: 4,
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
                const total = data.SNMPTN + data.SBMPTN + data.Mandiri + data.INTERNASIONAL
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
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
