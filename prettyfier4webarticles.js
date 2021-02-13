// ================================ prettifiers ================================
function prettify_zen_yandex(){
    // remove all unnecessary
    try {
        document.querySelector('#header-container').remove()
        document.querySelector('#article__left').remove()
        document.querySelector('#article__right').remove()
        document.querySelector('.article-root').remove()
        document.querySelector('.article__middle', '.article__middle_theme_undefined').style.width = "100%"
        document.querySelector('.article__content', 'article__content_theme_undefined').style.marginLeft = "0"

        // remove dynamically loaded elements
        setInterval(function(){
            try {document.querySelector('.article-recommender').remove();}catch (error) {}
        }, 100)

        setInterval(function(){
            try {document.querySelector('#article__comments').remove();}catch (error) {}
        }, 100)

        setInterval(function(){
            try {
                let ydes = document.querySelectorAll('.yandex-direct-embed ');
                for (let index = (ydes.length - 1); index >= 0; index--) {
                    ydes[index].remove();
                }
            }catch (error) {}
        }, 100)
    } catch (error) {}

    avoid_breaks_inside('.article-render *');
};

// -----------------------------------------------------------------------------

function prettify_losst_ru(){
    try{document.querySelector('.main-container').style.width = "100%";}catch{}
    try{document.querySelector('#site-header').remove();}catch{}
    try{document.querySelector('.breadcrumb').remove();}catch{}
    try{document.querySelector('#sidebar').remove();}catch{}
    try{document.querySelector('article.article').style.width = "100%";}catch{}
    try{document.querySelector('.related-posts').remove();}catch{}
    try{document.querySelector('.postrating').remove();}catch{}
    try{document.querySelector('.shareit').remove();}catch{}
    try{document.querySelector('.postauthor').remove();}catch{}
    try{document.querySelector('#comments').remove();}catch{}
    try{document.querySelector('#commentsAdd').remove();}catch{}
    try{document.querySelector('#site-footer').remove();}catch{}
    try{
        let adds = document.querySelectorAll('.code-block');
        for (let index = (adds.length - 1); index >= 0; index--) {
            adds[index].remove();
        }
    }catch{}
    try{document.querySelector('.grecaptcha-badge').remove();}catch{}
    try{document.querySelector('.rc-anchor').remove();}catch{}
    try{document.querySelector('#move-to-top').remove();}catch{}
    try{document.querySelector('#page').style.display = "block"}catch{}

    avoid_breaks_inside('p, img');
};

// -----------------------------------------------------------------------------

function prettify_wikipedia(){
    avoid_breaks_inside('#toc, img');
}

// -----------------------------------------------------------------------------

function prettify_habr(){
    try{document.querySelector('#TMpanel').remove()}catch{}
    try{document.querySelector('.layout__row_navbar').remove()}catch{}
    try{document.querySelector('.sidebar').remove()}catch{}
    try{document.querySelector('.column-wrapper__last').remove()}catch{}
    try{document.querySelector('.layout__row_promo-blocks').remove()}catch{}
    try{document.querySelector('.layout__row_footer-links').remove()}catch{}
    try{document.querySelector('.layout__row_footer').remove()}catch{}
    try{document.querySelector('.for_users_only_msg').remove()}catch{}
    try{document.querySelector('.sidebar_stick-top').remove()}catch{}
    try{document.querySelector('.js-sidebar_right sidebar_right_stick-top').remove()}catch{}
    try{
        let cls = document.querySelectorAll('.content_left');
        for (let index = 0; index < cls.length; index++) {
            cls[index].style.paddingRight = "0";
        }
    }catch{}
}

// -----------------------------------------------------------------------------

function prettify_xakep(){
    // disable one-page printable
    let style_el=document.createElement('style');
    style_el.appendChild(document.createTextNode(`@media print{@page{size:auto;margin:30px}}`));
    document.getElementsByTagName('head')[0].appendChild(style_el);

    try{document.querySelector('.bdaia-author-box').remove()}catch{}
    try{document.querySelector('.bdaia-post-next-prev').remove()}catch{}
    try{document.querySelector('#bdaia-ralated-posts').remove()}catch{}
    try{document.querySelector('footer').remove()}catch{}

    avoid_breaks_inside('.prettyprint');
}

// -----------------------------------------------------------------------------

function prettify_stackoverflow(){
    // try to break between answers
    avoid_breaks_inside('.answer');
}

// =============================================================================

function avoid_breaks_inside(selector){
    let style_el=document.createElement('style');
    style_el.appendChild(document.createTextNode(`@media print {` + selector + `{
        break-inside: avoid;
        page-break-inside: avoid;
    }}`));
    document.getElementsByTagName('head')[0].appendChild(style_el);
}

function choose_prettifier(){
    let hostname = window.location.hostname;
    let prettifier = null;
    switch (hostname) {
        case 'zen.yandex.ru':
            prettifier = prettify_zen_yandex;
            break;
        case 'losst.ru':
            prettifier = prettify_losst_ru;
            break;
        case 'ru.wikipedia.org':
            prettifier = prettify_wikipedia;
            break;
        case 'habr.com':
            prettifier = prettify_habr;
            break;
        case 'xakep.ru':
            prettifier = prettify_xakep;
            break;
        case 'stackoverflow.com':
            prettifier = prettify_stackoverflow;
            break;
        default:
            prettifier = function(){}
            break;
    }
    return prettifier;
}

function print_page_with_delay(){
    setTimeout(() => {
        window.print()
    }, 300);
}

function run(){
    let prettifier = choose_prettifier();
    prettifier();
    print_page_with_delay();
};
