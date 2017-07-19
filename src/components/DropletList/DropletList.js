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
      droplets:[]
    }
  }

  componentDidMount(){
    Droplets.on('update',this.update);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.state.droplets.length!==nextState.droplets.length){
      return false;
    }
    return true;
  }

  update(){
    this.setState(
      {

      }
    );
  }

  render(){
    return (
      <ol>
        <li>empty</li>
      </ol>
    );
  }
}

export default DropletList;
