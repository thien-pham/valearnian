import React, { Component } from 'react';
import './form.css';

export default class Form extends Component {
  render () {
    return (
      <div className="form">
        <form>
          <a href={'/api/auth/google'}>Log in with Google</a>
          <hr />
          <input type="text" placeholder="Enter Username"/>
          <input type="password" placeholder="Enter Password"/>
          <button>Sign up / Log in</button>
        </form>
      </div>
    );
  }
}
