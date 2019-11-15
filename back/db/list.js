/*
    ListDB = string[]
*/
const listDB = []

async function fetchList() {
    return listDB
}

async function insertItem(itemContent) {
    listDB.push(itemContent)
}

module.exports = {
    fetchList,
    insertItem
}