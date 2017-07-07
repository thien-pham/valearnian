import React from 'react';
import * as Cookies from 'js-cookie';

export default class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then((user) => {
            this.setState({
                name: user.name
            })
          }
        );
    }

    render() {
        console.log('USERNAME', this.state.name);
        return (
                <h3>{this.state.name}</h3>
        );
    }
}
