import React from 'react';
import $ from "jquery";
import AmCharts from "@amcharts/amcharts3-react";
import {Thumbnail} from 'react-bootstrap';

export class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chart_data: {
                earned_report_chart: [],
                bought_report_chart: [],
                sold_report_chart: [],
            },
            chart_date_format: "",
            filters_to_apply: props.filters_to_apply,
        }

        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/earnedboughtsold/",
            data: this.state.filters_to_apply,
        }).done((data) => {

            let earned_report_chart = data.earned_report_chart
            let bought_report_chart = data.bought_report_chart
            let sold_report_chart = data.sold_report_chart
            let chart_date_format = data.chart_date_format

            this.setState({
                chart_data: {
                    earned_report_chart: earned_report_chart,
                    bought_report_chart: bought_report_chart,
                    sold_report_chart: sold_report_chart,
                },
                chart_date_format: chart_date_format,
            })
            console.log("chart state: ")
            console.log(this.state)
        })
    }
    get_chart_options(chart_data) {

        console.log('chart')
        console.log(this.state)
        var return_dict = {
            "type": "serial",
            "theme": "light",
            "mouseWheelZoomEnabled": true,
            "dataProvider": chart_data,
            "dataDateFormat": this.state.chart_date_format,
            "valueAxes": [{
                "position": "bottom",
                "offset": 0,
            }, {
                "id": "valueAxis",
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0,
                "position": "left",
            }],
            "gridAboveGraphs":
                true,
            "startEffect": "easeOutSine",
            "startDuration": 0.25,
            "responsive": {
                "enabled": true
            },
            "graphs": [{
                "balloonText": " [[valueField]] <br><b style='font-size:20px;'>$ [[data_sum]] : [[date]]</b>",
                "fillAlphas": 0.3,
                "lineAlpha": 0.5,
                "bullet": "round",
                "lineThickness": 3,
                "bulletSize": 1,
                "bulletBorderAlpha": 1,
                "bulletColor": "#FFFFFF",
                "useLineColorForBulletBorder": true,
                "bulletBorderThickness": 3,
                "valueField": "data_sum",
                "valueAxis": "boughtAxis"
            },
            ],
            "chartCursor": {
                "categoryBalloonEnabled":
                    false,
                "cursorAlpha":
                    0,
                "zoomable":
                    true
            }
            ,
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "dashLength": 1,
                "minPeriod": "mm",
                "minorGridEnabled": true,
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 2
            },
            "export": {
                "enabled":
                    false
            }
        }
        return return_dict

    }

    render() {
        return (
            <div>
                <Thumbnail>
                    <AmCharts.React
                        style={{
                            width: "100%",
                            height: "40vmin"
                        }}
                        options={
                            this.get_chart_options(this.state.chart_data.earned_report_chart)

                        }/>
                </Thumbnail>
                <Thumbnail>
                    <AmCharts.React
                        style={{
                            width: "100%",
                            height: "40vmin"
                        }}
                        options={
                            this.get_chart_options(this.state.chart_data.bought_report_chart)

                        }/>
                </Thumbnail>
                <Thumbnail>
                    <AmCharts.React
                        style={{
                            width: "100%",
                            height: "40vmin"
                        }}
                        options={
                            this.get_chart_options(this.state.chart_data.sold_report_chart)

                        }/>
                </Thumbnail>
            </div>
        )
    }
}

export default Chart;