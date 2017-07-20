'use strict';
import actions from '../actions/DOAPI.js';
const Events=window.electronRequire('event-pubsub');
const crypto=window.electronRequire('crypto');

class User extends Events {
  constructor(){
    super();

    this.dropletLimit=0;
    this.email=localStorage.getItem('userEmail');
    this.emailVerified=false;
    this.floatingIPLimit=0;
    this.status='';
    this.statusMessage='';
    this.hash=localStorage.getItem('userHash');
    this.rateLimit=0;
    this.rateLimitRemaining=0;
    this.rateLimitReset=0;

    actions.results.on(
      'gotUser',
      this.map.bind(this)
    );

    actions.results.on(
      '*',
      this.mapRateLimits.bind(this)
    );
  }

  map(data){
    this.dropletLimit=data.droplet_limit;
    this.email=data.email;
    this.emailVerified=data.email_verified;
    this.floatingIPLimit=data.floating_ip_limit;
    this.status=data.status;
    this.statusMessage=data.status_message;

    this.hash=crypto.createHash('md5').update(this.email).digest("hex");

    this.trigger('update');


    localStorage.setItem('userEmail',this.email);
    localStorage.setItem('userHash',this.hash);
  }

  mapRateLimits(data){
    this.rateLimit=data['ratelimit-limit'];
    this.rateLimitRemaining=data['ratelimit-remaining'];
    this.rateLimitReset=['data.ratelimit-reset'];

    this.trigger('update');

  }
}

export default new User;
