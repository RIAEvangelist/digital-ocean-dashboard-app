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
        <div className='header'>
          <img className='distributionicon' src={`./icons/${this.props.image.distribution.toLowerCase()}.png`} />
          <div className='name'>
            <h3 className='blueText'>
              {this.props.name}
            </h3>
            <p className='ip'>
              {this.props.networks.v4[0].ip_address}
            </p>
          </div>
        </div>
        <table>
          <thead>
            <td>
              spec
            </td>
            <td>
              value
            </td>
          </thead>
          <tbody>
            <tr>
              <td>
                cpu
              </td>
              <td>
                {this.props.vcpus} cores
              </td>
            </tr>
            <tr>
              <td>
                RAM
              </td>
              <td>
                {this.props.size.memory/1024}Gb
              </td>
            </tr>
            <tr>
              <td>
                Disk Size
              </td>
              <td>
                {this.props.size.disk}Gb
              </td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li className='monthly blueText'>
            ${this.props.size.price_monthly}/month
          </li>
          <li className='hourly'>
            ${this.props.size.price_hourly}/hr
          </li>
        </ul>
      </li>
    );
  }
}

export default Droplet;
