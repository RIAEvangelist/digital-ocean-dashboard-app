'use strict';
import actions from '../actions/DOAPI.js';
const Events=window.electronRequire('event-pubsub');

class Droplets extends Events {
  constructor(){
    super();

    this.droplets=localStorage.getItem('droplets')||'[]';
    this.droplets=JSON.parse(this.droplets);

    actions.results.on(
      'gotDroplets',
      this.map.bind(this)
    );
  }

  map(data){
    console.log(data);
    this.droplets=Object.assign([],data);

    delete this.droplets._digitalOcean;
    this.trigger('update');

    localStorage.setItem('droplets',JSON.stringify(this.droplets));
  }
}

export default new Droplets;
