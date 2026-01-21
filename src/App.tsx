

import { useState } from 'react'
import { FormComposer } from '@/components/form-composer'
import { MessagePreview } from '@/components/message-preview'
import { TemplateSelector } from '@/components/template-selector'
import { LanguageToggle } from '@/components/language-toggle'

import { NotebookPen } from 'lucide-react'
import {
  type Language,
  type TemplateType
} from '@/lib/translations'

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('ar')


  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null
  )
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [useBorders, setUseBorders] = useState(true)
  const [useEmojis, setUseEmojis] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [photos, setPhotos] = useState<string[]>([])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'))
  }

  const handleSelectTemplate = (template: TemplateType) => {
    setSelectedTemplate(template)
    setFormData({})
    setTags([])
    setPhotos([])
  }

  const handleUpdateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleClearForm = () => {
    setFormData({})
    setTags([])
    setPhotos([])
  }

  return (
    <div className="font-sans antialiased">
      <main className="min-h-screen bg-background" lang={language}>
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
                  <NotebookPen className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    MsgStudio
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Write Better, Say More .
                  </p>
                </div>
              </div>
              <LanguageToggle language={language} onToggle={toggleLanguage} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div
          className="container mx-auto px-4 py-6 max-w-7xl"
          dir={language === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Panel - Template & Form */}
            <div className="space-y-6">
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleSelectTemplate}
                language={language}
              />
              {selectedTemplate && (
                <FormComposer
                  templateType={selectedTemplate}
                  formData={formData}
                  onUpdateField={handleUpdateField}
                  onClearForm={handleClearForm}
                  useBorders={useBorders}
                  useEmojis={useEmojis}
                  onToggleBorders={setUseBorders}
                  onToggleEmojis={setUseEmojis}
                  language={language}
                  tags={tags}
                  onTagsChange={setTags}
                  photos={photos}
                  onPhotosChange={setPhotos}
                />
              )}
            </div>

            {/* Right Panel - Preview */}
            <div className="lg:sticky lg:top-24 h-fit">
              <MessagePreview
                templateType={selectedTemplate}
                formData={formData}
                useBorders={useBorders}
                useEmojis={useEmojis}
                language={language}
                tags={tags}
                photos={photos}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
