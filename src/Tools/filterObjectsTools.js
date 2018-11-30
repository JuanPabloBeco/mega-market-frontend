export function findCategorySubcategoryOrItemParent(id, type, allCategories) {
    let toReturn = {}
    for (let i = 0; i < allCategories.length; i++) {
        if (type == 'categories') {
            if (allCategories[i].id == id) {
                toReturn = allCategories[i]
                return 'i`m a campaign'
            }
        }
        else {
            let subcategories = allCategories[i].subcategories

            for (let j = 0; j < subcategories.length; j++) {
                if (type == 'subcategories') {
                    if (subcategories[j].id == id) {
                        toReturn = allCategories[i]
                        return toReturn
                    }
                }
                else {
                    let items = subcategories[j].items

                    for (let k = 0; k < items.length; k++) {
                        if (items[k].id == id) {
                            toReturn = subcategories[j]
                            toReturn.category_id = allCategories[i].id
                            return toReturn
                        }
                    }
                }
            }
        }
    }
    return 'Nothing was found with this parameters'
}

export function findCategorySubcategoryOrItem(id, type, allCategories) {
    let toReturn = {}
    for (let i = 0; i < allCategories.length; i++) {
        if (type == 'categories') {
            if (allCategories[i].id == id) {
                toReturn = allCategories[i]
                return toReturn
            }
        }
        else {
            let subcategories = allCategories[i].subcategories

            for (let j = 0; j < subcategories.length; j++) {
                if (type == 'subcategories') {
                    if (subcategories[j].id == id) {

                        toReturn = subcategories[j]
                        toReturn.category_id = allCategories[i].id
                        return toReturn
                    }
                }
                else {
                    let items = subcategories[j].items

                    for (let k = 0; k < items.length; k++) {
                        if (items[k].id == id) {
                            toReturn = items[k]
                            toReturn.subcategory_id = subcategories[j].id
                            toReturn.category_id = allCategories[i].id
                            return toReturn
                            return items[k]
                        }
                    }
                }
            }
        }
    }
    return 'Nothing was found with this parameters'
}