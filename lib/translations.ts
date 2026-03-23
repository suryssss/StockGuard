export type LanguageCode = 'en' | 'te' | 'hi' | 'mr' | 'ta' | 'kn'

export interface LanguageOption {
  code: LanguageCode
  name: string
  nativeName: string
  flag: string
  greeting: string
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', greeting: 'Hello!' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', greeting: 'నమస్కారం!' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', greeting: 'नमस्ते!' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', greeting: 'नमस्कार!' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', greeting: 'வணக்கம்!' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', greeting: 'ನಮಸ್ಕಾರ!' },
]

export type TranslationKeys = {
  // Common
  appName: string
  appTagline: string
  poweredBy: string

  // Greetings
  goodMorning: string
  goodAfternoon: string
  goodEvening: string

  // Dashboard
  dashboard: string
  dashboardTitle: string
  lastUpdated: string
  lossCalculator: string
  quickActions: string
  overview: string
  totalStock: string
  soldToday: string
  lowStock: string
  restockAlert: string

  // Navigation
  menu: string
  products: string
  sales: string
  distributors: string
  alerts: string
  settings: string
  profile: string
  signOut: string

  // Shop
  shopInfo: string
  whatsappActive: string

  // Login
  welcomeBack: string
  signInSubtitle: string
  email: string
  password: string
  signIn: string
  signingIn: string
  noAccount: string
  register: string
  emailPlaceholder: string

  // Language Modal
  chooseLanguage: string
  chooseLanguageSubtitle: string
  continueBtn: string
  recommended: string
  youCanChange: string

  // Batch Table
  batchTable: string
  productName: string
  quantity: string
  expiryDate: string
  daysLeft: string
  status: string
  expired: string
  critical: string
  warning: string
  safe: string
  noProducts: string

  // Actions
  scanBarcode: string
  uploadInvoice: string
  checkExpiry: string
  sendSummary: string
  sendToWhatsApp: string

  // Distributor
  distributorScore: string
  totalReturns: string
  accepted: string
  rejected: string
  escalation: string
  noDistributors: string

  // Restock
  restockAlerts: string
  restockMessage: string

  // Loss Calculator
  atRisk: string
  recovered: string
  lost: string
  atRiskItems: string

  // Invoice
  invoiceUpload: string
  invoiceDesc: string
  uploading: string
  upload: string

  // Settings
  settingsTitle: string
  contactDetails: string
  contactSubtitle: string
  whatsappNumber: string
  updateNumber: string
  notificationSystem: string
  notificationSubtitle: string
  verificationTools: string
  verificationDesc: string
  sendConnectivityTest: string
  sendExpiryReport: string
  sendDailySummary: string
  confirmed: string
  actionResult: string
  securityAccess: string
  securitySubtitle: string
  twoFactor: string
  enabled: string

  // Widgets
  avgSavedYear: string
  setupTime: string
  alertsOnPhone: string

  // Summary Button
  sendSummaryDesc: string
  generating: string

  // Batch Table - Section headers
  expiredItems: string
  criticalBatches: string
  activeInventory: string
  batchExpired: string
  batchesCritical: string
  activeBatchCount: string
  atRiskValue: string

  // Batch Table - Labels
  batch: string
  qty: string
  expiredDaysAgo: string
  expiresIn: string
  loss: string
  value: string
  product: string
  removeBtn: string
  sellBtn: string
  noBatchesFound: string
  allBatchesCritical: string
  removeExpiredTip: string
  searchProduct: string

  // Expiry Badge
  expiredBadge: string
  removeNow: string
  expiringSoon: string
  returnNow: string
  alertSoon: string
  safeBadge: string

  // Sidebar
  appNameHindi: string
  language: string
  activeSeller: string

  // Settings
  changeLanguage: string
  chooseAppLanguage: string
  alwaysIncludeCountry: string

  // Signup
  createAccount: string
  setupShopMinutes: string
  whatsappAlertsExpiring: string
  scanBarcodeInvoice: string
  trackLossRecover: string
  builtForShops: string
  shopNameLabel: string
  whatsappNumberLabel: string
  includeCountryCode: string
  passwordLabel: string
  confirmLabel: string
  creatingAccount: string
  accountCreated: string
  redirecting: string
  checkEmailConfirmation: string
  goToLogin: string
  alreadyHaveAccount: string

  // Restock
  restockItems: string
  restockNotify: string
  restockSending: string
  restockSent: string
  restockFailed: string
  restockVoice: string
  restockVoicePlaceholder: string
  restockListening: string
  restockStopListening: string
  minStock: string
}

