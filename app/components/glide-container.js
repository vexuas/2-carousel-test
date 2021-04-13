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
    glideHorizontalGlider.on('run', function(){
      console.log(glideHorizontalGlider.index);
      glider1.refresh();
    });

    const glider1 = new KeenSlider('.KeenVerticalGlider-1', {
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
    // const glider2 = new KeenSlider('.KeenVerticalGlider-2', {
    //   created: function (instance) {
    //     document
    //       .querySelector('.glide__arrow--up[data-arrow-up="1"]')
    //       .addEventListener('click', function () {
    //         instance.prev();
    //       });
    //     document
    //       .querySelector('.glide__arrow--down[data-arrow-down="1"]')
    //       .addEventListener('click', function () {
    //         instance.next();
    //       });
    //     window.addEventListener('keydown', function (event) {
    //       if (event.keyCode === 38) { //up arrow
    //         instance.prev();
    //       }
    //       if (event.keyCode === 40) { //down arrow
    //         instance.next();
    //       }
    //       if(event.keyCode === 37 || event.keyCode === 39){
    //         instance.moveToSlide(0, 2000);
    //       }
    //     });
    //   },
    //   vertical: true,
    //   centered: true,
    //   controls: false,
    // });
    // const glider3 = new KeenSlider('.KeenVerticalGlider-3', {
    //   created: function (instance) {
    //     document
    //       .querySelector('.glide__arrow--up[data-arrow-up="2"]')
    //       .addEventListener('click', function () {
    //         instance.prev();
    //       });
    //     document
    //       .querySelector('.glide__arrow--down[data-arrow-down="2"]')
    //       .addEventListener('click', function () {
    //         instance.next();
    //       });
    //     window.addEventListener('keydown', function (event) {
    //       if (event.keyCode === 38) { //up arrow
    //         instance.prev();
    //       }
    //       if (event.keyCode === 40) { //down arrow
    //         instance.next();
    //       }
    //       if(event.keyCode === 37 || event.keyCode === 39){
    //         instance.moveToSlide(0, 2000);
    //       }
    //     });
    //   },
    //   vertical: true,
    //   centered: true,
    //   controls: false,
    // });
  }
}
