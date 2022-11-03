fs = require('fs');

function phonenumber(err, data){
    console.log('data:', data);
}

fs.readdir('c:/', phonenumber);

console.log('This comes after')