import React, { Component }from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
    constructor(props) {
        super(props);
        this.label = props.label;
        this.type = props.type;
        this.placeHolder = props.placeholder;
        this.id = props.id;
        this.class = props.class;
        this.error = props.error;
        this.onChange = props.onChange;
        this.state = {
            value : null,
            error : ""

        }

    }

    static propTypes = {
        type : PropTypes.string.isRequired,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.error && !this.state.error) {
            this.setState({error:prevProps.error})
        }
    }


    handleChange = (e) => {
        e.preventDefault();
        this.setState({value : e.target.value});
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
                    className={this.class}
                />
               <div className={'error'}>{this.state.error}</div>
            </React.Fragment>
        )
    }
}

export default Input;