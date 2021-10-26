// Make param country to capitalized

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create pagination function

function paginate(items, pageNumber, pageSize) {

    const startIndex = (pageNumber - 1) * pageSize;	
    return items.slice(startIndex, startIndex + pageSize);
}


module.exports = {capitalize, paginate};