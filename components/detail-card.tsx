import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { LucideIcon } from "lucide-react"

interface Column {
  header: string
  accessor: string | ((row: any) => React.ReactNode)
  className?: string
}

interface DetailCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  count?: number
  data?: any[]
  columns?: Column[]
  emptyMessage?: string
  children?: React.ReactNode
}

export function DetailCard({
  title,
  description,
  icon: Icon,
  count,
  data,
  columns,
  emptyMessage = "No data available",
  children,
}: DetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-accent" />}
          <CardTitle>
            {title}
            {count !== undefined && ` (${count})`}
          </CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children ? (
          children
        ) : data && columns ? (
          data.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col, idx) => (
                    <TableHead key={idx}>{col.header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIdx) => (
                  <TableRow key={rowIdx}>
                    {columns.map((col, colIdx) => (
                      <TableCell key={colIdx} className={col.className}>
                        {typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">{emptyMessage}</p>
          )
        ) : null}
      </CardContent>
    </Card>
  )
}
