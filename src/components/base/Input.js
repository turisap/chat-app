import React, { Component }from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    constructor(props) {
        super(props);
        this.label = props.label;
        this.type = props.type;
        this.placeHolder = props.placeHolder;
        this.id = props.id;
        this.className = props.className;
        this.error = props.error;
        this.onChange = props.onChange;
        this.state = {
            value : null,
            error : ""
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.error && !this.state.error) {
            this.setState({error:prevProps.error})
        }
    }

    static propTypes = {
        type : PropTypes.string.isRequired,
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({value : e.target.value})
        if (this.onChange) this.onChange(e);
    };


    render() {
        return(
            <React.Fragment>
                {this.label && <label>{this.label}</label>}
                <input
                    type={this.type}
                    placeholder={this.placeHolder}
                    onChange={this.handleChange}
                    id={this.id}
                    className={this.className}
                />
               <div className={'error'}>{this.state.error}</div>
            </React.Fragment>
        )
    }
}

export default Input;