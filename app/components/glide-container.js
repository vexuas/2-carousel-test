import Component from '@glimmer/component';
import { action } from '@ember/object';
import Glide from '@glidejs/glide';
import KeenSlider from 'keen-slider';

export default class GlideContainerComponent extends Component {
  @action 
  onLoad(){
    let verticalGlides = [];
    //Base horizontal right to left slider
    const glideHorizontalGlider = new Glide('.GlideHorizontalGlider', {
      type: 'slider',
      perView: 1,
      rewind: false,
    });
    const dummyData = [
      {
        title: 'Zeroes',
        touchpoints: [{}, {}, {}]
      },
      {
        title: 'Ones',
        touchpoints: [{}, {}, {}]
      },
      {
        title: 'Twos',
        touchpoints: [{}, {}, {}]
      },
    ];
    dummyData.forEach((element, index) => {
      let verticalGlide = new KeenSlider(`.KeenVerticalGlider-${index}`, {
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
      verticalGlides.push(verticalGlide);
    });
    /**
     * Hacky way to start on 1st element of vertical slide when moving horizontally
     * Currently all the vertical slides move together when using the navigation controls
     * This is due each vertical slide initialising on the same controls
     * To avoid confusion, this function refreshes and reinitialises the vertical destination slide when moving the horizontal slide
     * Best way is to just move the current slide instead of everything but need to look into that more
     */
    glideHorizontalGlider.on('run', function(){
      verticalGlides[glideHorizontalGlider.index].refresh();
    });
    glideHorizontalGlider.mount();
  }
}
