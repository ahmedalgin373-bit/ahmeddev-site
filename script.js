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
// --- كود الذكاء الاصطناعي والسحب ---
function toggleAIChat() {
    const chatBox = document.getElementById('ai-chat-container');
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
    messages.innerHTML += `<div class="ai-msg user"><div class="msg-content">${text}</div></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // إضافة رسالة تحميل
    const loadingId = 'loading-' + Date.now();
    messages.innerHTML += `<div class="ai-msg bot" id="${loadingId}"><div class="msg-content">جاري التفكير...</div></div>`;
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await puter.ai.chat(text);
        document.getElementById(loadingId).remove();
        messages.innerHTML += `<div class="ai-msg bot"><div class="msg-content">${response}</div></div>`;
    } catch (error) {
        document.getElementById(loadingId).remove();
        messages.innerHTML += `<div class="ai-msg bot" style="color:red;"><div class="msg-content">خطأ: تأكد من اتصالك.</div></div>`;
    }
    messages.scrollTop = messages.scrollHeight;
}

// --- كود سحب الأيقونة (Draggable) ---
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("ai-floating-btn");
    let isDragging = false;
    let hasMoved = false;
    let startX, startY, initialX, initialY;

    // دالة لضبط الإحداثيات
    const dragStart = (e) => {
        if (e.type === "touchstart") {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        } else {
            startX = e.clientX;
            startY = e.clientY;
        }
        initialX = btn.offsetLeft;
        initialY = btn.offsetTop;
        isDragging = true;
        hasMoved = false;
    };

    // دالة السحب
    const drag = (e) => {
        if (!isDragging) return;
        
        let currentX, currentY;
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }

        let dx = currentX - startX;
        let dy = currentY - startY;

        // لو اتحرك أكتر من 5 بكسل نعتبره سحب
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasMoved = true;
        }

        btn.style.left = `${initialX + dx}px`;
        btn.style.top = `${initialY + dy}px`;
        btn.style.bottom = 'auto'; // نشيل القيمة الثابتة عشان يتحرك
        btn.style.right = 'auto';
    };

    // دالة الإفلات
    const dragEnd = () => {
        isDragging = false;
        // لو مفيش حركة (يعني دوسة عادية) نفتح الشات
        if (!hasMoved) {
            toggleAIChat();
        }
    };

    // ربط الأحداث
    btn.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", dragEnd);

    btn.addEventListener("touchstart", dragStart, { passive: true });
    document.addEventListener("touchmove", drag, { passive: false });
    document.addEventListener("touchend", dragEnd);
});
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
