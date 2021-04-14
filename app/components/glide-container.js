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
     /**
     * Dummy data, replace this with what you'll get in the route model
     * Horizontal data consumes the parent object of the dummy array
     * Vertical data consumes the array of a child object
     **/
    const dummyData =[
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
    //Create vertical slides for each horizontal slide
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
          updateVerticalClasses(instance);
        },
        slideChanged: function(instance){
          updateVerticalClasses(instance);
        },
        vertical: true,
        centered: true,
        controls: false,
        resetSlide: true,
      });
      verticalGlides.push(verticalGlide);
    });
     //Adds disable classes to relevant navigation controls when active vertical slide is first or last
    function updateVerticalClasses(instance){
      let slide = instance.details().relativeSlide;
      let arrowUp = document.querySelector('.glide__arrow--up[data-arrow-up="0"]');
      let arrowDown = document.querySelector('.glide__arrow--down[data-arrow-down="0"]');
      slide === 0 ? arrowUp.classList.add('arrow--disabled') : arrowUp.classList.remove('arrow--disabled');
      slide === instance.details().size - 1 ? arrowDown.classList.add('arrow--disabled') : arrowDown.classList.remove('arrow--disabled');
    }
    //Adds disable classes to relevant navigation controls when active horizontal slide is first or last
    function updateHorizontalClasses(slide){
      let arrowRight = document.querySelector('.glide__arrow--right');
      let arrowLeft = document.querySelector('.glide__arrow--left');
      slide === 0 ? arrowLeft.classList.add('arrow--disabled') : arrowLeft.classList.remove('arrow--disabled');
      slide === dummyData.length - 1 ? arrowRight.classList.add('arrow--disabled') : arrowRight.classList.remove('arrow--disabled');
    }
    /**
     * Hacky way to start on 1st element of vertical slide when moving horizontally
     * Currently all the vertical slides move together when using the navigation controls
     * This is due each vertical slide initialising on the same controls
     * To avoid confusion, this function refreshes and reinitialises the vertical destination slide when moving the horizontal slide
     * Best way is to just move the current slide instead of everything but need to look into that more
     */
    glideHorizontalGlider.on('run', function(){
      const ghIndex = glideHorizontalGlider.index;
      updateHorizontalClasses(ghIndex);
      verticalGlides[ghIndex].refresh();
    });
    //Initial setup of classes
    glideHorizontalGlider.on('mount.after', function(){
      updateHorizontalClasses(glideHorizontalGlider.index);
    })
    //Mounts horizontal glider to dom
    glideHorizontalGlider.mount();
  }
}
