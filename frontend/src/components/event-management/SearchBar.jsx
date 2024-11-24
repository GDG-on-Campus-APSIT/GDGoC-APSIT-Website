'use client'

import { useEvents } from './EventsContext'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from 'lucide-react'

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useEvents()

  return (
    <div className="mb-6">
      <Label htmlFor="search" className="sr-only">Search events</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search events..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}