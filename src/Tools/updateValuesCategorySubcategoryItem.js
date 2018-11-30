export function updateValuesModifyingCategory(filterValues) {
    return filterValues;
}

export function updateValuesModifyingSubcategory(filterValues, newCurrentOptions) {
//update values
    let newFilterValues = filterValues
    newFilterValues['categories'] = newCurrentOptions.categoriesOptions[0].value;
    newFilterValues['subcategories'] = newCurrentOptions.subcategoriesOptions[0].value;
    return newFilterValues
}

export function updateValuesModifyingItem(filterValues, newCurrentOptions) {
//update values
    let newFilterValues = filterValues
    newFilterValues['categories'] = newCurrentOptions.categoriesOptions[0].value;
    newFilterValues['subcategories'] = newCurrentOptions.subcategoriesOptions[0].value;
    newFilterValues['items'] = newCurrentOptions.itemsOptions[0].value;
    return newFilterValues
}
