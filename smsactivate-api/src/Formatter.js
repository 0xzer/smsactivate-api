
async function toJSON(text) {
    let array = text.split(":")
    let obj = {}
    if (array.length > 1) obj[array[0].toLowerCase()] = array[1]
    else obj["answer"] = array[0]
    return obj;
}

module.exports = {
    toJSON,
}