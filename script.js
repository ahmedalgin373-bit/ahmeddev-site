// --- كود تغيير اللغة ---
function setLanguage(lang) {
    localStorage.setItem('siteLang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    const langBtn = document.getElementById('lang-btn');
    if(langBtn) langBtn.textContent = lang === 'ar' ? 'English' : 'العربية';
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        el.textContent = lang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
    });
}

function toggleLanguage(event) {
    if (event) event.preventDefault();
    const currentLang = localStorage.getItem('siteLang') || 'en';
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(localStorage.getItem('siteLang') || 'en');
});

// --- كود الذكاء الاصطناعي ---
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

    // رسالة المستخدم
    messages.innerHTML += `<div class="ai-msg user">${text}</div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // رسالة انتظار
    const loadingId = 'loading-' + Date.now();
    messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}">جاري التفكير...</div>`;

    try {
        // الاتصال بالذكاء الاصطناعي
        const response = await puter.ai.chat(text);
        document.getElementById(loadingId).remove();
        messages.innerHTML += `<div class="ai-msg bot">${response}</div>`;
    } catch (error) {
        console.error(error);
        document.getElementById(loadingId).remove();
        // لو حصل خطأ هنظهره في الشات عشان نعرف السبب
        messages.innerHTML += `<div class="ai-msg bot" style="color:red;">خطأ: ${error.message || 'تأكد من اتصالك بالإنترنت'}</div>`;
    }
    messages.scrollTop = messages.scrollHeight;
}
