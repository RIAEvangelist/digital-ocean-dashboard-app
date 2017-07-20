import React from 'react';
import BP from '../BP/BP.js';

import './Droplet.css';

class Droplet extends BP{
  constructor(){
    super();
  }

  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

  render(){
    return (
      <li className='droplet'>
        <h3 className='blueText'>
          {this.props.name}
        </h3>
        <ul>
          <li>
            {this.props.vcpus} cores
          </li>
          <li>
            {this.props.size.memory/1024}Gb ram
          </li>
          <li>
            {this.props.size.disk}Gb disk
          </li>
          <li>
            ${this.props.size.price_hourly}/hr
          </li>
          <li>
            ${this.props.size.price_monthly}/month
          </li>
          <li>
            {this.props.networks.v4[0].type} IP {this.props.networks.v4[0].ip_address}
          </li>
          <li>
            {this.props.image.distribution}
          </li>
        </ul>
      </li>
    );
  }
}

export default Droplet;
