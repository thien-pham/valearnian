import React from 'react';
// import Phone from './iphone.png';
import ShowCase from './Showcase';
import Form from './Form';

export default function LoginPage () {
  return (
    <div className="login">
    <ShowCase className="showcase" />
    <Form className="form" />
    </div>
    );
}

    // <a href={'/api/auth/google'}>This is Login with Google</a>
