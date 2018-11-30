import React from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import PropTypes from 'prop-types';

export class IndividualSelectFilter extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.onchange(name, value);
    }

    render() {
        console.log(this.props.options)
        const options = this.props.options
        return (
            <FormGroup controlId={this.props.name}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    name={this.props.name}
                    onChange={this.handleChange}
                    value={this.props.value}
                >
                    <option value="-1">All</option>
                    {options.map((e, key) => {
                        return <option key={e.value} value={e.value}>{e.name}</option>;
                    })}
                </FormControl>
            </FormGroup>
        );
    }
}

IndividualSelectFilter.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onchange: PropTypes.func.isRequired,
};
