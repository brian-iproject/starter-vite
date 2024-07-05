import Utils from '@/js/classes/Utils.js';
import SvgLoad from '@/js/classes/SvgLoad.js';
import Swiper from 'swiper/bundle';

if (typeof window.PixelPlus === 'undefined') {
  window.PixelPlus = {};
}

if (typeof window.PixelPlus.Team === 'undefined') {
  window.PixelPlus.Team = {};
}

window.PixelPlus.Team.Utils = Utils;
window.PixelPlus.Team.SvgLoad = SvgLoad;
window.PixelPlus.Team.Swiper = Swiper;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof window.PixelPlus.Team.Utils !== 'undefined') {
    window.PixelPlus.Team.Utils.replaceLink('data-href');
  }

  if (typeof window.PixelPlus.Team.SvgLoad !== 'undefined') {
    window.PixelPlus.Team.SvgLoad.init((window.location.hostname === 'localhost') ? '/assets/images/spritemap.svg' : '/local/templates/pixelplus.ru_2021/images/spritemap.svg');
  }

  if (typeof window.PixelPlus.Team.Swiper !== 'undefined') {
    new window.PixelPlus.Team.Swiper('.swiper', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 20,
    });
  }
});
