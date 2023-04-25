
const bookService = require('../config/bookService');
 
var findOneBook = async (req, res) =>
{  
    var result = await bookService.findOneBookDBService(req.params.title );
    if (result) {
        res.send({ "status": true, "data": result} );
    } else {
        res.send({ "status": false, "data": "Book not found" });
    }
}
 
module.exports = { findOneBook};