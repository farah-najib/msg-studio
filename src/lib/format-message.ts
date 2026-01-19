import type { TemplateType, Language } from "./translations"

interface FormData {
  [key: string]: string
}

interface FormatOptions {
  templateType: TemplateType
  formData: FormData
  language: Language
  useBorders: boolean
  useEmojis: boolean
  tags: string[]
  photos: string[]
}

export function generateFormattedMessage(options: FormatOptions): string {
  const { templateType, formData, language, useBorders, useEmojis, tags, photos } = options

  const parts: string[] = []
  const topBorder = '━━━━━━━━━━━━━━━━━━━━'
  const divider = "------------------------"
  const bottomBorder = '━━━━━━━━━━━━━━━━━━━━'

  const titles: Record<TemplateType, { en: string; ar: string }> = {
    todayLesson: { en: "Today's Lesson Report", ar: "تقرير درس اليوم" },
    homework: { en: "Homework Assignment", ar: "الواجب المنزلي" },
    examNotice: { en: "Exam Notice", ar: "إشعار اختبار" },
    announcement: { en: "School Announcement", ar: "إعلان مدرسي" },
    achievement: { en: "Student Achievement", ar: "إنجاز طالب" },
    meeting: { en: "Parent-Teacher Meeting", ar: "اجتماع أولياء الأمور" },
  }

  const footers: Record<TemplateType, { en: string; ar: string }> = {
    todayLesson: { en: "Thank you for your attention!", ar: "شكرا لاهتمامكم!" },
    homework: { en: "Complete on time! Good luck!", ar: "أكمله في الوقت المحدد! بالتوفيق!" },
    examNotice: { en: "Study well! You can do it!", ar: "ادرس جيدا! يمكنك فعلها!" },
    announcement: { en: "Thank you for your cooperation!", ar: "شكرا لتعاونكم!" },
    achievement: { en: "Keep up the great work!", ar: "واصل التميز!" },
    meeting: { en: "Your presence is important! See you there!", ar: "حضوركم مهم! نراكم هناك!" },
  }

  const titleEmojis: Record<TemplateType, string> = {
    todayLesson: "\u{1F4DA}",
    homework: "\u{1F4DD}",
    examNotice: "\u{1F4CB}",
    announcement: "\u{1F4E2}",
    achievement: "\u{1F3C6}",
    meeting: "\u{1F46A}",
  }

  const emoji = useEmojis ? titleEmojis[templateType] : ""
  const title = titles[templateType][language]

  if (useBorders) parts.push(topBorder)

  if (useEmojis) {
    parts.push(`*${emoji} ${title} ${emoji}*`)
  } else {
    parts.push(`*${title}*`)
  }

  if (useBorders) parts.push(divider)
  parts.push("")

  const content = generateTemplateContent(templateType, formData, language, useEmojis)
  if (content) parts.push(content)

  if (tags.length > 0) {
    parts.push("")
    const tagEmoji = useEmojis ? "\u{1F3F7}\u{FE0F} " : ""
    const tagLabel = language === "ar" ? "التقييم" : "Assessment"
    parts.push(`${tagEmoji}*${tagLabel}:*`)
    parts.push(tags.map((tag) => `[${tag}]`).join(" "))
  }

  if (photos.length > 0) {
    parts.push("")
    const photoEmoji = useEmojis ? "\u{1F4F7} " : ""
    const photoLabel = language === "ar" ? "صور النشاط" : "Activity Photos"
    parts.push(`${photoEmoji}*${photoLabel}:*`)
    photos.forEach((photo, index) => {
      if (photo.startsWith("http")) {
        parts.push(`${index + 1}. ${photo}`)
      }
    })
    if (photos.some((p) => !p.startsWith("http"))) {
      const attachNote =
        language === "ar"
          ? `(${photos.filter((p) => !p.startsWith("http")).length} صورة مرفقة)`
          : `(${photos.filter((p) => !p.startsWith("http")).length} photo(s) attached)`
      parts.push(attachNote)
    }
  }

  parts.push("")

  if (useBorders) parts.push(divider)
  const footerEmoji = useEmojis ? " \u{1F64F}" : ""
  parts.push(`_${footers[templateType][language]}${footerEmoji}_`)

  if (useBorders) parts.push(bottomBorder)

  return parts.join("\n")
}

