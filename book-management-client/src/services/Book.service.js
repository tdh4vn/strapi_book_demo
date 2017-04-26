var request = require('request');
const APIConfig = require('../configs/APIConfig')

module.exports = {
    getBooks : function(callback){
        let GET_BOOK_URI = APIConfig.API_URL + "book";
        request.get(GET_BOOK_URI, (err, res, body)=>{
            console.log(res);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let booksRespons = JSON.parse(body);
                let data = [];
                booksRespons.forEach(function(element) {
                    data.push({
                        id : element.id,
                        name : element.name,
                        price : element.price,
                        author : element.authors.name
                    })
                });
                callback(null, data);
            }
        })
    },
    getAuthors : function(callback){
        let GET_AUTHOR_URI = APIConfig.API_URL + "author";
        request.get(GET_AUTHOR_URI, (err, res, body)=>{
            console.log(body);
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                let authors = JSON.parse(body);
                let data = [];
                authors.forEach(function(element){
                    data.push({
                        name : element.name,
                        id : element.id
                    })
                });
                console.log(data);
                callback(null, data)
            }
        })
    }
}