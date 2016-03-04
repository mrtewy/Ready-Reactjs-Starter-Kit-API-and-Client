module.exports = function(router){
	router.get('/users/all', function(req, res){
		var data = [
		{
		    "id": 1388534400000,
		    "author": "Hey there! I'm Tew Chotikanchinda"
		},
		{
		    "id": 1420070400000,
		    "author": "I'm Moving to Melbourne Australia"
		}
		];
		res.json({
			callback: data,
		});
	});
};
