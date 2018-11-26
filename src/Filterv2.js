import React from 'react';
import $ from "jquery";
import {form, FormGroup, FormControl, ControlLabel, Thumbnail} from 'react-bootstrap';
import './Filter.css';
import {IndividualSelectFilter} from "./IndividualSelectFilter";


class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter_options: {
                chart_date_format: "",
                categories_subcategories_items_filter_options: [],
                geo_filter_options: [],
                target_user_filter_options: [],
                refresh_interval_milliseconds: "",
            },
            items_options: [],
            subcategories_options: [],
            categories_options: [],
            geo_options: [],
            target_user_options: [],

            geos: "-1",
            target_users: "-1",
            items: "-1",
            subcategories: "-1",
            categories: "-1",

            isGoing: true,
            numberOfGuests: 2,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/filters/",
        }).done((data) => {
            data.categories_subcategories_items_filter_options = JSON.parse(data.categories_subcategories_items_filter_options)

            let category_array = data.categories_subcategories_items_filter_options
            let subcategory_array = get_lower_level_objects(category_array,"subcategories")
            let item_array = get_lower_level_objects(subcategory_array,"items")

            let category_option_array = get_array_for_options(category_array, 'name')
            let subcategory_option_array = get_array_for_options(subcategory_array, 'name')
            let item_option_array = get_array_for_options(item_array, 'name')

            data.geo_filter_options = JSON.parse(data.geo_filter_options)
            data.geo_filter_options = get_array_for_options(data.geo_filter_options, 'city_and_country')
            data.target_user_filter_options = JSON.parse(data.target_user_filter_options)
            data.target_user_filter_options = get_array_for_options(data.target_user_filter_options, 'name')
            this.setState({
                filter_options: data,
                items_options: item_option_array,
                subcategories_options: subcategory_option_array,
                categories_options: category_option_array,
                geo_options: data.geo_filter_options,
                target_user_options: data.target_user_filter_options,
            })
            console.log(this.state)
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        this.setState({
            ["items"]: "1"
        });
        event.preventDefault();
    }

    render() {
        console.log(this.state)
        return (
            <Thumbnail className="Filter" >
                <form onSubmit={this.handleSubmit}>
                    <IndividualSelectFilter
                        label="Items"
                        name="items"
                        options={this.state.items_options}
                        onChange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        label="Subcategories"
                        name="subcategories"
                        options={this.state.subcategories_options}
                        onChange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        label="Categories"
                        name="categories"
                        options={this.state.categories_options}
                        onChange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        label="Location"
                        name="geos"
                        options={this.state.geo_options}
                        onChange={this.handleInputChange}
                    />

                    <IndividualSelectFilter
                        label="Target user"
                        name="target_users"
                        options={this.state.target_user_options}
                        onChange={this.handleInputChange}
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
                        this.state.items
                    }</p>
                    <p> Subcategories:{
                        this.state.subcategories
                    }</p>
                    <p> Categories:{
                        this.state.categories
                    }</p>
                    <p> Geos:{
                        this.state.geos
                    }</p>
                    <p> Target_users:{
                        this.state.target_users
                    }</p>
                    </code>
                </pre>
            </Thumbnail>
        );
    }
}

export default Filter;

function get_array_for_options(object_list, value_name){
    return object_list.map(obj => {
    let rObj = {};
    rObj['value'] = obj.id.toString();
    rObj['name'] = obj[value_name];
    return rObj;
    })
}

function get_lower_level_objects(obj_array, lower_level_name) {
    let lower_lower_obj_array = [];
    for (let i = 0; i < obj_array.length; i++) {
        let obj = obj_array[i];
        lower_lower_obj_array = lower_lower_obj_array.concat(obj[lower_level_name]);
    }
    console.log(lower_lower_obj_array)
    return lower_lower_obj_array
}

