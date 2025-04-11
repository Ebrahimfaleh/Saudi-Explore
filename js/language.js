// js/language.js
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'ar';
    applyLanguage(savedLang);
});

async function applyLanguage(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        const translations = await response.json();
        
        // تطبيق الترجمة على جميع العناصر
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const keys = el.dataset.i18n.split('.');
            let value = translations;
            keys.forEach(key => value = value?.[key]);
            if (value) {
                el.textContent = value;
                if (el.placeholder) el.placeholder = value;
            }
        });
        
        // تغيير اتجاه الصفحة
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    applyLanguage(lang);
}