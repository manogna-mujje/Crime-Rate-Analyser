var path = require('path');

function getLocationInfo(req, res) {
	res.render('index', {data: [], isResponse : false, zipcode : {}});
}

function locationFilter(req, res, next) {
	const checkZipcode = new Promise((resolve, reject) => {
		switch(req.body.zipcode) {
			case "60007":
				resolve([6, 15, 11, 20, 3, 21, 23]);
				break;
			case "60176":
				resolve([10, 12, 15, 16, 7, 17, 27]);
				break;
			case "60603":
				resolve([11, 2, 18, 14, 10, 21, 24]);
				break;
			case "60607":
				resolve([2, 29, 17, 22, 3, 21, 4]);
				break;
			case "60611":
				resolve([24, 21, 14, 11, 18, 2, 10]);
				break;
			case "60619":
				resolve([7, 34, 22, 19, 7, 3, 8]);
				break;
			case "60623":
				resolve([12, 10, 12, 19, 3, 16, 20]);
				break;
			default:
				reject("Please enter a valid zip code!");
				break;
		}
	})
	checkZipcode.then((array) => {
		res.status(200).render('index', { data: array, isResponse : true, zipcode : req.body.zipcode });
	}).catch((error)=>{
		res.status(400).send(error);
	})
}

module.exports = {
    getLocationInfo,
    locationFilter
}

