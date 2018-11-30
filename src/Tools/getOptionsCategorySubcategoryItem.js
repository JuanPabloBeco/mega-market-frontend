import {getArrayForOptions, getLowerLevelObjects} from "./filterOptionsTools";
import {findCategorySubcategoryOrItem, findCategorySubcategoryOrItemParent} from "./filterObjectsTools";

export function getCategoryOptions(filterOptions, filterValues, currentName, currentValue, currentOptions) {
    let categoriesSubcategoriesItemsObjects = filterOptions.categoriesSubcategoriesItemsFilterOptions;

    let currentCategoryArray = [];

    let currentCategoryOptionArray;
    let currentSubcategoryOptionArray;
    let currentItemOptionArray;

    //update values
    let newFilterValues = filterValues
    newFilterValues[currentName] = currentValue;

    let newCurrentOptions
    //Select current objects
    for (let i = 0; i < categoriesSubcategoriesItemsObjects.length; i++) {
        if (categoriesSubcategoriesItemsObjects[i].id.toString() === currentValue) {
            currentCategoryArray.push(categoriesSubcategoriesItemsObjects[i]);
        }
    }
    let currentSubcategoryArray = getLowerLevelObjects(currentCategoryArray, 'subcategories');
    let currentItemArray = getLowerLevelObjects(currentSubcategoryArray, 'items');

    currentCategoryOptionArray = getArrayForOptions(categoriesSubcategoriesItemsObjects, 'name');
    currentSubcategoryOptionArray = getArrayForOptions(currentSubcategoryArray, 'name');
    currentItemOptionArray = getArrayForOptions(currentItemArray, 'name');

    newCurrentOptions = {
        itemsOptions: currentItemOptionArray,
        subcategoriesOptions: currentSubcategoryOptionArray,
        categoriesOptions: currentCategoryOptionArray,
        geoOptions: currentOptions.geoOptions,
        targetUserOptions: currentOptions.targetUserOptions,
    }
    return newCurrentOptions;
}

export function getSubcategoriesOptions(filterOptions, currentValue, currentName, currentOptions) {
    let categoriesSubcategoriesItemsObjects = filterOptions.categoriesSubcategoriesItemsFilterOptions;

    let currentCategoryArray = [];
    let currentSubcategoryArray = [];
    let currentItemArray = [];

    let currentCategoryOptionArray;
    let currentSubcategoryOptionArray;
    let currentItemOptionArray;


    let newCurrentOptions
    currentCategoryArray.push(findCategorySubcategoryOrItemParent(
        currentValue,
        currentName,
        categoriesSubcategoriesItemsObjects
    ));
    currentSubcategoryArray.push(findCategorySubcategoryOrItem(
        currentValue,
        currentName,
        categoriesSubcategoriesItemsObjects
    ));
    currentItemArray = getLowerLevelObjects(currentSubcategoryArray, 'items');

    currentCategoryOptionArray = getArrayForOptions(currentCategoryArray, 'name');
    currentSubcategoryOptionArray = getArrayForOptions(currentSubcategoryArray, 'name');
    currentItemOptionArray = getArrayForOptions(currentItemArray, 'name');

    newCurrentOptions = {
        itemsOptions: currentItemOptionArray,
        subcategoriesOptions: currentSubcategoryOptionArray,
        categoriesOptions: currentCategoryOptionArray,
        geoOptions: currentOptions.geoOptions,
        targetUserOptions: currentOptions.targetUserOptions,
    }
    return newCurrentOptions;
}

export function getItemsOptions(filterOptions, currentValue, currentName, currentOptions) {
    let categoriesSubcategoriesItemsObjects = filterOptions.categoriesSubcategoriesItemsFilterOptions;

    let currentCategoryArray = [];
    let currentSubcategoryArray = [];
    let currentItemArray = [];

    let currentCategoryOptionArray;
    let currentSubcategoryOptionArray;
    let currentItemOptionArray;

    let newCurrentOptions

    currentItemArray.push(findCategorySubcategoryOrItem(
        currentValue,
        currentName,
        categoriesSubcategoriesItemsObjects
    ));
    currentSubcategoryArray.push(findCategorySubcategoryOrItemParent(
        currentItemArray[0].id,
        'item',
        categoriesSubcategoriesItemsObjects
    ));
    currentCategoryArray.push(findCategorySubcategoryOrItemParent(
        currentSubcategoryArray[0].id,
        'subcategories',
        categoriesSubcategoriesItemsObjects
    ));

    currentCategoryOptionArray = getArrayForOptions(currentCategoryArray, 'name');
    currentSubcategoryOptionArray = getArrayForOptions(currentSubcategoryArray, 'name');
    currentItemOptionArray = getArrayForOptions(currentItemArray, 'name');

    newCurrentOptions = {
        itemsOptions: currentItemOptionArray,
        subcategoriesOptions: currentSubcategoryOptionArray,
        categoriesOptions: currentCategoryOptionArray,
        geoOptions: currentOptions.geoOptions,
        targetUserOptions: currentOptions.targetUserOptions,
    }
    return newCurrentOptions;
}