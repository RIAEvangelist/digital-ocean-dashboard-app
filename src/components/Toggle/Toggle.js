import React from 'react';
import BP from '../BP/BP.js';

import './Toggle.css';

class Toggle extends BP{
  constructor(){
    super();

    this.props={
      is_on:false,
      disabled:false,
      off:'off',
      on:'on'
    };
  }

  shouldComponentUpdate(){
    return true;
  }

  render(){
    return (
      <span className='toggle'>
        <input type='checkbox'
          checked={this.props.is_on}
          disabled={this.props.disabled}
          onChange={this.props.onChange}
        />
        <label data-off={this.props.off||'off'} data-on={this.props.on||'on'}></label>
      </span>
    );
  }
}

export default Toggle;
