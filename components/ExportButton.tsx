"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExportButtonProps {
  data: any[]
  filename: string
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const exportToCSV = () => {
    setExporting(true)
    const headers = Object.keys(data[0]).join(",")
    const csv = [
      headers,
      ...data.map((row) =>
        Object.values(row)
          .map((value) => (typeof value === "string" ? `"${value}"` : value))
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    setExporting(false)
  }

  return (
    <Button onClick={exportToCSV} disabled={exporting}>
      <Download className="w-4 h-4 mr-2" />
      {exporting ? "Exporting..." : "Export to CSV"}
    </Button>
  )
}

