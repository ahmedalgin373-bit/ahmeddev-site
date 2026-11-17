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
// =========================================
// كود مساعد الذكاء الاصطناعي (Puter.js)
// =========================================

function toggleAIChat() {
    const chatBox = document.getElementById('ai-chat-box');
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'flex';
    } else {
        chatBox.style.display = 'none';
    }
}

async function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const messages = document.getElementById('ai-messages');
    const text = input.value.trim();

    if (!text) return;

    // إضافة رسالة المستخدم
    messages.innerHTML += `<div class="ai-msg user">${text}</div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // إضافة رسالة تحميل
    const loadingId = 'loading-' + Date.now();
    messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}">جاري التفكير...</div>`;
    messages.scrollTop = messages.scrollHeight;

    try {
        // هنا بنستخدم ذكاء اصطناعي مجاني بالكامل من المتصفح
        const response = await puter.ai.chat(text);
        
        // مسح رسالة التحميل وإضافة الرد
        document.getElementById(loadingId).remove();
        messages.innerHTML += `<div class="ai-msg bot">${response}</div>`;
        messages.scrollTop = messages.scrollHeight;
        
    } catch (error) {
        document.getElementById(loadingId).remove();
        messages.innerHTML += `<div class="ai-msg bot" style="color:red;">عذراً، حدث خطأ. تأكد من اتصالك بالإنترنت.</div>`;
    }
}
