import React from 'react';
import {FullChartFilter} from "./FullChartFilter"
import {Col, Grid, Row} from 'react-bootstrap';
import Chart from "./Chart";
import "../Tools/date_tools"
import PropTypes from 'prop-types';


import {getCategoriesSubcategoriesItemsOptions, getFiltersToApply} from "../Tools/filterOptionsTools";
import {
    updateValuesModifyingCategory,
    updateValuesModifyingItem,
    updateValuesModifyingSubcategory
} from "../Tools/updateValuesCategorySubcategoryItem";
import {getCategoryOptions, getItemsOptions, getSubcategoriesOptions} from "../Tools/getOptionsCategorySubcategoryItem";
import {findCategorySubcategoryOrItemParent} from "../Tools/filterObjectsTools";

class GeneralLayoutController extends React.Component {
    constructor(props) {
        super(props);

        let categoriesSubcategoriesItemsFilterOptions = getCategoriesSubcategoriesItemsOptions(
            this.props.filterOptions.categoriesSubcategoriesItemsFilterOptions)
        let geoFilterOptions = this.props.filterOptions.geoFilterOptions
        let targetUserFilterOptions = this.props.filterOptions.targetUserFilterOptions

        this.state = {
            // full_filterOptions: this.props.filterOptions,

            // These are the options in display right now not the full function
            currentOptions: {
                itemsOptions: categoriesSubcategoriesItemsFilterOptions.itemsOptions,
                subcategoriesOptions: categoriesSubcategoriesItemsFilterOptions.subcategoriesOptions,
                categoriesOptions: categoriesSubcategoriesItemsFilterOptions.categoriesOptions,
                geoOptions: geoFilterOptions,
                targetUserOptions: targetUserFilterOptions,
            },
            filtersToApply: {},
            filterValues: {
                geos: "-1",
                targetUsers: "-1",
                items: "-1",
                subcategories: "-1",
                categories: "-1",
            }
        };

        let firstFilterToApply = getFiltersToApply(this.state.filterValues);
        this.state.filtersToApply = firstFilterToApply;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(name, value) {
        let filtersValues = this.state.filterValues;
        filtersValues[name] = value;
        this.setState({
            filterValues: filtersValues,
        });

        let newFilterOptions = getFilterCurrentOptions(
            name,
            value,
            this.state.filterValues,
            this.props.filterOptions,
            this.state.currentOptions,
        )
        this.setState({
            currentOptions: newFilterOptions.currentOptions,
            filterValues: newFilterOptions.filterValues,
        })

        let filtersToApply = getFiltersToApply(this.state.filterValues);
        this.setState({
            filtersToApply: filtersToApply
        });
    }

    handleSubmit(event) {
        this.props.submitForm(event);
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        console.log('generalLayoutController, state:');
        console.log(this.state);
        console.log(this.state.filterToApply);
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={9} md={9} lg={9}>
                        <div className="App-chart">
                            <Chart filtersToApply={this.state.filtersToApply}/>
                        </div>

                    </Col>
                    <Col sm={3} md={3} lg={3}>
                        <FullChartFilter
                            itemsOptions={this.state.currentOptions.itemsOptions}
                            subcategoriesOptions={this.state.currentOptions.subcategoriesOptions}
                            categoriesOptions={this.state.currentOptions.categoriesOptions}
                            geoOptions={this.state.currentOptions.geoOptions}
                            targetUserOptions={this.state.currentOptions.targetUserOptions}

                            items={this.state.filterValues.items}
                            subcategories={this.state.filterValues.subcategories}
                            categories={this.state.filterValues.categories}
                            geos={this.state.filterValues.geos}
                            targetUsers={this.state.filterValues.targetUsers}

                            filterChange={this.handleInputChange}
                            submitForm={this.handleSubmit}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default GeneralLayoutController;

function getFilterCurrentOptions(currentName, currentValue, filterValues, filterOptions, currentOptions) {
    //update values
    let newFilterValues = filterValues;
    newFilterValues[currentName] = currentValue;

    let newCurrentOptions = currentOptions;

    //getCategoriesOptions

    if (currentValue === '-1') {
        //update options
        let categoriesSubcategoriesItemsFilterOptions = getCategoriesSubcategoriesItemsOptions(
            filterOptions.categoriesSubcategoriesItemsFilterOptions);
        let geoFilterOptions = filterOptions.geoFilterOptions;
        let targetUserFilterOptions = filterOptions.targetUserFilterOptions;
        newCurrentOptions = {
            itemsOptions: categoriesSubcategoriesItemsFilterOptions.itemsOptions,
            subcategoriesOptions: categoriesSubcategoriesItemsFilterOptions.subcategoriesOptions,
            categoriesOptions: categoriesSubcategoriesItemsFilterOptions.categoriesOptions,
            geoOptions: geoFilterOptions,
            targetUserOptions: targetUserFilterOptions,
        }

        if (currentName === "categories") {
            newFilterValues['categories'] = '-1';
            newFilterValues['subcategories'] = '-1';
            newFilterValues['items'] = '-1';
        }
        else if (currentName === "subcategories") {
            newFilterValues['subcategories'] = '-1';
            newFilterValues['items'] = '-1';
        }
        else if (currentName === "items") {
            newFilterValues['items'] = '-1';
        }
    }
    else if (currentName === 'categories') {
        newCurrentOptions = getCategoryOptions(filterOptions, filterValues, currentName, currentValue, currentOptions);
        newFilterValues = updateValuesModifyingCategory(filterValues);
    }
    else if (currentName === 'subcategories') {
        newCurrentOptions = getSubcategoriesOptions(filterOptions, currentValue, currentName, currentOptions);
        newFilterValues = updateValuesModifyingSubcategory(filterValues, newCurrentOptions);
    }
    else if (currentName === 'items') {
        newCurrentOptions = getItemsOptions(filterOptions, currentValue, currentName, currentOptions);
        newFilterValues = updateValuesModifyingItem(filterValues, newCurrentOptions);
    }

    return {
        currentOptions: newCurrentOptions,
        filterValues: newFilterValues,
    }
}

GeneralLayoutController.propTypes = {
    filterOptions: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
}
