import React from 'react';
import BP from '../BP/BP.js';

import DOAPI from '../../actions/DOAPI.js';

import User from '../../stores/User.js';

import './Header.css';

class Header extends BP{
  constructor(){
    super();
    DOAPI.trigger('getUser');
    this.state={
      email:User.email,
      hash:User.hash
    }
  }

  componentDidMount(){
    this.updateScope=this.update.bind(this);

    User.on(
      'update',
      this.updateScope
    );
  }

  componentWillUnmount(){
    User.off('update',this.updateScope);
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.state.email==nextState.email&&this.state.hash==nextState.hash){
      return false;
    }
    return true;
  }

  update(){
    this.setState(
      {
        email:User.email,
        hash:User.hash
      }
    );
  }


  render(){
    return (
      <header>
        <img
          className='user-avatar'
          alt='user avatar'
          src={
            `https://secure.gravatar.com/avatar/${this.state.hash}?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault${Math.ceil(Math.random()*45)}.png&secure=true`
          }
        />
        <p>
          {this.state.email||''}
        </p>
      </header>
    );
  }
}

export default Header;
