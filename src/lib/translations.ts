export type Language = "en" | "ar"
export type TemplateType = "todayLesson" | "homework" | "examNotice" | "announcement" | "achievement" | "meeting"

export interface FieldConfig {
  key: string
  labelEn: string
  labelAr: string
  type: "text" | "textarea" | "date"
  placeholderEn: string
  placeholderAr: string
}

export const templateFields: Record<TemplateType, FieldConfig[]> = {
  todayLesson: [
    { key: "date", labelEn: "Date", labelAr: "التاريخ", type: "date", placeholderEn: "", placeholderAr: "" },
    {
      key: "subject",
      labelEn: "Subject",
      labelAr: "المادة",
      type: "text",
      placeholderEn: "e.g., Mathematics",
      placeholderAr: "مثال: الرياضيات",
    },
    {
      key: "topics",
      labelEn: "Topics Covered",
      labelAr: "المواضيع المغطاة",
      type: "textarea",
      placeholderEn: "List the topics covered today...",
      placeholderAr: "اذكر المواضيع التي تمت تغطيتها...",
    },
    {
      key: "activity",
      labelEn: "Class Activity",
      labelAr: "نشاط الصف",
      type: "textarea",
      placeholderEn: "Describe the class activity...",
      placeholderAr: "صف نشاط الصف...",
    },
    {
      key: "performance",
      labelEn: "Student Performance",
      labelAr: "أداء الطالب",
      type: "textarea",
      placeholderEn: "Overall feedback on student performance...",
      placeholderAr: "التقييم العام لأداء الطالب...",
    },
    {
      key: "notes",
      labelEn: "Additional Notes",
      labelAr: "ملاحظات إضافية",
      type: "textarea",
      placeholderEn: "Any other notes for parents...",
      placeholderAr: "أي ملاحظات أخرى لأولياء الأمور...",
    },
  ],
  homework: [
    {
      key: "dateGiven",
      labelEn: "Date Given",
      labelAr: "تاريخ الإعطاء",
      type: "date",
      placeholderEn: "",
      placeholderAr: "",
    },
    {
      key: "dueDate",
      labelEn: "Due Date",
      labelAr: "تاريخ التسليم",
      type: "date",
      placeholderEn: "",
      placeholderAr: "",
    },
    {
      key: "subject",
      labelEn: "Subject",
      labelAr: "المادة",
      type: "text",
      placeholderEn: "e.g., Science",
      placeholderAr: "مثال: العلوم",
    },
    {
      key: "assignment",
      labelEn: "Assignment Details",
      labelAr: "تفاصيل الواجب",
      type: "textarea",
      placeholderEn: "Describe the homework assignment...",
      placeholderAr: "صف الواجب المنزلي...",
    },
    {
      key: "materials",
      labelEn: "Materials Needed",
      labelAr: "المواد المطلوبة",
      type: "textarea",
      placeholderEn: "List required materials...",
      placeholderAr: "اذكر المواد المطلوبة...",
    },
    {
      key: "notes",
      labelEn: "Important Notes",
      labelAr: "ملاحظات مهمة",
      type: "textarea",
      placeholderEn: "Any special instructions...",
      placeholderAr: "أي تعليمات خاصة...",
    },
  ],
  examNotice: [
    {
      key: "subject",
      labelEn: "Subject",
      labelAr: "المادة",
      type: "text",
      placeholderEn: "e.g., English",
      placeholderAr: "مثال: اللغة الإنجليزية",
    },
    {
      key: "date",
      labelEn: "Exam Date",
      labelAr: "تاريخ الاختبار",
      type: "date",
      placeholderEn: "",
      placeholderAr: "",
    },
    {
      key: "time",
      labelEn: "Exam Time",
      labelAr: "وقت الاختبار",
      type: "text",
      placeholderEn: "e.g., 9:00 AM - 11:00 AM",
      placeholderAr: "مثال: 9:00 ص - 11:00 ص",
    },
    {
      key: "room",
      labelEn: "Room/Location",
      labelAr: "القاعة/المكان",
      type: "text",
      placeholderEn: "e.g., Room 101",
      placeholderAr: "مثال: قاعة 101",
    },
    {
      key: "syllabus",
      labelEn: "Syllabus/Topics",
      labelAr: "المنهج/المواضيع",
      type: "textarea",
      placeholderEn: "List chapters or topics to study...",
      placeholderAr: "اذكر الفصول أو المواضيع للمراجعة...",
    },
    {
      key: "requirements",
      labelEn: "What to Bring",
      labelAr: "ما يجب إحضاره",
      type: "textarea",
      placeholderEn: "List required items...",
      placeholderAr: "اذكر الأدوات المطلوبة...",
    },
  ],
  announcement: [
    {
      key: "title",
      labelEn: "Announcement Title",
      labelAr: "عنوان الإعلان",
      type: "text",
      placeholderEn: "e.g., School Holiday",
      placeholderAr: "مثال: عطلة مدرسية",
    },
    {
      key: "details",
      labelEn: "Details",
      labelAr: "التفاصيل",
      type: "textarea",
      placeholderEn: "Describe the announcement...",
      placeholderAr: "صف الإعلان...",
    },
    {
      key: "date",
      labelEn: "Effective Date",
      labelAr: "تاريخ السريان",
      type: "date",
      placeholderEn: "",
      placeholderAr: "",
    },
    {
      key: "action",
      labelEn: "Action Required",
      labelAr: "الإجراء المطلوب",
      type: "textarea",
      placeholderEn: "What parents/students need to do...",
      placeholderAr: "ما يحتاج أولياء الأمور/الطلاب فعله...",
    },
  ],
  achievement: [
    {
      key: "studentName",
      labelEn: "Student Name",
      labelAr: "اسم الطالب",
      type: "text",
      placeholderEn: "Enter student's name",
      placeholderAr: "أدخل اسم الطالب",
    },
    {
      key: "class",
      labelEn: "Class/Section",
      labelAr: "الصف/الشعبة",
      type: "text",
      placeholderEn: "e.g., Grade 5-A",
      placeholderAr: "مثال: الصف الخامس-أ",
    },
    {
      key: "achievement",
      labelEn: "Achievement",
      labelAr: "الإنجاز",
      type: "textarea",
      placeholderEn: "Describe the achievement...",
      placeholderAr: "صف الإنجاز...",
    },
    {
      key: "recognition",
      labelEn: "Recognition/Award",
      labelAr: "التكريم/الجائزة",
      type: "textarea",
      placeholderEn: "Certificate, medal, etc.",
      placeholderAr: "شهادة، ميدالية، إلخ.",
    },
  ],
  meeting: [
    {
      key: "date",
      labelEn: "Meeting Date",
      labelAr: "تاريخ الاجتماع",
      type: "date",
      placeholderEn: "",
      placeholderAr: "",
    },
    {
      key: "time",
      labelEn: "Meeting Time",
      labelAr: "وقت الاجتماع",
      type: "text",
      placeholderEn: "e.g., 3:00 PM",
      placeholderAr: "مثال: 3:00 م",
    },
    {
      key: "venue",
      labelEn: "Venue",
      labelAr: "المكان",
      type: "text",
      placeholderEn: "e.g., School Auditorium",
      placeholderAr: "مثال: قاعة المدرسة",
    },
    {
      key: "agenda",
      labelEn: "Agenda",
      labelAr: "جدول الأعمال",
      type: "textarea",
      placeholderEn: "List meeting topics...",
      placeholderAr: "اذكر مواضيع الاجتماع...",
    },
    {
      key: "requirements",
      labelEn: "Please Bring",
      labelAr: "يرجى إحضار",
      type: "textarea",
      placeholderEn: "Required documents...",
      placeholderAr: "المستندات المطلوبة...",
    },
  ],
}

