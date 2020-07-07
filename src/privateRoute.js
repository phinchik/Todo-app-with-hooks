import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        render() {
            if (!this.props.loggedInUser) {
                return <Redirect to='/login' />
            }

            return <ComposedComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {
            loggedInUser: state.auth.loggedInUser
        };
    };

    return connect(mapStateToProps)(Authenticate);
}