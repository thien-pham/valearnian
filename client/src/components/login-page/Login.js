import React, { Component } from 'react';
import './login.css';
import Logo from './valearnian.jpg';

export default class Login extends Component {
  render () {
    return (
      <div className="loginPage">
        <img src={Logo} height='450px' role="presentation"/>
      <div className="loginForm">
        <form>
          <a href="https://fontmeme.com/game-of-thrones-font/"><img src="https://fontmeme.com/permalink/170707/ba6c0e8707d0a9dc598d3d25289b27f2.png" alt="game-of-thrones-font" /></a>

          <a href={'/api/auth/google'}>Log in with Google to learn Valerian through Spaced Repetition.</a>
          <hr />
          <input type="text" placeholder="Enter Username"/>
          <input type="password" placeholder="Enter Password"/>
          <button>Sign up / Log in</button>
        </form>
      </div>
    </div>
    );
  }
}
