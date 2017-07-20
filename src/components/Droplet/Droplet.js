import React from 'react';
import BP from '../BP/BP.js';
import Toggle from '../Toggle/Toggle.js';

import DOAPI from '../../actions/DOAPI.js';

import './Droplet.css';

class Droplet extends BP{
  constructor(){
    super();

    this.state={};
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextProps){
      this.setState(nextProps);
    }
    return true;
  }

  toggleDropletPower(e){
    DOAPI.setPowered(e.target.checked,this.props.id);
    this.setState(
      {
        status:'archive'
      }
    );
    console.log(e.target.checked,this.state);
  }

  render(){
    return (
      <li className={`droplet ${this.state.status||this.props.status}`}>
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
          <button>
            𝍢
          </button>
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
            ${this.props.size.price_hourly.toFixed(2)}/hr
          </li>
        </ul>
        <section className='menu'>
        <Toggle
          is_on={
            (this.props.status!=='off')? true:false
          }

          disabled={
            (this.props.status=='archived')? true:false
          }

          onChange={this.toggleDropletPower.bind(this)}
        />
        </section>
      </li>
    );
  }
}

export default Droplet;
