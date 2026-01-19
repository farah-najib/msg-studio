import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, PenLine, Calendar, AlertCircle, Trophy, Users, Check } from "lucide-react"
import { type Language, getTranslation, type TemplateType } from "@/lib/translations"

interface TemplateSelectorProps {
  selectedTemplate: TemplateType | null
  onSelectTemplate: (template: TemplateType) => void
  language: Language
}

const templateIcons: Record<TemplateType, typeof BookOpen> = {
  todayLesson: BookOpen,
  homework: PenLine,
  examNotice: Calendar,
  announcement: AlertCircle,
  achievement: Trophy,
  meeting: Users,
}

const templateKeys: TemplateType[] = ["todayLesson", "homework", "examNotice", "announcement", "achievement", "meeting"]

export function TemplateSelector({ selectedTemplate, onSelectTemplate, language }: TemplateSelectorProps) {
  const t = getTranslation(language)

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4 text-foreground">{t.templateTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {templateKeys.map((key) => {
            const Icon = templateIcons[key]
            const isSelected = selectedTemplate === key
            return (
              <Button
                key={key}
                variant={isSelected ? "default" : "outline"}
                className={`h-auto flex-col gap-2 py-4 transition-all relative ${
                  isSelected ? "" : "hover:bg-primary hover:text-primary-foreground hover:border-primary bg-transparent"
                }`}
                onClick={() => onSelectTemplate(key)}
              >
                {isSelected && (
                  <div className="absolute top-2 end-2">
                    <Check className="w-4 h-4" />
                  </div>
                )}
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{t.templates[key]}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
