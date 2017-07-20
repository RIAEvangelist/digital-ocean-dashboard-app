import React from 'react';
import BP from '../BP/BP.js';

import DOAPI from '../../actions/DOAPI.js';
import Droplets from '../../stores/Droplets.js';

import Droplet from '../Droplet/Droplet.js';

import './DropletList.css';

class DropletList extends BP{
  constructor(){
    super();
    DOAPI.trigger('getDroplets');
    this.state={
      droplets:Droplets.droplets
    }
  }

  componentDidMount(){
    this.updateScope=this.update.bind(this);
    Droplets.on('update',this.updateScope);
  }

  componentWillUnmount(){
    Droplets.off('update',this.updateScope);
  }

  shouldComponentUpdate(nextProps,nextState){
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
      <ol className='dropletList'>
        {
          this.state.droplets.map(
            function(droplet){
              return(
                <Droplet {...droplet} />
              );
            }
          )
        }
      </ol>
    );
  }
}

export default DropletList;