function generateTemplateContent(
  templateType: TemplateType,
  formData: FormData,
  language: Language,
  useEmojis: boolean,
): string {
  const lines: string[] = []
  const isAr = language === "ar"

  const E = {
    calendar: "\u{1F4C5}",
    book: "\u{1F4D6}",
    pencil: "\u{270F}\u{FE0F}",
    memo: "\u{1F4DD}",
    star: "\u{2B50}",
    pin: "\u{1F4CC}",
    clock: "\u{1F551}",
    location: "\u{1F4CD}",
    books: "\u{1F4DA}",
    target: "\u{1F3AF}",
    school: "\u{1F3EB}",
    clipboard: "\u{1F4CB}",
    warning: "\u{26A0}\u{FE0F}",
    sparkles: "\u{2728}",
    person: "\u{1F464}",
    party: "\u{1F389}",
    clap: "\u{1F44F}",
    write: "\u{270D}\u{FE0F}",
    alarm: "\u{23F0}",
  }

  switch (templateType) {
    case "todayLesson":
      if (formData.date)
        lines.push(`${useEmojis ? E.calendar + " " : ""}${isAr ? "التاريخ" : "Date"}: ${formData.date}`)
      if (formData.subject)
        lines.push(`${useEmojis ? E.book + " " : ""}${isAr ? "المادة" : "Subject"}: ${formData.subject}`)
      lines.push("")
      if (formData.topics) {
        lines.push(`${useEmojis ? E.pencil + " " : ""}*${isAr ? "المواضيع المغطاة" : "Topics Covered"}:*`)
        formData.topics.split("\n").forEach((t) => t.trim() && lines.push(`- ${t.trim()}`))
        lines.push("")
      }
      if (formData.activity) {
        lines.push(`${useEmojis ? E.memo + " " : ""}*${isAr ? "نشاط الصف" : "Class Activity"}:*`)
        lines.push(formData.activity)
        lines.push("")
      }
      if (formData.performance) {
        lines.push(`${useEmojis ? E.star + " " : ""}*${isAr ? "أداء الطالب" : "Student Performance"}:*`)
        lines.push(formData.performance)
      }
      if (formData.notes) {
        lines.push("")
        lines.push(`${useEmojis ? E.pin + " " : ""}*${isAr ? "ملاحظات" : "Notes"}:*`)
        lines.push(formData.notes)
      }
      break

    case "homework":
      if (formData.dateGiven)
        lines.push(
          `${useEmojis ? E.calendar + " " : ""}${isAr ? "تاريخ الإعطاء" : "Date Given"}: ${formData.dateGiven}`,
        )
      if (formData.dueDate)
        lines.push(`${useEmojis ? E.calendar + " " : ""}${isAr ? "تاريخ التسليم" : "Due Date"}: ${formData.dueDate}`)
      if (formData.subject)
        lines.push(`${useEmojis ? E.book + " " : ""}${isAr ? "المادة" : "Subject"}: ${formData.subject}`)
      lines.push("")
      if (formData.assignment) {
        lines.push(`${useEmojis ? E.write + " " : ""}*${isAr ? "الواجب" : "Assignment"}:*`)
        lines.push(formData.assignment)
        lines.push("")
      }
      if (formData.materials) {
        lines.push(`${useEmojis ? E.books + " " : ""}*${isAr ? "المواد المطلوبة" : "Materials Needed"}:*`)
        formData.materials.split("\n").forEach((m) => m.trim() && lines.push(`- ${m.trim()}`))
        lines.push("")
      }
      if (formData.notes) {
        lines.push(`${useEmojis ? E.alarm + " " : ""}*${isAr ? "ملاحظات مهمة" : "Important Notes"}:*`)
        lines.push(formData.notes)
      }
      break

    case "examNotice":
      lines.push(`${useEmojis ? E.target + " " : ""}*${isAr ? "الاختبار القادم" : "Upcoming Examination"}*`)
      lines.push("")
      if (formData.subject)
        lines.push(`${useEmojis ? E.book + " " : ""}${isAr ? "المادة" : "Subject"}: ${formData.subject}`)
      if (formData.date)
        lines.push(`${useEmojis ? E.calendar + " " : ""}${isAr ? "التاريخ" : "Date"}: ${formData.date}`)
      if (formData.time) lines.push(`${useEmojis ? E.clock + " " : ""}${isAr ? "الوقت" : "Time"}: ${formData.time}`)
      if (formData.room) lines.push(`${useEmojis ? E.location + " " : ""}${isAr ? "القاعة" : "Room"}: ${formData.room}`)
      lines.push("")
      if (formData.syllabus) {
        lines.push(`${useEmojis ? E.books + " " : ""}*${isAr ? "المنهج" : "Syllabus"}:*`)
        formData.syllabus.split("\n").forEach((s) => s.trim() && lines.push(`- ${s.trim()}`))
        lines.push("")
      }
      if (formData.requirements) {
        lines.push(`${useEmojis ? E.memo + " " : ""}*${isAr ? "ما يجب إحضاره" : "What to Bring"}:*`)
        formData.requirements.split("\n").forEach((r) => r.trim() && lines.push(`- ${r.trim()}`))
      }
      break

    case "announcement":
      lines.push(`${useEmojis ? E.school + " " : ""}*${isAr ? "إشعار مهم" : "Important Notice"}*`)
      lines.push("")
      if (formData.title) lines.push(`*${formData.title}*`)
      lines.push("")
      if (formData.details) {
        lines.push(`${useEmojis ? E.clipboard + " " : ""}*${isAr ? "التفاصيل" : "Details"}:*`)
        lines.push(formData.details)
        lines.push("")
      }
      if (formData.date)
        lines.push(`${useEmojis ? E.calendar + " " : ""}${isAr ? "تاريخ السريان" : "Effective Date"}: ${formData.date}`)
      lines.push("")
      if (formData.action) {
        lines.push(`${useEmojis ? E.warning + " " : ""}*${isAr ? "الإجراء المطلوب" : "Action Required"}:*`)
        lines.push(formData.action)
      }
      break

    case "achievement":
      lines.push(`${useEmojis ? E.sparkles + " " : ""}*${isAr ? "مبروك!" : "Congratulations!"}*`)
      lines.push("")
      if (formData.studentName)
        lines.push(`${useEmojis ? E.person + " " : ""}${isAr ? "الطالب" : "Student"}: ${formData.studentName}`)
      if (formData.class) lines.push(`${useEmojis ? E.books + " " : ""}${isAr ? "الصف" : "Class"}: ${formData.class}`)
      lines.push("")
      if (formData.achievement) {
        lines.push(`${useEmojis ? E.target + " " : ""}*${isAr ? "الإنجاز" : "Achievement"}:*`)
        lines.push(formData.achievement)
        lines.push("")
      }
      if (formData.recognition) {
        lines.push(`${useEmojis ? E.party + " " : ""}*${isAr ? "التكريم" : "Recognition"}:*`)
        lines.push(formData.recognition)
        lines.push("")
      }
      lines.push(
        `${useEmojis ? E.clap + " " : ""}${isAr ? "نحن فخورون بهذا الإنجاز!" : "We are proud of this accomplishment!"}`,
      )
      break

    case "meeting":
      lines.push(`${useEmojis ? E.clipboard + " " : ""}*${isAr ? "دعوة لاجتماع" : "PTM Invitation"}*`)
      lines.push("")
      if (formData.date)
        lines.push(`${useEmojis ? E.calendar + " " : ""}${isAr ? "التاريخ" : "Date"}: ${formData.date}`)
      if (formData.time) lines.push(`${useEmojis ? E.clock + " " : ""}${isAr ? "الوقت" : "Time"}: ${formData.time}`)
      if (formData.venue)
        lines.push(`${useEmojis ? E.location + " " : ""}${isAr ? "المكان" : "Venue"}: ${formData.venue}`)
      lines.push("")
      if (formData.agenda) {
        lines.push(`${useEmojis ? E.memo + " " : ""}*${isAr ? "جدول الأعمال" : "Agenda"}:*`)
        formData.agenda.split("\n").forEach((a) => a.trim() && lines.push(`- ${a.trim()}`))
        lines.push("")
      }
      if (formData.requirements) {
        lines.push(`${useEmojis ? E.warning + " " : ""}*${isAr ? "يرجى إحضار" : "Please bring"}:*`)
        formData.requirements.split("\n").forEach((r) => r.trim() && lines.push(`- ${r.trim()}`))
      }
      break
  }

  return lines.join("\n")
}
