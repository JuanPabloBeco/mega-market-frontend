import React from 'react';
import {form, Thumbnail} from 'react-bootstrap';
import {IndividualSelectFilter} from "./IndividualSelectFilter";
import PropTypes from 'prop-types';


export class FullChartFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(name, value) {
        this.props.filterChange(name,value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitForm(event)
    }

    render() {
        return (
            <Thumbnail className="FullChartFilter" >
                <form onSubmit={this.handleSubmit}>
                    <IndividualSelectFilter
                        value={this.props.items}
                        label="Items"
                        name="items"
                        options={this.props.itemsOptions}
                        onchange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        value={this.props.subcategories}
                        label="Subcategories"
                        name="subcategories"
                        options={this.props.subcategoriesOptions}
                        onchange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        value={this.props.categories}
                        label="Categories"
                        name="categories"
                        options={this.props.categoriesOptions}
                        onchange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        value={this.props.geos}
                        label="Location"
                        name="geos"
                        options={this.props.geoOptions}
                        onchange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        value={this.props.targetUsers}
                        label="Target user"
                        name="targetUsers"
                        options={this.props.targetUserOptions}
                        onchange={this.handleInputChange}
                    />

                    <div className="field">
                        <div className="control">
                            <input type="submit" value="Update"/>
                        </div>
                    </div>
                </form>
                <pre>
                    <code>
                    <p> Items:{
                        this.props.items
                    }</p>
                    <p> Subcategories:{
                        this.props.subcategories
                    }</p>
                    <p> Categories:{
                        this.props.categories
                    }</p>
                    <p> Geos:{
                        this.props.geos
                    }</p>
                    <p> Target Users:{
                        this.props.targetUsers
                    }</p>
                    </code>
                </pre>
            </Thumbnail>
        );
    }
}

FullChartFilter.propTypes = {

    filterChange: PropTypes.func,
    submitForm: PropTypes.func,

    itemsOptions: PropTypes.array.isRequired,
    subcategoriesOptions: PropTypes.array.isRequired,
    categoriesOptions: PropTypes.array.isRequired,
    geoOptions: PropTypes.array.isRequired,
    targetUserOptions: PropTypes.array.isRequired,

    items: PropTypes.string.isRequired,
    subcategories: PropTypes.string.isRequired,
    categories: PropTypes.string.isRequired,
    geos: PropTypes.string.isRequired,
    targetUsers: PropTypes.string.isRequired,
};
