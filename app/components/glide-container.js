import Component from '@glimmer/component';
import { action } from '@ember/object';
import Glide from '@glidejs/glide';

export default class GlideContainerComponent extends Component {
  @action 
  onLoad(){
    const horizontalGlider = new Glide('.GlideHorizontalGlider', {
      type: 'slider',
      perView: 1,
    });
    horizontalGlider.mount();
  }
}
