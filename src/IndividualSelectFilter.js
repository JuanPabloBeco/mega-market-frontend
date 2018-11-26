import React from 'react';
import {form, FormGroup, FormControl, ControlLabel, Thumbnail} from 'react-bootstrap';

export class IndividualSelectFilter extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.options)
        const options =  this.props.options
        return (
            <FormGroup controlId={this.props.name}>
                <ControlLabel>{this.props.label}</ControlLabel><FormControl
                componentClass="select"
                placeholder="select"
                name={this.props.name}
                onChange={this.props.onChange}
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