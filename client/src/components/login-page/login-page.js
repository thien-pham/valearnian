import React, { Component } from 'react';
import Logo from './valearnian.jpg';
import './login-page.css';

export default class LoginPage extends Component {

  login() {
    location.href='/api/auth/google';
  }


  render () {
    return (
      <div className="loginPage">
        <img src={Logo} height='460px' role="presentation"/>
        <form className="loginForm">
          <a href="https://fontmeme.com/game-of-thrones-font/"><img src="https://fontmeme.com/permalink/170707/ba6c0e8707d0a9dc598d3d25289b27f2.png" alt="game-of-thrones-font" /></a>
          <h4>Learn Valyrian* through Spaced Repetition</h4>
          <a href={'/api/auth/google'} className="login">Log in with Google</a>
          <p>*As popularized from George R. R. Martin's bestselling series, <i>A Song of Ice and Fire</i>, and adapted into the HBO hit <i>Game of Thrones</i>.</p>
        </form>

    </div>
    );
  }
}
