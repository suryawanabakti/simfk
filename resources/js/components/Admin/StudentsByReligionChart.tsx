"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface StudentsByReligionChartProps {
  data: Record<string, number>
}

export function StudentsByReligionChart({ data }: StudentsByReligionChartProps) {
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

    const religions = Object.keys(data)
    const counts = religions.map((religion) => data[religion])

    // Generate colors in rose shades
    const generateColors = (count: number) => {
      const baseColors = [
        "rgba(244, 63, 94, 0.8)",
        "rgba(236, 72, 153, 0.8)",
        "rgba(219, 39, 119, 0.8)",
        "rgba(190, 24, 93, 0.8)",
        "rgba(157, 23, 77, 0.8)",
        "rgba(131, 24, 67, 0.8)",
      ]

      // If we have more religions than base colors, repeat colors
      return religions.map((_, i) => baseColors[i % baseColors.length])
    }

    const backgroundColor = generateColors(religions.length)

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: religions,
        datasets: [
          {
            data: counts,
            backgroundColor: backgroundColor,
            borderColor: "#ffffff",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                const total = counts.reduce((a, b) => a + b, 0)
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
