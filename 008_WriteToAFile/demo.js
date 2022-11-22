var fs = require('fs')

var data = {
    name: 'Abhimanyu'
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
    console.log("Write finished", err)
})