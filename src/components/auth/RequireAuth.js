/**
 * Created by HP on 23-Dec-17.
 */
/**
 * This is a HOC for authentication purposes
 * @param ComposedComponent
 * @returns {Authentication}
 */
import React from 'react';
import {connect} from 'react-redux';


export default (ComposedComponent) => {
    /* eslint-disable react/prop-types */
    class Authentication extends React.Component {

        /**
         * If user isn't authenticated, redirect him on component mount
         */
        UNSAFE_componentWillMount() {
            if(!this.props.authenticated) {
                this.props.history.push('/signin');
            }
        }

        /**
         * Redirects user from the component after one sign out
         * @param nextProps
         */
        UNSAFE_componentWillUpdate(nextProps) {
            if(!nextProps.authenticated) {
                this.props.history.push('/signin');
            }
        }

        /**
         * Renders a passed component (pages which require authentication in this case)
         * @returns {XML}
         */
        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    const mapStateToProps = state => ({
        authenticated : state.userData.authenticated
    });


    return connect(mapStateToProps, undefined)(Authentication);
}