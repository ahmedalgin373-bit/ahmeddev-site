// دالة تغيير اللغة
function setLanguage(lang) {
    // حفظ اللغة في المتصفح عشان تفضل شغالة لو رحت لصفحة تانية
    localStorage.setItem('siteLang', lang);
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // تغيير زرار اللغة
    const langBtn = document.getElementById('lang-btn');
    if(langBtn) langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';

    // تغيير النصوص اللي عليها data-en و data-ar
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
}

// دالة الزرار
function toggleLanguage(event) {
    if (event) event.preventDefault();
    const currentLang = localStorage.getItem('siteLang') || 'en';
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
}

// تشغيل اللغة المحفوظة أول ما الصفحة تفتح
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang') || 'en';
    setLanguage(savedLang);
});
