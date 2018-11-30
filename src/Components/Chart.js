import React from 'react';
import $ from "jquery";
import AmCharts from "@amcharts/amcharts3-react";
import {Thumbnail} from 'react-bootstrap';
import PropTypes from 'prop-types';


export class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chartData: {
                earnedReportChart: [],
                boughtReportChart: [],
                soldReportChart: [],
            },
            chartDateFormat: "",
            isChartDataValid: false,
        }
    }

    refreshChartData(filtersToApply){
        let filtersToApplyStr = filtersToApply
        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/api/earnedboughtsold/",
            data: filtersToApplyStr,
        }).done((data) => {

            let earnedReportChart = data.earned_report_chart
            let boughtReportChart = data.bought_report_chart
            let soldReportChart = data.sold_report_chart
            let chartDateFormat = data.chart_date_format

            this.setState({
                chartData: {
                    earnedReportChart: earnedReportChart,
                    boughtReportChart: boughtReportChart,
                    soldReportChart: soldReportChart,
                },
                chartDateFormat: chartDateFormat,
                isChartDataValid: true,
            })
            console.log("chart state: ")
            console.log(this.state)
        })
    }

    componentWillReceiveProps(){
        console.log('COMPONENT WILL RECEIVE PROPS!')
        console.log(this.props.filtersToApply)
        this.setState({
            isChartDataValid: false,
        })
    }

    componentWillUpdate(){
        console.log('COMPONENT WILL UPDATEEEEEE!!!!! filters 2 apply')
        console.log(this.props.filtersToApply)
        // this.setState({
        //     isChartDataValid: false,
        // })
    }

    getChartOptions(chartData, dateFormat) {
        let returnDict = {
            "type": "serial",
            "theme": "light",
            "mouseWheelZoomEnabled": true,
            "dataProvider": chartData,
            "dataDateFormat": dateFormat,
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
        return returnDict
    }

    render() {
        if (this.state.isChartDataValid) {
            console.log("UPDATING CHARTS!!!!")
            console.log(this.state)
            return (
                <div>
                    <Thumbnail>
                        <AmCharts.React
                            style={{
                                width: "100%",
                                height: "40vmin"
                            }}
                            options={this.getChartOptions(
                                this.state.chartData.earnedReportChart,
                                this.state.chartDateFormat,
                            )}/>
                    </Thumbnail>
                    <Thumbnail>
                        <AmCharts.React
                            style={{
                                width: "100%",
                                height: "40vmin"
                            }}
                            options={this.getChartOptions(
                                this.state.chartData.boughtReportChart,
                                this.state.chartDateFormat,
                            )}/>
                    </Thumbnail>
                    <Thumbnail>
                        <AmCharts.React
                            style={{
                                width: "100%",
                                height: "40vmin"
                            }}
                            options={this.getChartOptions(
                                this.state.chartData.soldReportChart,
                                this.state.chartDateFormat,
                            )}/>
                    </Thumbnail>
                </div>
            )
        }
        else {
            console.log('CALLING API!!!!!')
            console.log(this.props.filtersToApply)
            this.refreshChartData(this.props.filtersToApply)
            return(<div>Rendering</div>)
        }
    }
}

export default Chart;

Chart.propTypes = {
    filtersToApply: PropTypes.object.isRequired,
}
