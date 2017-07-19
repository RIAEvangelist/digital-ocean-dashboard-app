'use strict';
import actions from '../actions/DOAPI.js';
const Events=window.electronRequire('event-pubsub');

class Droplets extends Events {
  constructor(){
    super();

    actions.results.on(
      'gotDroplets',
      this.map
    );
  }

  map(data){

    this.trigger('update');

  }
}

export default new Droplets;
