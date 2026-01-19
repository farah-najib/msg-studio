import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, MessageCircle } from 'lucide-react'
import { generateFormattedMessage } from '@/lib/format-message'
import {
  type Language,
  getTranslation,
  type TemplateType
} from '@/lib/translations'

interface MessagePreviewProps {
  templateType: TemplateType | null
  formData: Record<string, string>
  useBorders: boolean
  useEmojis: boolean
  language: Language
  tags: string[]
  photos: string[]
}

export function MessagePreview({
  templateType,
  formData,
  useBorders,
  useEmojis,
  language,
  tags,
  photos
}: MessagePreviewProps) {
  const [copied, setCopied] = useState(false)
  const t = getTranslation(language)

  const formattedMessage = useMemo(() => {
    if (
      templateType &&
      (Object.values(formData).some((v) => v) || tags.length > 0)
    ) {
      return generateFormattedMessage({
        templateType,
        formData,
        language,
        useBorders,
        useEmojis,
        tags,
        photos
      })
    }
    return ''
  }, [templateType, formData, language, useBorders, useEmojis, tags, photos])

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.write) {
        const blob = new Blob([formattedMessage], {
          type: 'text/plain;charset=utf-8'
        })
        const clipboardItem = new ClipboardItem({ 'text/plain': blob })
        await navigator.clipboard.write([clipboardItem])
      } else {
        await navigator.clipboard.writeText(formattedMessage)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = formattedMessage
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '-9999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Copy failed:', err)
      }
      document.body.removeChild(textArea)
    }
  }

  const handleSendToWhatsApp = () => {
    const encoded = encodeURIComponent(formattedMessage)
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    const url = isMobile
      ? `whatsapp://send?text=${encoded}`
      : `https://web.whatsapp.com/send?text=${encoded}`
    window.open(url, '_blank')
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-accent" />
          {t.previewTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="bg-muted rounded-lg p-5 min-h-[300px] font-mono text-sm leading-relaxed whitespace-pre-wrap break-words"
          dir="auto"
        >
          {formattedMessage || (
            <span className="text-muted-foreground italic">
              {t.previewPlaceholder}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            {t.charCount}: {formattedMessage.length}
          </span>
          <span>{t.whatsappReady}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleCopy}
            disabled={!formattedMessage}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 me-2" />
                {t.copied}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 me-2" />
                {t.copy}
              </>
            )}
          </Button>
          <Button
            className="w-full bg-[#25D366] hover:bg-[#20BA59] text-white"
            onClick={handleSendToWhatsApp}
            disabled={!formattedMessage}
          >
            <MessageCircle className="w-4 h-4 me-2" />
            {t.sendWhatsApp}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
