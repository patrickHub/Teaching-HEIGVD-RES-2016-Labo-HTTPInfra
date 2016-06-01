var Chance = require('chance');
var chance = new Chance();
var http = require('http');

var server = http.createServer();

function generateProvinceCytizen(){
	var countries = []
	countries[0] = "ca";
	countries[1] = "it";
	countries[2] = "us";
	countries[3] = "fr";
 	var citizens = [];
	var nomberMax = chance.integer({
		min: 4,
		max: 10
	});
	for(var i = 0; i<nomberMax; i++){
		var num = chance.integer({
			min: 0,
			max: 3
		});
		switch(num){
			case 0:{
				var provincia = chance.province({
					country : countries[num],
					full: true
				});
				var nomberOfCitizens = chance.integer({
					min: 0,
					max: 10
				});
				for(var j = 0; j<nomberOfCitizens; j++){
					citizens.push({
						country: countries[num],
						province: provincia,
						fistName: chance.first(),
						lastName: chance.last(),
						salary: chance.dollar({
							max: 10000
						})
						
					})
				}
				break;
			}
			case 1 :{
				var provin = chance.province({
					country : countries[num],
					full: true
				});
				var nomberOfCitizens = chance.integer({
					min: 0,
					max: 10
				});
				for(var j = 0; j<nomberOfCitizens; j++){
					citizens.push({
						country: countries[num],
						province: provin,
						fistName: chance.first(),
						lastName: chance.last(),
						street: chance.street({
							country: countries[num]
						}),
						salary: chance.dollar({
							max: 10000
						})
						
					})
				}
				break;
			}
			case 2: {
				var stat = chance.state({
					country : countries[num],
					full: true
				});
				var nomberOfCitizens = chance.integer({
					min: 0,
					max: 10
				});
				for(var j = 0; j<nomberOfCitizens; j++){
					citizens.push({
						country: countries[num],
						state: stat,
						fistName: chance.first(),
						lastName: chance.last(),
						street: chance.street({
							country: countries[num]
						}),
						phone: chance.phone({
							country: countries[num],
							mobile: true
						}),
						salary: chance.dollar({
							max: 10000
						})
						
					})
				}
				break;
			}
			case 3:{
				var citie = chance.city();
				var nomberOfCitizens = chance.integer({
					min: 0,
					max: 10
				});
				for(var j = 0; j<nomberOfCitizens; j++){
					citizens.push({
						country: countries[num],
						ville: citie,
						fistName: chance.first(),
						lastName: chance.last(),
						phone: chance.phone({
							country: countries[num],
							mobile: true
						}),
						salary: chance.dollar({
							max: 10000
						})
						
					});
				}
				break;
			}
		}
		
	}
	return citizens;
}

console.log("Boujour " + chance.name());
var tmp = generateProvinceCytizen();

server.on('request', function(request, response){
	if(request.method === 'GET' && request.url ==='/echo'){
	
		var responseBody = generateProvinceCytizen();
		request.on('data', function() {
		}).on('end', function(){
			response.writeHead(200, {
				'Content-type': 'application/JSON'
			});
			response.write(JSON.stringify(responseBody));
			response.end();
		});
	}else{
		response.statusCode = 404;
		response.end();
	}
	
}).listen(3000);

