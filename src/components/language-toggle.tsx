import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import type { Language } from "@/lib/translations"

interface LanguageToggleProps {
  language: Language
  onToggle: () => void
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <Button variant="outline" size="sm" onClick={onToggle} className="gap-2 bg-transparent">
      <Languages className="w-4 h-4" />
      <span className="font-medium">{language === "en" ? "العربية" : "English"}</span>
    </Button>
  )
}
