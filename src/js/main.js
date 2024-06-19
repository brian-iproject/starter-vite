import AcceptCookie from '@/js/classes/AcceptCookie.js';
import Utils from '@/js/classes/Utils';
import SvgLoad from '@/js/classes/SvgLoad';

document.addEventListener('DOMContentLoaded', () => {
  Utils.replaceLink('data-href');
  SvgLoad.init((window.location.hostname === 'localhost') ? '/images/icons.svg' : '/local/templates/pixelplus.ru_2021/images/icons.svg');

  // Предупреждение об использовании кук
  if (typeof AcceptCookie !== 'undefined') {
    new AcceptCookie({
      cookie: {
        name: 'ACCEPT_COOKIE',
      },
      showModal: true,
      text: `
              <div>
                  <div class="h3">Пиксель Плюс — агентство без неожиданностей!</div>
                  <p>Наша миссия: помогать бизнесу зарабатывать больше</p>
                  <ol class="list">
                      <li>С 2006 года остались верны своим убеждениям и подходу. Мы помогли 1000+ бизнесам наших клиентов. Наша цель — стать № 1 по лояльности клиентов.</li>
                      <li>Мы используем cookie-файлы для аналитики, чтобы ваше посещение сайта было удобным и персонализированным. Нажимая «Продолжить» или закрывая окно вы соглашаетесь с использованием cookie-файлов и обработку персональных данных с использованием Яндекс.Метрики и Google Analytics.</li>
                  </ol>
                  <div class="-ta-c"><button class="button button--green" data-fancybox-close="">Продолжить</button></div>
              </div>
            `,
      on: {
        afterSet: () => {

        },
      },
    });
  }
});
