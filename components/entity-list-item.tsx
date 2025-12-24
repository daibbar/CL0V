"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"

interface EntityListItemProps {
  title: string
  subtitle?: string | React.ReactNode
  isSelected: boolean
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}

export function EntityListItem({ title, subtitle, isSelected, onClick, onEdit, onDelete }: EntityListItemProps) {
  return (
    <div
      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
        isSelected ? "bg-primary/10 border-primary" : "bg-card border-border hover:bg-muted"
      }`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm truncate">{title}</h3>
        {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      </div>
      <div className="flex gap-1 ml-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>
    </div>
  )
}
