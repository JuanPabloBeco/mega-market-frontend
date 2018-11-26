import $ from "jquery";
import React from 'react';
import { Thumbnail } from 'react-bootstrap'


export class AjaxTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter_options: {
                chart_date_format: "",
                categories_subcategories_items_filter_options: "",
                geo_filter_options: "",
                target_user_filter_options: "",
                refresh_interval_milliseconds: "",
            },
        };
    }

    componentDidMount() {
        /*

        The filter response is a dictionary with :
            chart_date_format
            categories_subcategories_items_filter_options
            geo_filter_options
            target_user_filter_options
            refresh_interval_milliseconds
        */

        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/filters/",
        }).done((data) => {
            console.log("1")
            data.categories_subcategories_items_filter_options = JSON.parse(data.categories_subcategories_items_filter_options)
            data.geo_filter_options = JSON.parse(data.geo_filter_options)
            data.target_user_filter_options = JSON.parse(data.target_user_filter_options)
            this.setState({
                filter_options : data,
            })
            console.log(data)
        })
    }

    render() {
        return (
            <Thumbnail>
                <p>
                    {this.state.filter_options.chart_date_format}
                </p>
            </Thumbnail>
        );
    }
}

export default AjaxTest;
