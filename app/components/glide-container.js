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
    glideHorizontalGlider.mount();

    new KeenSlider('.KeenVerticalGlider-1', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up')
          .addEventListener('click', function () {
            instance.prev();
          })
        document
          .querySelector('.glide__arrow--down')
          .addEventListener('click', function () {
            instance.next();
          })
      },
      vertical: true,
      centered: true,
      controls: false,
    });
    new KeenSlider('.KeenVerticalGlider-2', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up')
          .addEventListener('click', function () {
            instance.prev();
          });
        document
          .querySelector('.glide__arrow--down')
          .addEventListener('click', function () {
            instance.next();
          });
      },
      vertical: true,
      centered: true,
      controls: false,
    });
    new KeenSlider('.KeenVerticalGlider-3', {
      created: function (instance) {
        document
          .querySelector('.glide__arrow--up')
          .addEventListener('click', function () {
            instance.prev();
          })
        document
          .querySelector('.glide__arrow--down')
          .addEventListener('click', function () {
            instance.next();
          })
      },
      vertical: true,
      centered: true,
      controls: false,
    });
  }
}
