export function getCategoriesSubcategoriesItemsOptions(category_dict) {

    let categoryArray = category_dict
    let subcategoryArray = getLowerLevelObjects(categoryArray, "subcategories");
    let itemArray = getLowerLevelObjects(subcategoryArray, "items");

    let categoryOptionArray = getArrayForOptions(categoryArray, 'name');
    let subcategoryOptionArray = getArrayForOptions(subcategoryArray, 'name');
    let itemOptionArray = getArrayForOptions(itemArray, 'name');
    return {
        itemsOptions: itemOptionArray,
        subcategoriesOptions: subcategoryOptionArray,
        categoriesOptions: categoryOptionArray,
    }
}

export function getArrayForOptions(objectList, valueName) {
    return objectList.map(obj => {
        let rObj = {};
        rObj['value'] = obj.id.toString();
        rObj['name'] = obj[valueName];
        return rObj;
    })
}

export function getLowerLevelObjects(objArray, lowerLevelName) {
    let lowerLowerObjArray = [];
    for (let i = 0; i < objArray.length; i++) {
        let obj = objArray[i];
        lowerLowerObjArray = lowerLowerObjArray.concat(obj[lowerLevelName]);
    }
    console.log(lowerLowerObjArray)
    return lowerLowerObjArray
}

export function getFiltersToApply(filterValues) {
    console.log('filterValues:');
    console.log(filterValues);
    let filtersToApply = {};

    if (filterValues.categories !== "-1") {
        filtersToApply.item__sub_category__category_id = filterValues.categories;
        if (filterValues.subcategories !== "-1") {
            filtersToApply.item__sub_category_id = filterValues.subcategories;
            if (filterValues.items !== "-1") {
                filtersToApply.item_id = filterValues.items;
            }
        }
    }
    if (filterValues.geos !== "-1") {
        filtersToApply.geo_id = filterValues.geos
    }
    if (filterValues.targetUsers !== "-1") {
        filtersToApply.target_user_id = filterValues.targetUsers
    }

    if (filterValues.dateOptions === "custom_range") {
        let todayDate = new Date()

        if (filterValues.startDate === filterValues.endDate) {
            filtersToApply.date = filterValues.startDate
        }
        else if (filterValues.startDate !== "" && filterValues.endDate !== "") {
            filtersToApply.date__gt = filterValues.startDate
            filtersToApply.date__lt = filterValues.endDate
        }
        else {
            let todayDate = new Date()
            filtersToApply.date__gt = todayDate.toISOString().slice(0, 10);
            filtersToApply.date__lt = todayDate.addYears(-1).toISOString().slice(0, 10);

            filterValues.startDate = filtersToApply.date__gt;
            filterValues.endDate = filtersToApply.date__lt
        }

        filterValues.date_range = false;
    }
    else {
        filterValues.date_range = true;
        if (filterValues.dateOptions === "last_year") {
            let todayDate = new Date();
            filtersToApply.date__lt = todayDate.toISOString().slice(0, 10);
            filtersToApply.date__gt = todayDate.addYears(-1).toISOString().slice(0, 10);
        }
        else if (filterValues.dateOptions === "last_month") {
            let todayDate = new Date();
            filtersToApply.date__lt = todayDate.toISOString().slice(0, 10);
            filtersToApply.date__gt = todayDate.addMonths(-1).toISOString().slice(0, 10);
        }
        else if (filterValues.dateOptions === "yesterday") {
            let todayDate = new Date();
            filtersToApply.date = todayDate.addDays(-1).toISOString().slice(0, 10);
        }
        else {
            let todayDate = new Date()
            filtersToApply.date = todayDate.addDays(-1).toISOString().slice(0, 10);
        }
    }
    console.log("New filter to applied generated")
    console.log(filtersToApply)
    return filtersToApply
}