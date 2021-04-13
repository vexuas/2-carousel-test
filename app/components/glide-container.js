import Component from '@glimmer/component';
import { action } from '@ember/object';
import Glide from '@glidejs/glide';
import KeenSlider from 'keen-slider';

export default class GlideContainerComponent extends Component {
  @action 
  onLoad(){
    const glideHorizontalGlider = new Glide('.GlideHorizontalGlider', {
      type: 'slider',
      perView: 1,
      rewind: false,
    });
    
    const glider1 = new KeenSlider('.KeenVerticalGlider-0', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up[data-arrow-up="0"]')
          .addEventListener('click', function () {
            instance.prev();
          });
        document
          .querySelector('.glide__arrow--down[data-arrow-down="0"]')
          .addEventListener('click', function () {
            instance.next();
          });
        window.addEventListener('keydown', function (event) {
          if (event.keyCode === 38) { //up arrow
            instance.prev();
          }
          if (event.keyCode === 40) { //down arrow
            instance.next();
          }
        });
      },
      vertical: true,
      centered: true,
      controls: false,
      resetSlide: true,
    });
    const glider2 = new KeenSlider('.KeenVerticalGlider-1', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up[data-arrow-up="0"]')
          .addEventListener('click', function () {
            instance.prev();
          });
        document
          .querySelector('.glide__arrow--down[data-arrow-down="0"]')
          .addEventListener('click', function () {
            instance.next();
          });
        window.addEventListener('keydown', function (event) {
          if (event.keyCode === 38) { //up arrow
            instance.prev();
          }
          if (event.keyCode === 40) { //down arrow
            instance.next();
          }
        });
      },
      vertical: true,
      centered: true,
      controls: false,
      resetSlide: true,
    });
    const glider3 = new KeenSlider('.KeenVerticalGlider-2', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up[data-arrow-up="0"]')
          .addEventListener('click', function () {
            instance.prev();
          });
        document
          .querySelector('.glide__arrow--down[data-arrow-down="0"]')
          .addEventListener('click', function () {
            instance.next();
          });
        window.addEventListener('keydown', function (event) {
          if (event.keyCode === 38) { //up arrow
            instance.prev();
          }
          if (event.keyCode === 40) { //down arrow
            instance.next();
          }
        });
      },
      vertical: true,
      centered: true,
      controls: false,
      resetSlide: true,
    });
    let verticalGlides = [glider1, glider2, glider3];
    glideHorizontalGlider.on('run', function(){
      console.log(glideHorizontalGlider.index);
      verticalGlides[glideHorizontalGlider.index].refresh(); //reinitialises current slider
      // glider1.refresh();
    });
    glideHorizontalGlider.mount();
  }
}
