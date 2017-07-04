import React from 'react';
// import Phone from './iphone.png';
import ShowCase from './Showcase';
import Form from './Form';

export default function LoginPage () {
  return (
    <div>
    <span className="login"><ShowCase className="showcase" />
    <span><p>This is text</p><p>More text on same line</p></span>
    <Form className="form" /></span>
    </div>
    );
}

    // <a href={'/api/auth/google'}>This is Login with Google</a>
