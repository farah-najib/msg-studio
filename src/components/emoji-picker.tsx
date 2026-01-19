import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"
import { emojiCategories, emojiCategoryLabels, type Language } from "@/lib/translations"

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  language: Language
}

export function EmojiPicker({ onSelect, language }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<keyof typeof emojiCategories>("school")

  const labels = emojiCategoryLabels[language]
  const categories = Object.keys(emojiCategories) as Array<keyof typeof emojiCategories>

  const handleEmojiClick = (emoji: string) => {
    onSelect(emoji)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
          <Smile className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "ghost"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setActiveCategory(cat)}
            >
              {labels[cat]}
            </Button>
          ))}
        </div>
        {/* Emoji Grid */}
        <div className="p-3 grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
          {emojiCategories[activeCategory].map((emoji, idx) => (
            <button
              key={idx}
              className="w-8 h-8 flex items-center justify-center text-xl hover:bg-muted rounded transition-colors"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
