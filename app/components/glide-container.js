import Component from '@glimmer/component';
import { action } from '@ember/object';
import Glide from '@glidejs/glide';
import KeenSlider from 'keen-slider';

export default class GlideContainerComponent extends Component {
  /**
   * Dummy data, replace this with what you'll get in the route model
   * Horizontal data consumes the parent object of the dummy array
   * Vertical data consumes the array of a child object
   **/
  dummyData =[
    {
      title: 'Zeroes',
      touchpoints: [0.0]
    },
    {
      title: 'Ones',
      touchpoints: [1.0, 1.1]
    },
    {
      title: 'Twos',
      touchpoints: [2.0, 2.1, 2.2]
    },
  ];
  @action 
  onLoad(){
    //Base horizontal right to left slider
    const glideHorizontalGlider = new Glide('.GlideHorizontalGlider', {
      type: 'slider',
      perView: 1,
      rewind: false,
    });
    const dummyData = this.dummyData;// Have to redeclare to make it easier to consume within glide classes
    let currentVerticalSlide;
    /**
     * As there is only one set of control for vertical slides, creating all the vertical slides would only result all of them pointing to the same navigation buttons
     * This would move all the slides even if they're not on focus. This also would prove a problem when a horizontal slide doesn't have the same number of items in its vertical slider i.e. mismatch in disabling control
     * To handle this, we only want to initialise a vertical slider when we move to that current horizontal slide
     * @param {number} index - current index of horizontal slider
     */
    function createVerticalSlide(index){
      let verticalGlide = new KeenSlider(`.KeenVerticalGlider-${index}`, {
        created: function (instance) {
          document
            .querySelector(`.glide__arrow--up[data-arrow-up="${index}"]`)
            .addEventListener('click', function () {
              instance.prev();
            });
          document
            .querySelector(`.glide__arrow--down[data-arrow-down="${index}"]`)
            .addEventListener('click', function () {
              instance.next();
            });
          document.addEventListener('keydown', function (event) {
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
          console.log('hello');
          updateVerticalClasses(instance);
        },
        vertical: true,
        centered: true,
        controls: false,
        resetSlide: true,
      });
      return verticalGlide;
    }
    //Dynamically changes the data-value of the vertical controls when going through each horizontal slide
    function updateVerticalControl(index){
      document.querySelector('.glide__arrow--up').setAttribute('data-arrow-up', index);
      document.querySelector('.glide__arrow--down').setAttribute('data-arrow-down', index);
    }
    //Adds disable classes to relevant navigation controls when active vertical slide is first or last
    function updateVerticalClasses(instance){
      let slide = instance.details().relativeSlide;
      let arrowUp = document.querySelector(`.glide__arrow--up[data-arrow-up="${glideHorizontalGlider.index}"]`);
      let arrowDown = document.querySelector(`.glide__arrow--down[data-arrow-down="${glideHorizontalGlider.index}"]`);
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
     * This is due each vertical slide initialising on the same one control
     * To avoid confusion, this function refreshes and reinitialises the vertical destination slide when moving the horizontal slide
     * Best way is to just move the current slide instead of everything but need to look into that more
     */
    glideHorizontalGlider.on('run', function(){
      const ghIndex = glideHorizontalGlider.index
      updateHorizontalClasses(ghIndex);
      updateVerticalControl(ghIndex);
      currentVerticalSlide = createVerticalSlide(ghIndex);
    });
    /**
     * Have to manually disable the horizontal slide if active slide is either first or last
     * Clicking on navigation buttons is already handled by the disable css classes but we have to disable keyboard shortcuts
     */
    document.addEventListener('keydown', function(event){
      const ghIndex = glideHorizontalGlider.index;
      if(event.keyCode === 37){
        if(ghIndex - 1 < 0){
          glideHorizontalGlider.disable();
        }else if(ghIndex - 1 >= 0){
          glideHorizontalGlider.enable();
        }
      }
      if(event.keyCode === 39){
        if(ghIndex + 1 === dummyData.length){
          glideHorizontalGlider.disable();
        }else if(ghIndex + 1 < dummyData.length){
          glideHorizontalGlider.enable();
        }
      }
    })
    //Initial setup of css classes
    glideHorizontalGlider.on('mount.after', function(){
      updateHorizontalClasses(glideHorizontalGlider.index);
      currentVerticalSlide = createVerticalSlide(glideHorizontalGlider.index);
    })
    //Mounts horizontal glider to dom
    glideHorizontalGlider.mount();
  }
}
