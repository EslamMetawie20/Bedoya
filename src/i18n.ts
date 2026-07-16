import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Retrieve stored language or default to Arabic
const savedLanguage = localStorage.getItem('bedaya_lang') || 'ar';
document.documentElement.lang = savedLanguage;
document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';

const resources = {
  en: {
    translation: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.creative_director": "Lead Architect",
      "nav.contact": "Contact",
      
      "hero.title": "Crafting Architectural Icons",
      "hero.subtitle": "Where vision transforms into timeless physical space.",
      "hero.cta": "Explore Portfolio",
      "hero.scroll": "Scroll to Explore",

      "about.badge": "About Bedaya",
      "about.title": "Building Today, Shaping Tomorrow",
      "about.p1": "Bedaya is a premium construction, general contracting, and real estate development company. We deliver integrated engineering solutions starting from conceptualization and planning, moving through execution and supervision, and ending with the hand-over of ultra-high-quality structures that meet our clients' ambitions.",
      "about.p2": "We adhere to the highest international standards of quality and safety. Anchored by our specialized engineering team and extensive field experience, we execute projects with efficiency and absolute professionalism, infusing innovation and sustainability into every single detail.",
      "about.vision.title": "Our Vision",
      "about.vision.text": "To stand among the leading companies in the contracting and real estate development sectors by providing genuine value and enduring quality.",
      "about.mission.title": "Our Mission",
      "about.mission.text": "To execute outstanding projects that achieve client satisfaction and contribute to building a better architectural future.",

      "services.badge": "Our Achievements",
      "services.title": "A Proven Track Record of Excellence",
      "services.s1.title": "Key Projects & Works",
      "services.s1.i1": "Design and execution of the Marina Delta project.",
      "services.s1.i2": "Execution of the Electric Train project.",
      "services.s1.i3": "Execution of the Porto Said project.",
      "services.s1.i4": "Execution of the Fairmont Mall (commercial & residential) project in New Damietta.",
      "services.s1.i5": "Execution of Ministry of Transport projects through direct commissioning.",
      "services.s1.i6": "Design and execution of street development and upgrade projects in Damietta.",
      "services.s2.title": "Our Works in Saudi Arabia",
      "services.s2.i1": "Supervision and engineering follow-up for Al-Andalus Private Schools in Dammam.",
      "services.s2.i2": "Design of 4 schools affiliated with Al-Andalus Private Schools.",
      "services.s2.i3": "Providing engineering designs, municipal procedures, and works in KSA since 2020.",
      "services.s3.title": "Our Team",
      "services.s3.desc": "Bedaya for General Contracting and Real Estate Development comprises an integrated team of highly experienced engineers, consultants, and technicians working together to deliver comprehensive engineering solutions, committing to the highest standards of quality, precision, and professionalism across all design and execution phases.",

      "stats.badge": "Key Milestones",
      "stats.projects": "Completed Renders",
      "stats.experience": "Years of Excellence",
      "stats.ksa": "KSA Major Projects",
      "stats.clients": "Client Satisfaction",

      "director.badge": "Responsible Engineer",
      "director.title": "Lead Architect & Creative Director",
      "director.name": "Yomna Motawe",
      "director.desc": "Leading the architectural vision and spatial strategy of Bedaya. Yomna merges classic luxury proportions with futuristic functional details. With extensive design experience spanning across Egypt and Saudi Arabia, she designs environments that inspire interaction, capture natural light, and stand as statements of modern luxury.",
      "director.behance": "View Behance Portfolio",

      "projects.badge": "Portfolio",
      "projects.title": "Featured Case Studies",
      "projects.all": "All Spaces",
      "projects.interior": "Interior Design",
      "projects.architecture": "Architecture & Exterior",
      "projects.entertainment": "Entertainment Design",
      "projects.view_details": "View Case Study",

      "project_detail.details": "Project Specifications",
      "project_detail.area": "Built Area",
      "project_detail.location": "Location",
      "project_detail.year": "Year Completed",
      "project_detail.architect": "Lead Architect",
      "project_detail.plans": "Architectural Drawings & Layouts",
      "project_detail.gallery": "Interactive Render Gallery",
      "project_detail.back": "Back to Projects",
      "project_detail.next": "Next Project",
      "project_detail.prev": "Previous Project",
      "project_detail.lightbox_close": "Close",

      "contact.badge": "Inquiries",
      "contact.title": "Let's Shape Your Vision",
      "contact.subtitle": "Whether you are planning a high-end private residence, a luxury commercial facade, or looking for development partners, our specialized team is ready to guide you.",
      "contact.btn": "Get in Touch",
      "contact.info": "Contact Details",
      "contact.phone": "Phone",
      "contact.email": "Email",
      "contact.address": "Address",
      "contact.address.val": "Damietta, New Damietta City, Egypt",

      "footer.rights": "All rights reserved. Designed for luxury.",
      "footer.tagline": "We build today to make the future."
    }
  },
  ar: {
    translation: {
      "nav.home": "الرئيسية",
      "nav.projects": "المشاريع",
      "nav.about": "عن بداية",
      "nav.services": "الخدمات",
      "nav.creative_director": "المهندس المسؤول",
      "nav.contact": "اتصل بنا",
      
      "hero.title": "صياغة أيقونات معمارية",
      "hero.subtitle": "حيث تتحول الرؤية إلى واقع وكتل هندسية خالدة.",
      "hero.cta": "استكشف أعمالنا",
      "hero.scroll": "اسحب لأسفل للاستكشاف",

      "about.badge": "عن شركة بداية",
      "about.title": "نبني اليوم لنصنع المستقبل",
      "about.p1": "شركة بداية للمقاولات العامة والتطوير العقاري هي شركة رائدة تقدم حلولاً هندسية متكاملة تبدأ من الفكرة والتخطيط، مروراً بالتنفيذ والإشراف، وصولاً إلى تسليم مشاريع عالية الجودة تلبي تطلعات عملائنا الأكثر تميزاً.",
      "about.p2": "نلتزم بأعلى معايير الجودة والسلامة المعمارية، ونعتمد على فريق هندسي متخصص وخبرة عملية واسعة لضمان تنفيذ المشاريع بكفاءة واحترافية مطلقة، مع الحرص على الابتكار والاستدامة في كل خطوة نخطوها.",
      "about.vision.title": "رؤيتنا",
      "about.vision.text": "أن نكون من الشركات الرائدة في قطاع المقاولات والتطوير العقاري من خلال تقديم قيمة حقيقية وجودة تدوم للأجيال.",
      "about.mission.title": "رسالتنا",
      "about.mission.text": "تنفيذ مشاريع متميزة تحقق رضا العملاء، وتساهم بشكل فعال في بناء مستقبل عمراني وحضري أفضل.",

      "services.badge": "إنجازاتنا",
      "services.title": "سجل حافل من التميز والخبرة",
      "services.s1.title": "أبرز أعمالنا",
      "services.s1.i1": "تصميم وتنفيذ مشروع مارينا دلتا.",
      "services.s1.i2": "تنفيذ مشروع القطار الكهربائي.",
      "services.s1.i3": "تنفيذ مشروع بورتو سعيد.",
      "services.s1.i4": "تنفيذ مشروع فيرمونت مول (تجاري وسكني) بمدينة دمياط الجديدة.",
      "services.s1.i5": "تنفيذ مشروعات تابعة لوزارة النقل بإسناد مباشر من الوزارة.",
      "services.s1.i6": "تصميم وتنفيذ مشروعات تطوير الشوارع بمدينة دمياط.",
      "services.s2.title": "أعمالنا بالمملكة العربية السعودية",
      "services.s2.i1": "الإشراف ومتابعة الأعمال الهندسية لمدارس الأندلس الأهلية بمدينة الدمام.",
      "services.s2.i2": "تصميم 4 مدارس تابعة لمدارس الأندلس الأهلية.",
      "services.s2.i3": "تقديم التصميمات الهندسية ومتابعة الإجراءات والأعمال البلدية بالمملكة العربية السعودية منذ عام 2020.",
      "services.s3.title": "فريق العمل",
      "services.s3.desc": "تضم شركة بداية للمقاولات العامة والتطوير العقاري فريقًا متكاملًا من المهندسين والاستشاريين والفنيين ذوي الخبرة، يعملون بروح الفريق الواحد لتقديم حلول هندسية متكاملة، مع الالتزام بأعلى معايير الجودة والدقة والاحترافية في جميع مراحل التصميم والتنفيذ.",

      "stats.badge": "أرقامنا",
      "stats.projects": "مخططات ومشاريع منفذة",
      "stats.experience": "سنوات من التميز",
      "stats.ksa": "مشاريع بالمملكة العربية السعودية",
      "stats.clients": "رضا عملائنا",

      "director.badge": "المهندس المسؤول",
      "director.title": "المهندس المعماري والمدير الإبداعي",
      "director.name": "يمنى مطاوع",
      "director.desc": "تقود الرؤية المعمارية والاستراتيجية الفراغية في شركة بداية. تجمع المهندسة يمنى بين النسب الكلاسيكية الفاخرة والتفاصيل الوظيفية المستقبلية. بخبرة تصميمية واسعة تمتد عبر مصر والمملكة العربية السعودية، تصمم بيئات تلهم التفاعل، وتقتنص الضوء الطبيعي، وتجسد أعلى معايير الرفاهية المعمارية.",
      "director.behance": "تصفح معرض الأعمال على Behance",

      "projects.badge": "معرض الأعمال",
      "projects.title": "مشاريع تميزنا بها",
      "projects.all": "جميع المساحات",
      "projects.interior": "التصميم الداخلي",
      "projects.architecture": "العمارة والتصميم الخارجي",
      "projects.entertainment": "التصميم الترفيهي والسينمائي",
      "projects.view_details": "عرض دراسة الحالة",

      "project_detail.details": "تفاصيل المشروع ومواصفاته",
      "project_detail.area": "المساحة الإجمالية",
      "project_detail.location": "الموقع الجغرافي",
      "project_detail.year": "عام التسليم",
      "project_detail.architect": "المهندس المسؤول",
      "project_detail.plans": "المخططات الهندسية والمساقط الأفقية",
      "project_detail.gallery": "معرض المحاكاة ثلاثية الأبعاد (Renders)",
      "project_detail.back": "العودة إلى المشاريع",
      "project_detail.next": "المشروع التالي",
      "project_detail.prev": "المشروع السابق",
      "project_detail.lightbox_close": "إغلاق",

      "contact.badge": "الاستفسارات",
      "contact.title": "دعنا نصنع رؤيتك واقعًا",
      "contact.subtitle": "سواء كنت تخطط لفيلا سكنية فاخرة، أو واجهة تجارية راقية، أو تبحث عن شركاء تطوير، فإن فريقنا الهندسي المتخصص مستعد لإرشادك في كل خطوة.",
      "contact.btn": "تواصل معنا الآن",
      "contact.info": "بيانات الاتصال",
      "contact.phone": "رقم الهاتف",
      "contact.email": "البريد الإلكتروني",
      "contact.address": "العنوان",
      "contact.address.val": "دمياط، مدينة دمياط الجديدة، جمهورية مصر العربية",

      "footer.rights": "جميع الحقوق محفوظة. صُمم ليعكس الفخامة.",
      "footer.tagline": "بداية... نبني اليوم لنصنع المستقبل."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
