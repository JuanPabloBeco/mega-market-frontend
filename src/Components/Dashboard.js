import React from 'react';
import $ from "jquery";
import GeneralLayoutController from "./GeneralLayoutController";
import {getArrayForOptions} from "../Tools/filterOptionsTools";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Full filter options
            filterOptions: {
                chartDateFormat: "",
                categoriesSubcategoriesItemsFilterOptions: [],
                geoFilterOptions: [],
                targetUserFilterOptions: [],
                refreshIntervalMilliseconds: "",
            },
            //Chart data
            filtersToApply: props.filtersToApply,
            optionsLoaded: false,
        };

        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/filters/",
        }).done((data) => {
            data.categories_subcategories_items_filter_options = JSON.parse(data.categories_subcategories_items_filter_options)
            data.geo_filter_options = JSON.parse(data.geo_filter_options)
            data.geo_filter_options = getArrayForOptions(data.geo_filter_options, 'city_and_country')
            data.target_user_filter_options = JSON.parse(data.target_user_filter_options)
            data.target_user_filter_options = getArrayForOptions(data.target_user_filter_options, 'name')
            this.setState({
                filterOptions: {
                    chartDateFormat: data.chart_date_format,
                    categoriesSubcategoriesItemsFilterOptions: data.categories_subcategories_items_filter_options,
                    geoFilterOptions: data.geo_filter_options,
                    targetUserFilterOptions: data.target_user_filter_options,
                    refreshIntervalMilliseconds: data.refresh_interval_milliseconds,
                },
                optionsLoaded: true,
            })
            console.log('Ajax filter options call')
            console.log(this.state)
        })

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(filtersToApply) {
        this.setState({
            filtersToApply: filtersToApply
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        console.log('Dashboard:')
        console.log(this.state)
        //If the API response with the filter options haven't arrived a Loading message is returned
        if( !this.state.optionsLoaded ){
            return <div>Loading</div>
        }
        //If they're ok
        return (
            <GeneralLayoutController
                filterOptions={this.state.filterOptions}

                filterChange={this.handleInputChange}
                submitForm={this.handleSubmit}
            />
        );
    }
}

export default Dashboard;

