import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class NavBar extends Component {
  render () {
    return (
      <div className={'container'}>
        <Navbar className={'navbar navbar-inverse'}/>
        <form className={'navbar-form navbar-right'}>
            <div className={'form-group'}>
              <input type={'text'} placeholder={'Score'} className={'form-control'} />
            </div>
          </form>
      </div>
    );
  }
}


// const mapStateToProps = (state) => ({
//     score
// });
// export default connect(mapStateToProps)(Navbar);
