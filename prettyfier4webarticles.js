// ================================ prettifiers ================================
function prettify_zen_yandex(){
    // remove all unnecessary
    try {
        document.querySelector('#header-container').remove()
        document.querySelector('#article__left').remove()
        document.querySelector('#article__right').remove()
        document.querySelector('.article-root').remove()
        document.querySelector('.article__middle', '.article__middle_theme_undefined').style.width = "auto"
        document.querySelector('.article__content', 'article__content_theme_undefined').style.marginLeft = "0"

        // remove dynamically loaded elements
        let count1 = 0
        let timer1 = setInterval(function(){
            try {
                document.querySelector('.article-recommender').remove();
            }
            catch (error) {}
            finally {
                count1++;
                // if(count1 > 10) clearInterval(timer1);
            }
        }, 100)

        let count2 = 0;
        let timer2 = setInterval(function(){
            try {
                document.querySelector('#article__comments').remove();
            }
            catch (error) {}
            finally{
                count2++;
                // if(count2 > 10) clearInterval(timer2);
            }
        }, 100)

        let count3 = 0;
        let timer3 = setInterval(function(){
            try {
                let ydes = document.querySelectorAll('.yandex-direct-embed ');
                for (let index = (ydes.length - 1); index >= 0; index--) {
                    ydes[index].remove();
                }
            }
            catch (error) {}
            finally{
                count3++;
                // if(count3 > 10) clearInterval(timer3);
            }
        }, 100)
    } catch (error) {}

    avoid_breaks_inside()
};

// =============================================================================

function avoid_breaks_inside(){
    let style_el=document.createElement('style');
    style_el.appendChild(document.createTextNode('@media print {.article-render * {break-inside: avoid;}}'));
    document.getElementsByTagName('head')[0].appendChild(style_el);
}

function choose_prettifier(){
    let hostname = window.location.hostname;
    let prettifier = null;
    switch (hostname) {
        case 'zen.yandex.ru':
            prettifier = prettify_zen_yandex;
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