export const emojiCategories = {
  school: ["📚", "📖", "📝", "✏️", "", "", "📕", "📗", "", "📙", "🎒", "🎓", "🏫", "✍️", "📐", "📏"],
  time: ["📅", "📆", "⏰", "🕐", "🕑", "🕒", "🕓", "⏳", "⌛"],
  status: ["✅", "❌", "⭐", "🌟", "💯", "👍", "👏", "🎯", "🏆", "🥇", "🥈", "🥉", "🏅"],
  alert: ["⚠️", "❗", "❕", "📢", "📣", "🔔", "💡", "📌", "📍"],
  emotion: ["😊", "🙂", "😃", "🤗", "💪", "🙏", "❤️", "💖", "🎉", "🎊", "✨", "🌈", "🍀", "🤝"],
  arrows: ["➡️", "⬅️", "⬆️", "⬇️", "▶️", "◀️", "🔸", "🔹", "🔺", "🔻"],
  numbers: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"],
  decorative: ["-", "=", "*", "•", "◆", "◇", "○", "●"],
}

export const emojiCategoryLabels = {
  en: {
    school: "School",
    time: "Time",
    status: "Status",
    alert: "Alert",
    emotion: "Emotion",
    arrows: "Arrows",
    numbers: "Numbers",
    decorative: "Decorative",
  },
  ar: {
    school: "مدرسة",
    time: "وقت",
    status: "حالة",
    alert: "تنبيه",
    emotion: "مشاعر",
    arrows: "أسهم",
    numbers: "أرقام",
    decorative: "زخرفة",
  },
}

