function trimArrayMutipleItemsByReduce(inputArray) {
    inputArray.sort().reduce((a, b) => {
        if (b != a[0])
            a.unshift(b);
        return a
    }, [])
}

function trimArrayMutipleItemsBySet(inputArray) {
    return Array.from(new Set(inputArray))
}

function trimArrayMutipleItems(inputArray) {
    return [...new Set(inputArray)]
}

export default {trimArrayMutipleItemsByReduce, trimArrayMutipleItemsBySet, trimArrayMutipleItems}