var store = require('app-store-scraper');
var fs = require('fs');
var request = require('request');
var count = 1;
async function downloadPic(src, folder, name) {
    return new Promise(resolve =>
        request(src).pipe(fs.createWriteStream(folder + name)).on('close', function() {
            console.log(name + ' saved!')
            resolve()
        })
    )
}
async function getIcon(collection, category, num) {
    try {
        var results = await store.list({
            collection: collection,
            category: category,
            num: num
        })
        for (let i in results) {
            await downloadPic(results[i].icon, './catpics/', count + '.jpg');
            count++;
        }
    } catch (e) {
        throw e;
    }
}
async function start() {
    for (let i in store.category) {
        try {
            console.log("Prossessing " + i)
            await getIcon(store.collection.TOP_FREE_IOS, store.category[i], 30)
        } catch (e) {
            console.error(e)
            continue
        }
    }
}
start()