export const translations: Record<LanguageCode, TranslationKeys> = {
  en: {
    appName: 'StockGuard',
    appTagline: 'Never lose money to expired stock again. Track, alert, and recover — built for Indian retailers.',
    poweredBy: 'Powered by Supabase · Built for Indian Retailers 🇮🇳',
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    dashboard: 'Dashboard',
    dashboardTitle: 'StockGuard Dashboard',
    lastUpdated: 'Last updated',
    lossCalculator: '💰 Loss Calculator',
    quickActions: '⚡ Quick Actions',
    overview: '📊 Overview',
    totalStock: 'Total Stock',
    soldToday: 'Sold Today',
    lowStock: 'Low Stock',
    restockAlert: 'Restock Alert',
    menu: 'Menu',
    products: 'Products',
    sales: 'Sales',
    distributors: 'Distributors',
    alerts: 'Alerts',
    settings: 'Settings',
    profile: 'Profile',
    signOut: 'Sign Out',
    shopInfo: 'Ram Medical Store',
    whatsappActive: 'WhatsApp alerts active ✅',
    welcomeBack: 'Welcome back',
    signInSubtitle: 'Sign in to manage your inventory',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing in...',
    noAccount: "Don't have an account?",
    register: 'Register',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'Choose Your Language',
    chooseLanguageSubtitle: 'Select your preferred language for the app',
    continueBtn: 'Continue',
    recommended: 'Recommended',
    youCanChange: 'You can change this later in Settings',
    batchTable: '📦 Batch Inventory',
    productName: 'Product Name',
    quantity: 'Quantity',
    expiryDate: 'Expiry Date',
    daysLeft: 'Days Left',
    status: 'Status',
    expired: 'Expired',
    critical: 'Critical',
    warning: 'Warning',
    safe: 'Safe',
    noProducts: 'No products found',
    scanBarcode: 'Scan Barcode',
    uploadInvoice: 'Upload Invoice',
    checkExpiry: 'Check Expiry',
    sendSummary: 'Send Summary',
    sendToWhatsApp: 'Send Daily Summary via WhatsApp',
    distributorScore: '🏪 Distributor Score',
    totalReturns: 'Total Returns',
    accepted: 'Accepted',
    rejected: 'Rejected',
    escalation: 'Escalation',
    noDistributors: 'No distributors found',
    restockAlerts: '🔔 Restock Alerts',
    restockMessage: 'units left (Threshold:',
    atRisk: 'At Risk',
    recovered: 'Recovered',
    lost: 'Lost',
    atRiskItems: 'items at risk',
    invoiceUpload: '📄 Invoice Upload',
    invoiceDesc: 'Upload invoices to auto-add products',
    uploading: 'Uploading...',
    upload: 'Upload',
    settingsTitle: 'Settings',
    contactDetails: 'Contact Details',
    contactSubtitle: 'Update where you receive your security alerts',
    whatsappNumber: 'WhatsApp / SMS Number',
    updateNumber: 'Update Number',
    notificationSystem: 'Notification System',
    notificationSubtitle: 'Verify and run manual expiry checks',
    verificationTools: 'Verification Tools',
    verificationDesc: 'Use these to demo the platform connectivity or verify your phone setup.',
    sendConnectivityTest: 'Send Connectivity Test',
    sendExpiryReport: 'Send Expiry Report',
    sendDailySummary: 'Send Daily Summary',
    confirmed: 'Confirmed',
    actionResult: 'Action Result',
    securityAccess: 'Security & Access',
    securitySubtitle: 'Security preferences for this demo account',
    twoFactor: 'Two-Factor Authentication (2FA)',
    enabled: 'Enabled',
    avgSavedYear: 'Avg. saved/year',
    setupTime: 'Setup time',
    alertsOnPhone: 'Alerts on phone',
    sendSummaryDesc: 'Get a complete daily summary on WhatsApp',
    generating: 'Generating...',

    expiredItems: 'Expired Items',
    criticalBatches: 'Critical Batches',
    activeInventory: 'Active Inventory',
    batchExpired: 'batch expired',
    batchesCritical: 'batch expiring within 15 days',
    activeBatchCount: 'active batches',
    atRiskValue: 'at risk',

    batch: 'Batch',
    qty: 'Qty',
    expiredDaysAgo: 'days ago',
    expiresIn: 'Expires in',
    loss: 'Loss',
    value: 'Value',
    product: 'Product',
    removeBtn: 'Remove',
    sellBtn: 'Sell',
    noBatchesFound: 'No batches found',
    allBatchesCritical: 'All batches are either expired or critical',
    removeExpiredTip: 'Remove all expired items to keep your inventory clean',
    searchProduct: 'Search product...',

    expiredBadge: 'EXPIRED',
    removeNow: 'REMOVE NOW',
    expiringSoon: 'EXPIRING SOON',
    returnNow: 'RETURN NOW',
    alertSoon: 'ALERT SOON',
    safeBadge: 'SAFE',

    appNameHindi: '',
    language: 'Language',
    activeSeller: 'Active Seller',

    changeLanguage: 'Change Language',
    chooseAppLanguage: 'Choose your preferred app language',
    alwaysIncludeCountry: 'Always include country code (e.g. +91). Messages will be sent here.',

    createAccount: 'Create Account',
    setupShopMinutes: 'Set up your shop in minutes',
    whatsappAlertsExpiring: 'WhatsApp alerts for expiring stock',
    scanBarcodeInvoice: 'Scan barcode or photograph invoice',
    trackLossRecover: 'Track losses and recover returns',
    builtForShops: 'Built for kirana & medical shops',
    shopNameLabel: 'Shop Name',
    whatsappNumberLabel: 'WhatsApp Number',
    includeCountryCode: 'Include country code (+91)',
    passwordLabel: 'Password',
    confirmLabel: 'Confirm',
    creatingAccount: 'Creating account...',
    accountCreated: 'Account Created!',
    redirecting: 'Redirecting to dashboard...',
    checkEmailConfirmation: 'If not redirected, check your email for confirmation.',
    goToLogin: 'Go to Login',
    alreadyHaveAccount: 'Already have an account?',

    restockItems: 'Restock Items',
    restockNotify: 'Notify Distributor',
    restockSending: 'Sending notification...',
    restockSent: 'Notification sent to distributor!',
    restockFailed: 'Failed to send notification',
    restockVoice: 'Voice Restock',
    restockVoicePlaceholder: 'Say: "Restock 20 rice packets"',
    restockListening: 'Listening...',
    restockStopListening: 'Stop Listening',
    minStock: 'Min',
  },

  te: {
    appName: 'స్టాక్‌గార్డ్',
    appTagline: 'గడువు ముగిసిన స్టాక్ వల్ల మళ్ళీ డబ్బు కోల్పోకండి. ట్రాక్ చేయండి, అలర్ట్ చేయండి మరియు రికవర్ చేయండి.',
    poweredBy: 'Supabase ద్వారా · భారతీయ రిటైలర్ల కోసం 🇮🇳',
    goodMorning: 'శుభోదయం',
    goodAfternoon: 'శుభ మధ్యాహ్నం',
    goodEvening: 'శుభ సాయంత్రం',
    dashboard: 'డాష్‌బోర్డ్',
    dashboardTitle: 'స్టాక్‌గార్డ్ డాష్‌బోర్డ్',
    lastUpdated: 'చివరగా అప్‌డేట్',
    lossCalculator: '💰 నష్ట కాలిక్యులేటర్',
    quickActions: '⚡ త్వరిత చర్యలు',
    overview: '📊 అవలోకనం',
    totalStock: 'మొత్తం స్టాక్',
    soldToday: 'ఈరోజు అమ్మకాలు',
    lowStock: 'తక్కువ స్టాక్',
    restockAlert: 'రీస్టాక్ అలర్ట్',
    menu: 'మెను',
    products: 'ఉత్పత్తులు',
    sales: 'అమ్మకాలు',
    distributors: 'పంపిణీదారులు',
    alerts: 'అలర్ట్‌లు',
    settings: 'సెట్టింగ్‌లు',
    profile: 'ప్రొఫైల్',
    signOut: 'సైన్ అవుట్',
    shopInfo: 'రామ్ మెడికల్ స్టోర్',
    whatsappActive: 'WhatsApp అలర్ట్‌లు చురుకుగా ✅',
    welcomeBack: 'తిరిగి స్వాగతం',
    signInSubtitle: 'మీ ఇన్వెంటరీ నిర్వహించడానికి సైన్ ఇన్ చేయండి',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    signIn: 'సైన్ ఇన్',
    signingIn: 'సైన్ ఇన్ అవుతోంది...',
    noAccount: 'ఖాతా లేదా?',
    register: 'నమోదు చేయండి',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'మీ భాషను ఎంచుకోండి',
    chooseLanguageSubtitle: 'యాప్ కోసం మీకు ఇష్టమైన భాషను ఎంచుకోండి',
    continueBtn: 'కొనసాగించండి',
    recommended: 'సిఫార్సు చేయబడింది',
    youCanChange: 'మీరు సెట్టింగ్‌లలో దీన్ని తర్వాత మార్చవచ్చు',
    batchTable: '📦 బ్యాచ్ ఇన్వెంటరీ',
    productName: 'ఉత్పత్తి పేరు',
    quantity: 'పరిమాణం',
    expiryDate: 'గడువు తేదీ',
    daysLeft: 'మిగిలిన రోజులు',
    status: 'స్థితి',
    expired: 'గడువు ముగిసింది',
    critical: 'క్రిటికల్',
    warning: 'హెచ్చరిక',
    safe: 'సురక్షితం',
    noProducts: 'ఉత్పత్తులు కనుగొనబడలేదు',
    scanBarcode: 'బార్‌కోడ్ స్కాన్',
    uploadInvoice: 'ఇన్వాయిస్ అప్‌లోడ్',
    checkExpiry: 'గడువు తనిఖీ',
    sendSummary: 'సారాంశం పంపండి',
    sendToWhatsApp: 'WhatsApp ద్వారా రోజువారీ సారాంశం పంపండి',
    distributorScore: '🏪 పంపిణీదారు స్కోర్',
    totalReturns: 'మొత్తం రిటర్న్‌లు',
    accepted: 'ఆమోదించబడింది',
    rejected: 'తిరస్కరించబడింది',
    escalation: 'ఎస్కలేషన్',
    noDistributors: 'పంపిణీదారులు కనుగొనబడలేదు',
    restockAlerts: '🔔 రీస్టాక్ అలర్ట్‌లు',
    restockMessage: 'యూనిట్లు మిగిలి ఉన్నాయి (థ్రెషోల్డ్:',
    atRisk: 'ప్రమాదంలో',
    recovered: 'రికవరీ',
    lost: 'నష్టం',
    atRiskItems: 'ప్రమాదంలో ఉన్నవి',
    invoiceUpload: '📄 ఇన్వాయిస్ అప్‌లోడ్',
    invoiceDesc: 'ఉత్పత్తులను ఆటో-యాడ్ చేయడానికి ఇన్వాయిస్‌లు అప్‌లోడ్ చేయండి',
    uploading: 'అప్‌లోడ్ అవుతోంది...',
    upload: 'అప్‌లోడ్',
    settingsTitle: 'సెట్టింగ్‌లు',
    contactDetails: 'సంప్రదింపు వివరాలు',
    contactSubtitle: 'మీ భద్రతా అలర్ట్‌లను ఎక్కడ అందుకోవాలో అప్‌డేట్ చేయండి',
    whatsappNumber: 'WhatsApp / SMS నంబర్',
    updateNumber: 'నంబర్ అప్‌డేట్',
    notificationSystem: 'నోటిఫికేషన్ సిస్టమ్',
    notificationSubtitle: 'మాన్యువల్ గడువు తనిఖీలను ధృవీకరించండి మరియు అమలు చేయండి',
    verificationTools: 'ధృవీకరణ సాధనాలు',
    verificationDesc: 'ప్లాట్‌ఫారమ్ కనెక్టివిటీని డెమో చేయడానికి లేదా మీ ఫోన్ సెటప్‌ను ధృవీకరించడానికి వీటిని ఉపయోగించండి.',
    sendConnectivityTest: 'కనెక్టివిటీ టెస్ట్ పంపండి',
    sendExpiryReport: 'గడువు రిపోర్ట్ పంపండి',
    sendDailySummary: 'రోజువారీ సారాంశం పంపండి',
    confirmed: 'ధృవీకరించబడింది',
    actionResult: 'చర్య ఫలితం',
    securityAccess: 'భద్రత & ప్రాప్యత',
    securitySubtitle: 'ఈ డెమో ఖాతా కోసం భద్రతా ప్రాధాన్యతలు',
    twoFactor: 'టూ-ఫ్యాక్టర్ ఆథెంటికేషన్ (2FA)',
    enabled: 'ఎనేబుల్డ్',
    avgSavedYear: 'ఏటా ఆదా',
    setupTime: 'సెటప్ సమయం',
    alertsOnPhone: 'ఫోన్‌లో అలర్ట్‌లు',
    sendSummaryDesc: 'WhatsApp లో పూర్తి రోజువారీ సారాంశం పొందండి',
    generating: 'జనరేట్ అవుతోంది...',

    expiredItems: 'గడువు ముగిసిన వస్తువులు',
    criticalBatches: 'క్రిటికల్ బ్యాచ్‌లు',
    activeInventory: 'సక్రియ ఇన్వెంటరీ',
    batchExpired: 'బ్యాచ్ గడువు ముగిసింది',
    batchesCritical: 'బ్యాచ్ 15 రోజుల్లో గడువు ముగుస్తోంది',
    activeBatchCount: 'సక్రియ బ్యాచ్‌లు',
    atRiskValue: 'ప్రమాదంలో',
    batch: 'బ్యాచ్',
    qty: 'పరిమాణం',
    expiredDaysAgo: 'రోజుల క్రితం',
    expiresIn: 'గడువు',
    loss: 'నష్టం',
    value: 'విలువ',
    product: 'ఉత్పత్తి',
    removeBtn: 'తొలగించు',
    sellBtn: 'అమ్మండి',
    noBatchesFound: 'బ్యాచ్‌లు కనుగొనబడలేదు',
    allBatchesCritical: 'అన్ని బ్యాచ్‌లు గడువు ముగిసినవి లేదా క్రిటికల్',
    removeExpiredTip: 'ఇన్వెంటరీ శుభ్రంగా ఉంచడానికి గడువు ముగిసిన వస్తువులను తొలగించండి',
    searchProduct: 'ఉత్పత్తి వెతకండి...',
    expiredBadge: 'గడువు ముగిసింది',
    removeNow: 'ఇప్పుడు తొలగించు',
    expiringSoon: 'త్వరలో గడువు',
    returnNow: 'ఇప్పుడు రిటర్న్',
    alertSoon: 'త్వరలో అలర్ట్',
    safeBadge: 'సురక్షితం',
    appNameHindi: '',
    language: 'భాష',
    activeSeller: 'చురుకైన విక్రేత',
    changeLanguage: 'భాషను మార్చండి',
    chooseAppLanguage: 'యాప్ కోసం మీకు ఇష్టమైన భాషను ఎంచుకోండి',
    alwaysIncludeCountry: 'ఎల్లప్పుడూ దేశ కోడ్ చేర్చండి (ఉదా. +91)',
    createAccount: 'ఖాతా సృష్టించండి',
    setupShopMinutes: 'నిమిషాలలో మీ షాప్ సెటప్ చేయండి',
    whatsappAlertsExpiring: 'గడువు ముగుస్తున్న స్టాక్ కోసం WhatsApp అలర్ట్‌లు',
    scanBarcodeInvoice: 'బార్‌కోడ్ స్కాన్ లేదా ఇన్వాయిస్ ఫోటో',
    trackLossRecover: 'నష్టాలను ట్రాక్ చేసి రిటర్న్‌లు తిరిగి పొందండి',
    builtForShops: 'కిరాణా & మెడికల్ షాపులకు',
    shopNameLabel: 'షాపు పేరు',
    whatsappNumberLabel: 'WhatsApp నంబర్',
    includeCountryCode: 'దేశ కోడ్ చేర్చండి (+91)',
    passwordLabel: 'పాస్‌వర్డ్',
    confirmLabel: 'నిర్ధారించు',
    creatingAccount: 'ఖాతా సృష్టిస్తోంది...',
    accountCreated: 'ఖాతా సృష్టించబడింది!',
    redirecting: 'డాష్‌బోర్డ్‌కి వెళ్తోంది...',
    checkEmailConfirmation: 'రీడైరెక్ట్ కాకపोత్ ఇమెయిల్ చూడండి.',
    goToLogin: 'లాగిన్‌కి వెళ్ళండి',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    restockItems: 'రీస్టాక్ ఐటమ్స్',
    restockNotify: 'పంపిణీదారుకు తెలియజేయండి',
    restockSending: 'నోటిఫికేషన్ పంపుతోంది...',
    restockSent: 'పంపిణీదారుకు నోటిఫికేషన్ పంపబడింది!',
    restockFailed: 'నోటిఫికేషన్ పంపడం విఫలమైంది',
    restockVoice: 'వాయిస్ రీస్టాక్',
    restockVoicePlaceholder: 'చెప్పండి: "20 బియ్యం ప్యాకెట్లు రీస్టాక్"',
    restockListening: 'వింటోంది...',
    restockStopListening: 'వినడం ఆపండి',
    minStock: 'కనిష్ట',
  },

  hi: {
    appName: 'स्टॉक गार्ड',
    appTagline: 'एक्सपायर्ड स्टॉक से पैसे कभी ना गंवाएं। ट्रैक करें, अलर्ट पाएं और रिकवर करें।',
    poweredBy: 'Supabase द्वारा · भारतीय दुकानदारों के लिए 🇮🇳',
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'नमस्कार',
    goodEvening: 'शुभ संध्या',
    dashboard: 'डैशबोर्ड',
    dashboardTitle: 'स्टॉक गार्ड डैशबोर्ड',
    lastUpdated: 'अंतिम अपडेट',
    lossCalculator: '💰 नुकसान कैलकुलेटर',
    quickActions: '⚡ त्वरित क्रियाएं',
    overview: '📊 अवलोकन',
    totalStock: 'कुल स्टॉक',
    soldToday: 'आज बेचा',
    lowStock: 'कम स्टॉक',
    restockAlert: 'रीस्टॉक अलर्ट',
    menu: 'मेन्यू',
    products: 'उत्पाद',
    sales: 'बिक्री',
    distributors: 'वितरक',
    alerts: 'अलर्ट',
    settings: 'सेटिंग्स',
    profile: 'प्रोफ़ाइल',
    signOut: 'लॉग आउट',
    shopInfo: 'राम मेडिकल स्टोर',
    whatsappActive: 'WhatsApp अलर्ट चालू ✅',
    welcomeBack: 'वापस स्वागत है',
    signInSubtitle: 'अपनी इन्वेंटरी प्रबंधित करने के लिए साइन इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signingIn: 'साइन इन हो रहा है...',
    noAccount: 'खाता नहीं है?',
    register: 'रजिस्टर करें',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'अपनी भाषा चुनें',
    chooseLanguageSubtitle: 'ऐप के लिए अपनी पसंदीदा भाषा चुनें',
    continueBtn: 'जारी रखें',
    recommended: 'सुझावित',
    youCanChange: 'आप बाद में सेटिंग्स में बदल सकते हैं',
    batchTable: '📦 बैच इन्वेंटरी',
    productName: 'उत्पाद का नाम',
    quantity: 'मात्रा',
    expiryDate: 'समाप्ति तिथि',
    daysLeft: 'शेष दिन',
    status: 'स्थिति',
    expired: 'समाप्त',
    critical: 'गंभीर',
    warning: 'चेतावनी',
    safe: 'सुरक्षित',
    noProducts: 'कोई उत्पाद नहीं मिला',
    scanBarcode: 'बारकोड स्कैन',
    uploadInvoice: 'इनवॉइस अपलोड',
    checkExpiry: 'एक्सपायरी जांच',
    sendSummary: 'सारांश भेजें',
    sendToWhatsApp: 'WhatsApp पर दैनिक सारांश भेजें',
    distributorScore: '🏪 वितरक स्कोर',
    totalReturns: 'कुल रिटर्न',
    accepted: 'स्वीकृत',
    rejected: 'अस्वीकृत',
    escalation: 'एस्केलेशन',
    noDistributors: 'कोई वितरक नहीं मिला',
    restockAlerts: '🔔 रीस्टॉक अलर्ट',
    restockMessage: 'यूनिट बाकी (सीमा:',
    atRisk: 'जोखिम में',
    recovered: 'वापस प्राप्त',
    lost: 'नुकसान',
    atRiskItems: 'आइटम जोखिम में',
    invoiceUpload: '📄 इनवॉइस अपलोड',
    invoiceDesc: 'उत्पाद ऑटो-ऐड करने के लिए इनवॉइस अपलोड करें',
    uploading: 'अपलोड हो रहा है...',
    upload: 'अपलोड',
    settingsTitle: 'सेटिंग्स',
    contactDetails: 'संपर्क विवरण',
    contactSubtitle: 'अपने सुरक्षा अलर्ट कहाँ प्राप्त करें अपडेट करें',
    whatsappNumber: 'WhatsApp / SMS नंबर',
    updateNumber: 'नंबर अपडेट',
    notificationSystem: 'नोटिफिकेशन सिस्टम',
    notificationSubtitle: 'मैनुअल एक्सपायरी जांच सत्यापित और चलाएं',
    verificationTools: 'सत्यापन उपकरण',
    verificationDesc: 'प्लेटफ़ॉर्म कनेक्टिविटी का डेमो करने या अपने फ़ोन सेटअप को सत्यापित करने के लिए इनका उपयोग करें।',
    sendConnectivityTest: 'कनेक्टिविटी टेस्ट भेजें',
    sendExpiryReport: 'एक्सपायरी रिपोर्ट भेजें',
    sendDailySummary: 'दैनिक सारांश भेजें',
    confirmed: 'पुष्टि हुई',
    actionResult: 'कार्य परिणाम',
    securityAccess: 'सुरक्षा और पहुँच',
    securitySubtitle: 'इस डेमो खाते की सुरक्षा प्राथमिकताएँ',
    twoFactor: 'टू-फ़ैक्टर ऑथेंटिकेशन (2FA)',
    enabled: 'सक्रिय',
    avgSavedYear: 'वार्षिक बचत',
    setupTime: 'सेटअप समय',
    alertsOnPhone: 'फ़ोन पर अलर्ट',
    sendSummaryDesc: 'WhatsApp पर पूर्ण दैनिक सारांश प्राप्त करें',
    generating: 'तैयार हो रहा है...',

    expiredItems: 'एक्सपायर्ड सामान',
    criticalBatches: 'गंभीर बैच',
    activeInventory: 'सक्रिय इन्वेंटरी',
    batchExpired: 'बैच एक्सपायर्ड',
    batchesCritical: 'बैच 15 दिनों में एक्सपायर हो रहे हैं',
    activeBatchCount: 'सक्रिय बैच',
    atRiskValue: 'जोखिम में',

    batch: 'बैच',
    qty: 'मात्रा',
    expiredDaysAgo: 'दिन पहले',
    expiresIn: 'एक्सपायरी',
    loss: 'नुकसान',
    value: 'मूल्य',
    product: 'उत्पाद',
    removeBtn: 'हटाएं',
    sellBtn: 'बेचें',
    noBatchesFound: 'कोई बैच नहीं मिला',
    allBatchesCritical: 'सभी बैच या तो एक्सपायर्ड हैं या गंभीर हैं',
    removeExpiredTip: 'इन्वेंटरी साफ रखने के लिए सभी एक्सपायर्ड सामान हटाएं',
    searchProduct: 'उत्पाद खोजें...',

    expiredBadge: 'एक्सपायर्ड',
    removeNow: 'अभी हटाएं',
    expiringSoon: 'जल्द एक्सपायर',
    returnNow: 'अभी वापस करें',
    alertSoon: 'जल्द अलर्ट',
    safeBadge: 'सुरक्षित',

    appNameHindi: 'स्टॉक गार्ड',
    language: 'भाषा',
    activeSeller: 'सक्रिय विक्रेता',

    changeLanguage: 'भाषा बदलें',
    chooseAppLanguage: 'ऐप के लिए अपनी पसंदीदा भाषा चुनें',
    alwaysIncludeCountry: 'हमेशा देश कोड शामिल करें (जैसे +91)। संदेश यहां भेजे जाएंगे।',

    createAccount: 'खाता बनाएं',
    setupShopMinutes: 'मिनटों में अपनी दुकान शुरू करें',
    whatsappAlertsExpiring: 'एक्सपायरी स्टॉक के लिए WhatsApp अलर्ट',
    scanBarcodeInvoice: 'बारकोड स्कैन या इनवॉइस फोटो',
    trackLossRecover: 'नुकसान ट्रैक करें और रिटर्न वापस पाएं',
    builtForShops: 'किराना और मेडिकल दुकानों के लिए',
    shopNameLabel: 'दुकान का नाम',
    whatsappNumberLabel: 'WhatsApp नंबर',
    includeCountryCode: 'देश कोड शामिल करें (+91)',
    passwordLabel: 'पासवर्ड',
    confirmLabel: 'पुष्टि',
    creatingAccount: 'खाता बन रहा है...',
    accountCreated: 'खाता बन गया!',
    redirecting: 'डैशबोर्ड पर जा रहे हैं...',
    checkEmailConfirmation: 'अगर रीडायरेक्ट नहीं हो, तो ईमेल जांचें।',
    goToLogin: 'लॉगिन पर जाएं',
    alreadyHaveAccount: 'पहले से खाता है?',

    restockItems: 'रीस्टॉक आइटम',
    restockNotify: 'वितरक को सूचित करें',
    restockSending: 'सूचना भेजी जा रही है...',
    restockSent: 'वितरक को सूचना भेज दी गई!',
    restockFailed: 'सूचना भेजने में विफल',
    restockVoice: 'वॉइस रीस्टॉक',
    restockVoicePlaceholder: 'बोलें: "20 चावल पैकेट रीस्टॉक करें"',
    restockListening: 'सुन रहा है...',
    restockStopListening: 'सुनना बंद करें',
    minStock: 'न्यूनतम',
  },

  mr: {
    appName: 'स्टॉकगार्ड',
    appTagline: 'कालबाह्य स्टॉकमुळे पुन्हा कधी पैसे गमावू नका. ट्रॅक करा, अलर्ट मिळवा आणि रिकव्हर करा.',
    poweredBy: 'Supabase द्वारे · भारतीय रिटेलर्ससाठी 🇮🇳',
    goodMorning: 'सुप्रभात',
    goodAfternoon: 'शुभ दुपार',
    goodEvening: 'शुभ संध्याकाळ',
    dashboard: 'डॅशबोर्ड',
    dashboardTitle: 'स्टॉकगार्ड डॅशबोर्ड',
    lastUpdated: 'शेवटचे अपडेट',
    lossCalculator: '💰 नुकसान कॅल्क्युलेटर',
    quickActions: '⚡ जलद क्रिया',
    overview: '📊 आढावा',
    totalStock: 'एकूण स्टॉक',
    soldToday: 'आज विक्री',
    lowStock: 'कमी स्टॉक',
    restockAlert: 'रीस्टॉक अलर्ट',
    menu: 'मेन्यू',
    products: 'उत्पादने',
    sales: 'विक्री',
    distributors: 'वितरक',
    alerts: 'अलर्ट्स',
    settings: 'सेटिंग्ज',
    profile: 'प्रोफाइल',
    signOut: 'साइन आउट',
    shopInfo: 'राम मेडिकल स्टोर',
    whatsappActive: 'WhatsApp अलर्ट्स चालू ✅',
    welcomeBack: 'पुन्हा स्वागत',
    signInSubtitle: 'आपली इन्व्हेंटरी व्यवस्थापित करण्यासाठी साइन इन करा',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signingIn: 'साइन इन होत आहे...',
    noAccount: 'खाते नाही?',
    register: 'नोंदणी करा',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'आपली भाषा निवडा',
    chooseLanguageSubtitle: 'अॅपसाठी आपली पसंतीची भाषा निवडा',
    continueBtn: 'पुढे जा',
    recommended: 'शिफारस',
    youCanChange: 'तुम्ही नंतर सेटिंग्जमध्ये बदलू शकता',
    batchTable: '📦 बॅच इन्व्हेंटरी',
    productName: 'उत्पादनाचे नाव',
    quantity: 'प्रमाण',
    expiryDate: 'कालबाह्य तारीख',
    daysLeft: 'उरलेले दिवस',
    status: 'स्थिती',
    expired: 'कालबाह्य',
    critical: 'गंभीर',
    warning: 'इशारा',
    safe: 'सुरक्षित',
    noProducts: 'उत्पादने सापडली नाहीत',
    scanBarcode: 'बारकोड स्कॅन',
    uploadInvoice: 'इनव्हॉइस अपलोड',
    checkExpiry: 'कालबाह्य तपासा',
    sendSummary: 'सारांश पाठवा',
    sendToWhatsApp: 'WhatsApp वर दैनिक सारांश पाठवा',
    distributorScore: '🏪 वितरक स्कोर',
    totalReturns: 'एकूण परतावा',
    accepted: 'स्वीकृत',
    rejected: 'नाकारले',
    escalation: 'एस्केलेशन',
    noDistributors: 'वितरक सापडले नाहीत',
    restockAlerts: '🔔 रीस्टॉक अलर्ट्स',
    restockMessage: 'युनिट्स शिल्लक (मर्यादा:',
    atRisk: 'धोक्यात',
    recovered: 'पुनर्प्राप्त',
    lost: 'नुकसान',
    atRiskItems: 'आयटम धोक्यात',
    invoiceUpload: '📄 इनव्हॉइस अपलोड',
    invoiceDesc: 'उत्पादने स्वयंचलित जोडण्यासाठी इनव्हॉइस अपलोड करा',
    uploading: 'अपलोड होत आहे...',
    upload: 'अपलोड',
    settingsTitle: 'सेटिंग्ज',
    contactDetails: 'संपर्क तपशील',
    contactSubtitle: 'तुमचे सुरक्षा अलर्ट कोठे प्राप्त करायचे ते अपडेट करा',
    whatsappNumber: 'WhatsApp / SMS नंबर',
    updateNumber: 'नंबर अपडेट',
    notificationSystem: 'सूचना प्रणाली',
    notificationSubtitle: 'मॅन्युअल कालबाह्य तपासणी सत्यापित करा आणि चालवा',
    verificationTools: 'सत्यापन साधने',
    verificationDesc: 'प्लॅटफॉर्म कनेक्टिव्हिटी डेमो करण्यासाठी किंवा तुमचे फोन सेटअप सत्यापित करण्यासाठी याचा वापर करा.',
    sendConnectivityTest: 'कनेक्टिव्हिटी टेस्ट पाठवा',
    sendExpiryReport: 'कालबाह्य रिपोर्ट पाठवा',
    sendDailySummary: 'दैनिक सारांश पाठवा',
    confirmed: 'पुष्टी झाली',
    actionResult: 'कृती निकाल',
    securityAccess: 'सुरक्षा आणि प्रवेश',
    securitySubtitle: 'या डेमो खात्यासाठी सुरक्षा प्राधान्ये',
    twoFactor: 'टू-फॅक्टर ऑथेंटिकेशन (2FA)',
    enabled: 'सक्रिय',
    avgSavedYear: 'वार्षिक बचत',
    setupTime: 'सेटअप वेळ',
    alertsOnPhone: 'फोनवर अलर्ट',
    sendSummaryDesc: 'WhatsApp वर पूर्ण दैनिक सारांश मिळवा',
    generating: 'तयार होत आहे...',

    expiredItems: 'कालबाह्य वस्तू',
    criticalBatches: 'गंभीर बॅच',
    activeInventory: 'सक्रिय इन्व्हेंटरी',
    batchExpired: 'बॅच कालबाह्य',
    batchesCritical: 'बॅच 15 दिवसांत कालबाह्य होत आहेत',
    activeBatchCount: 'सक्रिय बॅच',
    atRiskValue: 'धोक्यात',
    batch: 'बॅच',
    qty: 'प्रमाण',
    expiredDaysAgo: 'दिवसांपूर्वी',
    expiresIn: 'कालबाह्य होत आहे',
    loss: 'नुकसान',
    value: 'किंमत',
    product: 'उत्पादन',
    removeBtn: 'हटवा',
    sellBtn: 'विक्री करा',
    noBatchesFound: 'बॅच सापडले नाहीत',
    allBatchesCritical: 'सर्व बॅच कालबाह्य किंवा गंभीर आहेत',
    removeExpiredTip: 'इन्व्हेंटरी स्वच्छ ठेवण्यासाठी कालबाह्य वस्तू हटवा',
    searchProduct: 'उत्पादन शोधा...',
    expiredBadge: 'कालबाह्य',
    removeNow: 'आता हटवा',
    expiringSoon: 'लवकरच कालबाह्य',
    returnNow: 'आता परत करा',
    alertSoon: 'लवकरच इशारा',
    safeBadge: 'सुरक्षित',
    appNameHindi: '',
    language: 'भाषा',
    activeSeller: 'सक्रिय विक्रेता',
    changeLanguage: 'भाषा बदला',
    chooseAppLanguage: 'अॅपसाठी आपली पसंतीची भाषा निवडा',
    alwaysIncludeCountry: 'नेहमी देश कोड समाविष्ट करा (उदा. +91)',
    createAccount: 'खाते तयार करा',
    setupShopMinutes: 'मिनिटांत आपले दुकान सुरू करा',
    whatsappAlertsExpiring: 'कालबाह्य स्टॉकसाठी WhatsApp अलर्ट',
    scanBarcodeInvoice: 'बारकोड स्कॅन किंवा इनव्हॉइस फोटो',
    trackLossRecover: 'नुकसान ट्रॅक करा आणि रिटर्न्स मिळवा',
    builtForShops: 'किराणा आणि मेडिकल दुकानांसाठी',
    shopNameLabel: 'दुकानाचे नाव',
    whatsappNumberLabel: 'WhatsApp नंबर',
    includeCountryCode: 'देश कोड समाविष्ट करा (+91)',
    passwordLabel: 'पासवर्ड',
    confirmLabel: 'पुष्टी',
    creatingAccount: 'खाते तयार होत आहे...',
    accountCreated: 'खाते तयार झाले!',
    redirecting: 'डॅशबोर्डवर जात आहे...',
    checkEmailConfirmation: 'रिडायरेक्ट न झाल्यास ईमेल तपासा.',
    goToLogin: 'लॉगिनवर जा',
    alreadyHaveAccount: 'आधीच खाते आहे?',
    restockItems: 'रीस्टॉक आयटम',
    restockNotify: 'वितरकाला कळवा',
    restockSending: 'सूचना पाठवत आहे...',
    restockSent: 'वितरकाला सूचना पाठवली!',
    restockFailed: 'सूचना पाठवणे अयशस्वी',
    restockVoice: 'व्हॉइस रीस्टॉक',
    restockVoicePlaceholder: 'बोला: "20 तांदूळ पॅकेट रीस्टॉक"',
    restockListening: 'ऐकत आहे...',
    restockStopListening: 'ऐकणे थांबवा',
    minStock: 'किमान',
  },

  ta: {
    appName: 'ஸ்டாக்கார்ட்',
    appTagline: 'காலாவதியான பொருட்களால் மீண்டும் பணம் இழக்காதீர்கள். கண்காணிக்கவும், எச்சரிக்கவும், மீட்கவும்.',
    poweredBy: 'Supabase மூலம் · இந்திய சில்லறை வியாபாரிகளுக்காக 🇮🇳',
    goodMorning: 'காலை வணக்கம்',
    goodAfternoon: 'மதிய வணக்கம்',
    goodEvening: 'மாலை வணக்கம்',
    dashboard: 'டாஷ்போர்ட்',
    dashboardTitle: 'ஸ்டாக்கார்ட் டாஷ்போர்ட்',
    lastUpdated: 'கடைசி புதுப்பிப்பு',
    lossCalculator: '💰 இழப்பு கால்குலேட்டர்',
    quickActions: '⚡ விரைவு செயல்கள்',
    overview: '📊 மேலோட்டம்',
    totalStock: 'மொத்த இருப்பு',
    soldToday: 'இன்று விற்பனை',
    lowStock: 'குறைந்த இருப்பு',
    restockAlert: 'மீள்நிரப்பு எச்சரிக்கை',
    menu: 'மெனு',
    products: 'பொருட்கள்',
    sales: 'விற்பனை',
    distributors: 'விநியோகஸ்தர்கள்',
    alerts: 'எச்சரிக்கைகள்',
    settings: 'அமைப்புகள்',
    profile: 'சுயவிவரம்',
    signOut: 'வெளியேறு',
    shopInfo: 'ராம் மருத்துவ கடை',
    whatsappActive: 'WhatsApp எச்சரிக்கைகள் செயலில் ✅',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    signInSubtitle: 'உங்கள் சரக்குகளை நிர்வகிக்க உள்நுழையவும்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    signIn: 'உள்நுழை',
    signingIn: 'உள்நுழைகிறது...',
    noAccount: 'கணக்கு இல்லையா?',
    register: 'பதிவு செய்யுங்கள்',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    chooseLanguageSubtitle: 'செயலிக்கான உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    continueBtn: 'தொடரவும்',
    recommended: 'பரிந்துரைக்கப்பட்டது',
    youCanChange: 'அமைப்புகளில் பின்னர் மாற்றலாம்',
    batchTable: '📦 தொகுப்பு சரக்கு',
    productName: 'பொருளின் பெயர்',
    quantity: 'அளவு',
    expiryDate: 'காலாவதி தேதி',
    daysLeft: 'மீதமுள்ள நாட்கள்',
    status: 'நிலை',
    expired: 'காலாவதி',
    critical: 'ஆபத்தான',
    warning: 'எச்சரிக்கை',
    safe: 'பாதுகாப்பான',
    noProducts: 'பொருட்கள் எதுவும் இல்லை',
    scanBarcode: 'பார்கோடு ஸ்கேன்',
    uploadInvoice: 'விலைப்பட்டியல் பதிவேற்றம்',
    checkExpiry: 'காலாவதி சரிபார்ப்பு',
    sendSummary: 'சுருக்கம் அனுப்பு',
    sendToWhatsApp: 'WhatsApp வழியாக தினசரி சுருக்கம் அனுப்பு',
    distributorScore: '🏪 விநியோகஸ்தர் மதிப்பெண்',
    totalReturns: 'மொத்த திரும்பப்பெறுதல்',
    accepted: 'ஏற்றுக்கொள்ளப்பட்டது',
    rejected: 'நிராகரிக்கப்பட்டது',
    escalation: 'எஸ்கலேஷன்',
    noDistributors: 'விநியோகஸ்தர்கள் எவரும் இல்லை',
    restockAlerts: '🔔 மீள்நிரப்பு எச்சரிக்கைகள்',
    restockMessage: 'அலகுகள் மீதம் (எல்லை:',
    atRisk: 'ஆபத்தில்',
    recovered: 'மீட்கப்பட்டது',
    lost: 'இழப்பு',
    atRiskItems: 'பொருட்கள் ஆபத்தில்',
    invoiceUpload: '📄 விலைப்பட்டியல் பதிவேற்றம்',
    invoiceDesc: 'பொருட்களை தானாக சேர்க்க விலைப்பட்டியல் பதிவேற்றவும்',
    uploading: 'பதிவேற்றுகிறது...',
    upload: 'பதிவேற்றம்',
    settingsTitle: 'அமைப்புகள்',
    contactDetails: 'தொடர்பு விவரங்கள்',
    contactSubtitle: 'உங்கள் பாதுகாப்பு எச்சரிக்கைகளை எங்கு பெற வேண்டும் என்பதை புதுப்பிக்கவும்',
    whatsappNumber: 'WhatsApp / SMS எண்',
    updateNumber: 'எண் புதுப்பிப்பு',
    notificationSystem: 'அறிவிப்பு அமைப்பு',
    notificationSubtitle: 'கைமுறை காலாவதி சரிபார்ப்புகளை சரிபார்த்து இயக்கவும்',
    verificationTools: 'சரிபார்ப்பு கருவிகள்',
    verificationDesc: 'இயங்குதள இணைப்பை காண்பிக்க அல்லது உங்கள் தொலைபேசி அமைப்பை சரிபார்க்க இவற்றைப் பயன்படுத்தவும்.',
    sendConnectivityTest: 'இணைப்பு சோதனை அனுப்பு',
    sendExpiryReport: 'காலாவதி அறிக்கை அனுப்பு',
    sendDailySummary: 'தினசரி சுருக்கம் அனுப்பு',
    confirmed: 'உறுதிப்படுத்தப்பட்டது',
    actionResult: 'செயல் முடிவு',
    securityAccess: 'பாதுகாப்பு & அணுகல்',
    securitySubtitle: 'இந்த டெமோ கணக்கிற்கான பாதுகாப்பு விருப்பங்கள்',
    twoFactor: 'இரு-காரணி அங்கீகாரம் (2FA)',
    enabled: 'செயலில்',
    avgSavedYear: 'வருடாந்திர சேமிப்பு',
    setupTime: 'அமைப்பு நேரம்',
    alertsOnPhone: 'தொலைபேசியில் எச்சரிக்கைகள்',
    sendSummaryDesc: 'WhatsApp இல் முழுமையான தினசரி சுருக்கம் பெறுங்கள்',
    generating: 'உருவாக்குகிறது...',

    expiredItems: 'காலாவதியான பொருட்கள்',
    criticalBatches: 'ஆபத்தான தொகுப்புகள்',
    activeInventory: 'செயலில் உள்ள சரக்கு',
    batchExpired: 'தொகுப்பு காலாவதி',
    batchesCritical: 'தொகுப்பு 15 நாட்களில் காலாவதியாகும்',
    activeBatchCount: 'செயலில் உள்ள தொகுப்புகள்',
    atRiskValue: 'ஆபத்தில்',
    batch: 'தொகுப்பு',
    qty: 'அளவு',
    expiredDaysAgo: 'நாட்களுக்கு முன்',
    expiresIn: 'காலாவதி',
    loss: 'இழப்பு',
    value: 'மதிப்பு',
    product: 'பொருள்',
    removeBtn: 'அகற்று',
    sellBtn: 'விற்கவும்',
    noBatchesFound: 'தொகுப்புகள் கிடைக்கவில்லை',
    allBatchesCritical: 'அனைத்து தொகுப்புகளும் காலாவதி அல்லது ஆபத்தான',
    removeExpiredTip: 'சரக்கு சுத்தமாக வைக்க காலாவதி பொருட்களை அகற்றுங்கள்',
    searchProduct: 'பொருளைத் தேடு...',
    expiredBadge: 'காலாவதி',
    removeNow: 'இப்போது அகற்று',
    expiringSoon: 'விரைவில் காலாவதி',
    returnNow: 'இப்போது திருப்பு',
    alertSoon: 'விரைவில் எச்சரிக்கை',
    safeBadge: 'பாதுகாப்பான',
    appNameHindi: '',
    language: 'மொழி',
    activeSeller: 'செயலில் உள்ள விற்பனையாளர்',
    changeLanguage: 'மொழியை மாற்றவும்',
    chooseAppLanguage: 'ஆப்பிற்கான உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
    alwaysIncludeCountry: 'எப்போதும் நாட்டு குறியீட்டை சேர்க்கவும் (உதா. +91)',
    createAccount: 'கணக்கை உருவாக்கவும்',
    setupShopMinutes: 'நிமிடங்களில் கடையை அமைக்கவும்',
    whatsappAlertsExpiring: 'காலாவதியாகும் பொருட்களுக்கு WhatsApp எச்சரிக்கைகள்',
    scanBarcodeInvoice: 'பார்கோடு ஸ்கேன் அல்லது விலைப்பட்டியல் புகைப்படம்',
    trackLossRecover: 'இழப்புகளை கண்காணிக்கவும் திருப்புகளைப் பெறவும்',
    builtForShops: 'மளிகை & மருத்துவ கடைகளுக்காக',
    shopNameLabel: 'கடையின் பெயர்',
    whatsappNumberLabel: 'WhatsApp எண்',
    includeCountryCode: 'நாட்டு குறியீடு சேர்க்கவும் (+91)',
    passwordLabel: 'கடவுச்சொல்',
    confirmLabel: 'உறுதிப்படுத்து',
    creatingAccount: 'கணக்கு உருவாக்குகிறது...',
    accountCreated: 'கணக்கு உருவாக்கப்பட்டது!',
    redirecting: 'டாஷ்போர்டுக்கு செல்கிறது...',
    checkEmailConfirmation: 'திருப்பி விடவில்லையெனில் மின்னஞ்சலைச் சரிபார்க்கவும்.',
    goToLogin: 'உள்நுழைவுக்கு செல்லவும்',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    restockItems: 'மீள்நிரப்பு பொருட்கள்',
    restockNotify: 'விநியோகஸ்தருக்கு தெரிவிக்கவும்',
    restockSending: 'அறிவிப்பு அனுப்புகிறது...',
    restockSent: 'விநியோகஸ்தருக்கு அறிவிப்பு அனுப்பப்பட்டது!',
    restockFailed: 'அறிவிப்பு அனுப்புவது தோல்வியடைந்தது',
    restockVoice: 'குரல் மீள்நிரப்பு',
    restockVoicePlaceholder: 'சொல்லுங்கள்: "20 அரிசி பாக்கெட் மீள்நிரப்பு"',
    restockListening: 'கேட்கிறது...',
    restockStopListening: 'கேட்பதை நிறுத்து',
    minStock: 'குறைந்தபட்சம்',
  },

  kn: {
    appName: 'ಸ್ಟಾಕ್‌ಗಾರ್ಡ್',
    appTagline: 'ಅವಧಿ ಮುಗಿದ ಸ್ಟಾಕ್‌ನಿಂದ ಮತ್ತೆಂದೂ ಹಣ ಕಳೆದುಕೊಳ್ಳಬೇಡಿ. ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ಎಚ್ಚರಿಸಿ ಮತ್ತು ಮರುಪಡೆಯಿರಿ.',
    poweredBy: 'Supabase ನಿಂದ · ಭಾರತೀಯ ಚಿಲ್ಲರೆ ವ್ಯಾಪಾರಿಗಳಿಗಾಗಿ 🇮🇳',
    goodMorning: 'ಶುಭೋದಯ',
    goodAfternoon: 'ಶುಭ ಮಧ್ಯಾಹ್ನ',
    goodEvening: 'ಶುಭ ಸಂಜೆ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    dashboardTitle: 'ಸ್ಟಾಕ್‌ಗಾರ್ಡ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    lastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
    lossCalculator: '💰 ನಷ್ಟ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    quickActions: '⚡ ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',
    overview: '📊 ಅವಲೋಕನ',
    totalStock: 'ಒಟ್ಟು ಸ್ಟಾಕ್',
    soldToday: 'ಇಂದು ಮಾರಾಟ',
    lowStock: 'ಕಡಿಮೆ ಸ್ಟಾಕ್',
    restockAlert: 'ಮರುಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆ',
    menu: 'ಮೆನು',
    products: 'ಉತ್ಪನ್ನಗಳು',
    sales: 'ಮಾರಾಟ',
    distributors: 'ವಿತರಕರು',
    alerts: 'ಎಚ್ಚರಿಕೆಗಳು',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    profile: 'ಪ್ರೊಫೈಲ್',
    signOut: 'ಸೈನ್ ಔಟ್',
    shopInfo: 'ರಾಮ್ ಮೆಡಿಕಲ್ ಸ್ಟೋರ್',
    whatsappActive: 'WhatsApp ಎಚ್ಚರಿಕೆಗಳು ಸಕ್ರಿಯ ✅',
    welcomeBack: 'ಮರಳಿ ಸ್ವಾಗತ',
    signInSubtitle: 'ನಿಮ್ಮ ದಾಸ್ತಾನು ನಿರ್ವಹಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    email: 'ಇ-ಮೇಲ್',
    password: 'ಪಾಸ್‌ವರ್ಡ್',
    signIn: 'ಸೈನ್ ಇನ್',
    signingIn: 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
    noAccount: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    register: 'ನೋಂದಾಯಿಸಿ',
    emailPlaceholder: 'you@example.com',
    chooseLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    chooseLanguageSubtitle: 'ಅಪ್ಲಿಕೇಶನ್‌ಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    continueBtn: 'ಮುಂದುವರಿಸಿ',
    recommended: 'ಶಿಫಾರಸು',
    youCanChange: 'ನೀವು ನಂತರ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಬದಲಾಯಿಸಬಹುದು',
    batchTable: '📦 ಬ್ಯಾಚ್ ದಾಸ್ತಾನು',
    productName: 'ಉತ್ಪನ್ನ ಹೆಸರು',
    quantity: 'ಪ್ರಮಾಣ',
    expiryDate: 'ಅವಧಿ ಮುಕ್ತಾಯ ದಿನಾಂಕ',
    daysLeft: 'ಉಳಿದ ದಿನಗಳು',
    status: 'ಸ್ಥಿತಿ',
    expired: 'ಅವಧಿ ಮುಗಿದಿದೆ',
    critical: 'ಗಂಭೀರ',
    warning: 'ಎಚ್ಚರಿಕೆ',
    safe: 'ಸುರಕ್ಷಿತ',
    noProducts: 'ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    scanBarcode: 'ಬಾರ್‌ಕೋಡ್ ಸ್ಕ್ಯಾನ್',
    uploadInvoice: 'ಇನ್ವಾಯ್ಸ್ ಅಪ್‌ಲೋಡ್',
    checkExpiry: 'ಅವಧಿ ಪರಿಶೀಲನೆ',
    sendSummary: 'ಸಾರಾಂಶ ಕಳುಹಿಸಿ',
    sendToWhatsApp: 'WhatsApp ಮೂಲಕ ದೈನಂದಿನ ಸಾರಾಂಶ ಕಳುಹಿಸಿ',
    distributorScore: '🏪 ವಿತರಕ ಅಂಕ',
    totalReturns: 'ಒಟ್ಟು ಹಿಂತಿರುಗಿಕೆ',
    accepted: 'ಸ್ವೀಕರಿಸಲಾಗಿದೆ',
    rejected: 'ತಿರಸ್ಕರಿಸಲಾಗಿದೆ',
    escalation: 'ಎಸ್ಕಲೇಷನ್',
    noDistributors: 'ವಿತರಕರು ಕಂಡುಬಂದಿಲ್ಲ',
    restockAlerts: '🔔 ಮರುಸ್ಟಾಕ್ ಎಚ್ಚರಿಕೆಗಳು',
    restockMessage: 'ಘಟಕಗಳು ಉಳಿದಿವೆ (ಮಿತಿ:',
    atRisk: 'ಅಪಾಯದಲ್ಲಿ',
    recovered: 'ಮರುಪಡೆಯಲಾಗಿದೆ',
    lost: 'ನಷ್ಟ',
    atRiskItems: 'ವಸ್ತುಗಳು ಅಪಾಯದಲ್ಲಿ',
    invoiceUpload: '📄 ಇನ್ವಾಯ್ಸ್ ಅಪ್‌ಲೋಡ್',
    invoiceDesc: 'ಉತ್ಪನ್ನಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೇರಿಸಲು ಇನ್ವಾಯ್ಸ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    uploading: 'ಅಪ್‌ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    upload: 'ಅಪ್‌ಲೋಡ್',
    settingsTitle: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    contactDetails: 'ಸಂಪರ್ಕ ವಿವರಗಳು',
    contactSubtitle: 'ನಿಮ್ಮ ಭದ್ರತಾ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಎಲ್ಲಿ ಸ್ವೀಕರಿಸಬೇಕೆಂದು ನವೀಕರಿಸಿ',
    whatsappNumber: 'WhatsApp / SMS ಸಂಖ್ಯೆ',
    updateNumber: 'ಸಂಖ್ಯೆ ನವೀಕರಿಸಿ',
    notificationSystem: 'ಅಧಿಸೂಚನೆ ವ್ಯವಸ್ಥೆ',
    notificationSubtitle: 'ಹಸ್ತಚಾಲಿತ ಅವಧಿ ಪರಿಶೀಲನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಚಲಾಯಿಸಿ',
    verificationTools: 'ಪರಿಶೀಲನಾ ಪರಿಕರಗಳು',
    verificationDesc: 'ವೇದಿಕೆ ಸಂಪರ್ಕವನ್ನು ಪ್ರದರ್ಶಿಸಲು ಅಥವಾ ನಿಮ್ಮ ಫೋನ್ ಸೆಟಪ್ ಅನ್ನು ಪರಿಶೀಲಿಸಲು ಇವುಗಳನ್ನು ಬಳಸಿ.',
    sendConnectivityTest: 'ಸಂಪರ್ಕ ಪರೀಕ್ಷೆ ಕಳುಹಿಸಿ',
    sendExpiryReport: 'ಅವಧಿ ವರದಿ ಕಳುಹಿಸಿ',
    sendDailySummary: 'ದೈನಂದಿನ ಸಾರಾಂಶ ಕಳುಹಿಸಿ',
    confirmed: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
    actionResult: 'ಕ್ರಿಯೆ ಫಲಿತಾಂಶ',
    securityAccess: 'ಭದ್ರತೆ & ಪ್ರವೇಶ',
    securitySubtitle: 'ಈ ಡೆಮೊ ಖಾತೆಗೆ ಭದ್ರತಾ ಆದ್ಯತೆಗಳು',
    twoFactor: 'ದ್ವಿ-ಅಂಶ ದೃಢೀಕರಣ (2FA)',
    enabled: 'ಸಕ್ರಿಯ',
    avgSavedYear: 'ವಾರ್ಷಿಕ ಉಳಿತಾಯ',
    setupTime: 'ಸೆಟಪ್ ಸಮಯ',
    alertsOnPhone: 'ಫೋನ್‌ನಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳು',
    sendSummaryDesc: 'WhatsApp ನಲ್ಲಿ ಸಂಪೂರ್ಣ ದೈನಂದಿನ ಸಾರಾಂಶ ಪಡೆಯಿರಿ',
    generating: 'ಉತ್ಪಾದಿಸುತ್ತಿದೆ...',

    expiredItems: 'ಅವಧಿ ಮುಗಿದ ವಸ್ತುಗಳು',
    criticalBatches: 'ಗಂಭೀರ ಬ್ಯಾಚ್‌ಗಳು',
    activeInventory: 'ಸಕ್ರಿಯ ದಾಸ್ತಾನು',
    batchExpired: 'ಬ್ಯಾಚ್ ಅವಧಿ ಮುಗಿದಿದೆ',
    batchesCritical: 'ಬ್ಯಾಚ್ 15 ದಿನಗಳಲ್ಲಿ ಅವಧಿ ಮುಗಿಯುತ್ತಿದೆ',
    activeBatchCount: 'ಸಕ್ರಿಯ ಬ್ಯಾಚ್‌ಗಳು',
    atRiskValue: 'ಅಪಾಯದಲ್ಲಿ',
    batch: 'ಬ್ಯಾಚ್',
    qty: 'ಪ್ರಮಾಣ',
    expiredDaysAgo: 'ದಿನಗಳ ಹಿಂದೆ',
    expiresIn: 'ಅವಧಿ',
    loss: 'ನಷ್ಟ',
    value: 'ಮೌಲ್ಯ',
    product: 'ಉತ್ಪನ್ನ',
    removeBtn: 'ತೆಗೆಯಿರಿ',
    sellBtn: 'ಮಾರಾಟ',
    noBatchesFound: 'ಬ್ಯಾಚ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
    allBatchesCritical: 'ಎಲ್ಲಾ ಬ್ಯಾಚ್‌ಗಳು ಅವಧಿ ಮುಗಿದಿವೆ ಅಥವಾ ಗಂಭೀರ',
    removeExpiredTip: 'ದಾಸ್ತಾನು ಶುಚಿಯಾಗಿಡಲು ಅವಧಿ ಮುಗಿದ ವಸ್ತುಗಳನ್ನು ತೆಗೆಯಿರಿ',
    searchProduct: 'ಉತ್ಪನ್ನ ಹುಡುಕಿ...',
    expiredBadge: 'ಅವಧಿ ಮುಗಿದಿದೆ',
    removeNow: 'ಈಗ ತೆಗೆಯಿರಿ',
    expiringSoon: 'ಶೀಘ್ರದಲ್ಲೇ ಅವಧಿ',
    returnNow: 'ಈಗ ಹಿಂತಿರುಗಿಸಿ',
    alertSoon: 'ಶೀಘ್ರದಲ್ಲೇ ಎಚ್ಚರಿಕೆ',
    safeBadge: 'ಸುರಕ್ಷಿತ',
    appNameHindi: '',
    language: 'ಭಾಷೆ',
    activeSeller: 'ಸಕ್ರಿಯ ಮಾರಾಟಗಾರ',
    changeLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    chooseAppLanguage: 'ಅಪ್ಲಿಕೇಶನ್‌ಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    alwaysIncludeCountry: 'ಯಾವಾಗಲೂ ದೇಶ ಕೋಡ್ ಸೇರಿಸಿ (ಉದಾ. +91)',
    createAccount: 'ಖಾತೆ ರಚಿಸಿ',
    setupShopMinutes: 'ನಿಮಿಷಗಳಲ್ಲಿ ಅಂಗಡಿ ಸ್ಥಾಪಿಸಿ',
    whatsappAlertsExpiring: 'ಅವಧಿ ಮುಗಿಯುತ್ತಿರುವ ಸ್ಟಾಕ್‌ಗೆ WhatsApp ಎಚ್ಚರಿಕೆಗಳು',
    scanBarcodeInvoice: 'ಬಾರ್‌ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಅಥವಾ ಇನ್ವಾಯ್ಸ್ ಫೋಟೋ',
    trackLossRecover: 'ನಷ್ಟಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಹಿಂತಿರುಗಿಕೆ ಪಡೆಯಿರಿ',
    builtForShops: 'ಕಿರಾಣಿ & ಮೆಡಿಕಲ್ ಅಂಗಡಿಗಳಿಗಾಗಿ',
    shopNameLabel: 'ಅಂಗಡಿ ಹೆಸರು',
    whatsappNumberLabel: 'WhatsApp ಸಂಖ್ಯೆ',
    includeCountryCode: 'ದೇಶ ಕೋಡ್ ಸೇರಿಸಿ (+91)',
    passwordLabel: 'ಪಾಸ್‌ವರ್ಡ್',
    confirmLabel: 'ದೃಢೀಕರಿಸಿ',
    creatingAccount: 'ಖಾತೆ ರಚಿಸುತ್ತಿದೆ...',
    accountCreated: 'ಖಾತೆ ರಚಿಸಲಾಗಿದೆ!',
    redirecting: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗುತ್ತಿದೆ...',
    checkEmailConfirmation: 'ಮರುನಿರ್ದೇಶಿಸದಿದ್ದರೆ ಇ-ಮೇಲ್ ಪರಿಶೀಲಿಸಿ.',
    goToLogin: 'ಲಾಗಿನ್‌ಗೆ ಹೋಗಿ',
    alreadyHaveAccount: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    restockItems: 'ಮರುಸ್ಟಾಕ್ ವಸ್ತುಗಳು',
    restockNotify: 'ವಿತರಕರಿಗೆ ತಿಳಿಸಿ',
    restockSending: 'ಅಧಿಸೂಚನೆ ಕಳುಹಿಸುತ್ತಿದೆ...',
    restockSent: 'ವಿತರಕರಿಗೆ ಅಧಿಸೂಚನೆ ಕಳುಹಿಸಲಾಗಿದೆ!',
    restockFailed: 'ಅಧಿಸೂಚನೆ ಕಳುಹಿಸುವಲ್ಲಿ ವಿಫಲ',
    restockVoice: 'ಧ್ವನಿ ಮರುಸ್ಟಾಕ್',
    restockVoicePlaceholder: 'ಹೇಳಿ: "20 ಅಕ್ಕಿ ಪ್ಯಾಕೆಟ್ ಮರುಸ್ಟಾಕ್"',
    restockListening: 'ಕೇಳುತ್ತಿದೆ...',
    restockStopListening: 'ಕೇಳುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
    minStock: 'ಕನಿಷ್ಠ',
  },
}
