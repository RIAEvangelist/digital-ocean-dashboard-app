import React from 'react';
import BP from '../BP/BP.js';

import DOAPI from '../../actions/DOAPI.js';

import Droplets from '../../stores/Droplets.js';

import './DropletList.css';

class DropletList extends BP{
  constructor(){
    super();
    DOAPI.trigger('getDroplets');
    this.state={
      droplets:Droplets.droplets
    }

    console.log(this.state)
  }

  componentDidMount(){
    this.updateScope=this.update.bind(this);
    Droplets.on('update',this.updateScope);
  }

  componentWillUnmount(){
    Droplets.off('update',this.updateScope);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.state.droplets.length==nextState.droplets.length){
      const count=this.state.droplets.length;
      if(
        count>0
        && nextState.droplets[0].id!==this.state.droplets[0].id
        || nextState.droplets[count-1].id!==this.state.droplets[count-1].id
      ){
        return true;
      }
      return false;
    }
    return true;
  }

  update(){
    this.setState(
      {
        droplets:Droplets.droplets
      }
    );
  }

  render(){
    return (
      <ol>
        {
          this.state.droplets.map(
            function(droplet){
              console.log(droplet)
              return(
                <li>
                  <ul>
                    <li>
                      {droplet.name}
                    </li>
                    <li>
                      {droplet.vcpus} cores
                    </li>
                    <li>
                      {droplet.size.memory/1024}Gb ram
                    </li>
                    <li>
                      {droplet.size.disk}Gb disk
                    </li>
                    <li>
                      ${droplet.size.price_hourly}/hr
                    </li>
                    <li>
                      ${droplet.size.price_monthly}/month
                    </li>
                    <li>
                      {droplet.networks.v4[0].type} IP {droplet.networks.v4[0].ip_address}
                    </li>
                    <li>
                      {droplet.image.distribution}
                    </li>
                  </ul>
                  <hr/>
                </li>
              );
            }
          )
        }
      </ol>
    );
  }
}

export default DropletList;
