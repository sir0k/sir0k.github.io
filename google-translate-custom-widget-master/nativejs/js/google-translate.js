/*!***************************************************
 * google-translate.js v1.0.1
 * https://Get-Web.Site/
 * author: L2Banners
 *****************************************************/

const googleTranslateConfig = {
    lang: "ru",
    /* Если скрипт не работает на поддомене, 
    раскомментируйте и
    укажите основной домен в свойстве domain */
    /* domain: "Get-Web.Site" */
};

function TranslateInit() {
    let code = TranslateGetCode();
    // Находим флаг с выбранным языком для перевода и добавляем к нему активный класс
    if (document.querySelector('[data-google-lang="' + code + '"]') !== null) {
        document.querySelector('[data-google-lang="' + code + '"]').classList.add('language__img_active');
    }


    if (code == googleTranslateConfig.lang) {
        // Если язык по умолчанию, совпадает с языком на который переводим
        // То очищаем куки
        TranslateCookieHandler(null, googleTranslateConfig.domain);
    }

    // Инициализируем виджет с языком по умолчанию
    new google.translate.TranslateElement({
        pageLanguage: googleTranslateConfig.lang,
    });

    // Вешаем событие  клик на флаги
    TranslateEventHandler('click', '[data-google-lang]', function (e) {
        TranslateCookieHandler("/" + googleTranslateConfig.lang + "/" + e.target.getAttribute("data-google-lang"), googleTranslateConfig.domain);
        // Перезагружаем страницу
        window.location.reload();
    });
}

function TranslateGetCode() {
    // Если куки нет, то передаем дефолтный язык
    let lang = (Cookies.get('googtrans') != undefined && Cookies.get('googtrans') != "null") ? Cookies.get('googtrans') : googleTranslateConfig.lang;
    return lang.substr(-2);
}

function TranslateCookieHandler(val, domain) {
    // Записываем куки /язык_который_переводим/язык_на_который_переводим
    Cookies.set('googtrans', val);
    Cookies.set("googtrans", val, {
        domain: "." + document.domain,
    });

    if (domain == "undefined") return;
    // записываем куки для домена, если он назначен в конфиге
    Cookies.set("googtrans", val, {
        domain: domain,
    });

    Cookies.set("googtrans", val, {
        domain: "." + domain,
    });
}

function TranslateEventHandler(event, el, handler) {
    document.addEventListener(event, function (e) {
        if (e.target.closest(el)) handler(e);
    });
}