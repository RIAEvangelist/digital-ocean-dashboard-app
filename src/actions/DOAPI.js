'use strict';
const digitalOcean=window.electronRequire('digitalocean');
const fs=window.electronRequire('fs');
const Events=window.electronRequire('event-pubsub');

const DOKey=fs.readFileSync(`./DOKey`).toString()
  .replace(/\n/g,'');

const DO=new digitalOcean.client(DOKey);


class Actions extends Events{
  constructor(){
    super();

    this.results=new Results;

    this.on(
      'getUser',
      this.getUser
    );
    this.on(
      'getDroplets',
      this.getDroplets
    );
  }

  getUser(){
    DO.account.get()
      .then(this.results.gotUser.bind(this.results))
      .catch(this.error);
  }

  getDroplets(){
    DO.droplets.list()
      .then(this.results.gotDroplets.bind(this.results))
      .catch(this.error);
  }

  setPowered(setPowered=false,id){
    DO.droplets[
      ((!setPowered)? 'shutdown':'powerOn')
    ](id)
      .then(this.results.requestedPowerChange.bind(this.results))
      .catch(this.error);
  }

  error(err){
    console.warn('DOAPI Error')
    console.trace(err);
  }
}

class Results extends Events{
  constructor(){
    super();

  }

  gotUser(user){
    this.trigger('gotUser',user);
  }

  gotDroplets(droplets){
    this.trigger('gotDroplets',droplets);
  }

  requestedPowerChange(data){
    console.log(data);
  }
}

export default new Actions;