export const translations = {
  en: {

   
    templateTitle: "Choose Report Type",
    composeTitle: "Fill Report Details",
    previewTitle: "Preview",
    styleOptions: "Style Options",
    addBorders: "Add decorative borders",
    addEmojis: "Enhance with emojis",
    copy: "Copy",
    copied: "Copied!",
    sendWhatsApp: "Send to WhatsApp",
    charCount: "Character count",
    whatsappReady: "WhatsApp ready",
    previewPlaceholder: "Select a template and fill in the details to see your formatted message...",
    emojiPicker: "Add Emoji",
    generateReport: "Generate Report",
    clearForm: "Clear Form",
    templates: {
      todayLesson: "Today's Lesson",
      homework: "Homework",
      examNotice: "Exam Notice",
      announcement: "Announcement",
      achievement: "Achievement",
      meeting: "Meeting",
    },
    footers: {
      todayLesson: "Thank you for your attention!",
      homework: "Complete on time! Good luck!",
      examNotice: "Study well! You can do it!",
      announcement: "Thank you for your cooperation!",
      achievement: "Keep up the great work!",
      meeting: "Your presence is important! See you there!",
    },
  },
  ar: {


    templateTitle: "اختر نوع التقرير",
    composeTitle: "املأ تفاصيل التقرير",
    previewTitle: "المعاينة",
    styleOptions: "خيارات التنسيق",
    addBorders: "إضافة إطارات زخرفية",
    addEmojis: "تعزيز بالرموز التعبيرية",
    copy: "نسخ",
    copied: "تم النسخ!",
    sendWhatsApp: "إرسال للواتساب",
    charCount: "عدد الأحرف",
    whatsappReady: "جاهز للواتساب",
    previewPlaceholder: "اختر قالباً واملأ التفاصيل لترى رسالتك المنسقة...",
    emojiPicker: "إضافة رمز",
    generateReport: "إنشاء التقرير",
    clearForm: "مسح النموذج",
    templates: {
      todayLesson: "درس اليوم",
      homework: "الواجب المنزلي",
      examNotice: "إشعار اختبار",
      announcement: "إعلان",
      achievement: "إنجاز",
      meeting: "اجتماع",
    },
    footers: {
      todayLesson: "شكراً لاهتمامكم!",
      homework: "أكمله في الوقت المحدد! بالتوفيق!",
      examNotice: "ادرس جيداً! يمكنك فعلها!",
      announcement: "شكراً لتعاونكم!",
      achievement: "واصل التميز!",
      meeting: "حضوركم مهم! نراكم هناك!",
    },
  },
}

export function getTranslation(lang: Language) {
  return translations[lang]
}
