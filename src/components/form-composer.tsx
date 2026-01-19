
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Edit3, RotateCcw } from "lucide-react"
import { EmojiPicker } from "./emoji-picker"


import { type Language, getTranslation, templateFields, type TemplateType } from "@/lib/translations"

interface FormComposerProps {
  templateType: TemplateType
  formData: Record<string, string>
  onUpdateField: (key: string, value: string) => void
  onClearForm: () => void
  useBorders: boolean
  useEmojis: boolean
  onToggleBorders: (value: boolean) => void
  onToggleEmojis: (value: boolean) => void
  language: Language
  tags: string[]
  onTagsChange: (tags: string[]) => void
  photos: string[]
  onPhotosChange: (photos: string[]) => void
}

export function FormComposer({
  templateType,
  formData,
  onUpdateField,
  onClearForm,
  useBorders,
  useEmojis,
  onToggleBorders,
  onToggleEmojis,
  language,

}: FormComposerProps) {
  const t = getTranslation(language)
  const fields = templateFields[templateType]
  const activeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const activeFieldKey = useRef<string | null>(null)


  const handleEmojiSelect = (emoji: string) => {
    if (activeFieldKey.current) {
      const currentValue = formData[activeFieldKey.current] || ""
      const input = activeInputRef.current

      if (input) {
        const start = input.selectionStart || currentValue.length
        const end = input.selectionEnd || currentValue.length
        const newValue = currentValue.substring(0, start) + emoji + currentValue.substring(end)
        onUpdateField(activeFieldKey.current, newValue)

        setTimeout(() => {
          if (input) {
            input.focus()
            const newPos = start + emoji.length
            input.setSelectionRange(newPos, newPos)
          }
        }, 0)
      } else {
        onUpdateField(activeFieldKey.current, currentValue + emoji)
      }
    }
  }

  const handleFocus = (key: string, ref: HTMLInputElement | HTMLTextAreaElement) => {
    activeFieldKey.current = key
    activeInputRef.current = ref
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-primary" />
            <CardTitle>{t.composeTitle}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <EmojiPicker onSelect={handleEmojiSelect} language={language} />
            <Button variant="ghost" size="icon" onClick={onClearForm} title={t.clearForm}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{language === "ar" ? field.labelAr : field.labelEn}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.key}
                placeholder={language === "ar" ? field.placeholderAr : field.placeholderEn}
                value={formData[field.key] || ""}
                onChange={(e) => onUpdateField(field.key, e.target.value)}
                onFocus={(e) => handleFocus(field.key, e.target)}
                className="min-h-[100px] text-base leading-relaxed resize-none"
              />
            ) : field.type === "date" ? (
              <Input
                id={field.key}
                type="date"
                value={formData[field.key] || ""}
                onChange={(e) => onUpdateField(field.key, e.target.value)}
                onFocus={(e) => handleFocus(field.key, e.target)}
                className="text-base"
              />
            ) : (
              <Input
                id={field.key}
                placeholder={language === "ar" ? field.placeholderAr : field.placeholderEn}
                value={formData[field.key] || ""}
                onChange={(e) => onUpdateField(field.key, e.target.value)}
                onFocus={(e) => handleFocus(field.key, e.target)}
                className="text-base"
              />
            )}
          </div>
        ))}


        {/* Style Options */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t.styleOptions}</h3>

          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
            <Label htmlFor="borders" className="cursor-pointer">
              {t.addBorders}
            </Label>
            <Switch id="borders" checked={useBorders} onCheckedChange={onToggleBorders} />
          </div>

          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
            <Label htmlFor="emojis" className="cursor-pointer">
              {t.addEmojis}
            </Label>
            <Switch id="emojis" checked={useEmojis} onCheckedChange={onToggleEmojis} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
