const jsql = require("./db.js");
exports.getGameList = (result) => {
	jsql
		.s()
		.t('game_list')
		.run((err, results, fields) => {
			if (err) result(err, null);
			result(null, results);
		});
};
exports.getUserInfo = (user_id, result) => {
    jsql
		.s()
		.t('users')
        .w({id: user_id})
		.run((err, results, fields) => {
			if (err) result(err, null);
            if (results.length==0){
                result({kind: 'not_found'}, null);
            }
			else result(null, results[0]);
		});
};
exports.getGamiflyWalletBalance = (user_id, result) => {
	jsql
		.s()
		.t('gamifly_wallet')
        .w({id: user_id})
		.run((err, results, fields) => {
			if (err) result(err, null);
            if (results.length==0){
                result({kind: 'not_found'}, null);
            }
			else result(null, results[0].amount);
		});
};