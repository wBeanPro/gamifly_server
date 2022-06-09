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
exports.getGamiflyWalletTransactions = (user_id, result) => {
	jsql
		.s()
		.t('gamifly_wallet')
        .w({id: user_id})
		.run((err, results, fields) => {
			if (err) result(err, null);
            if (results.length==0){
                result({kind: 'not_found'}, null);
            }
			else {
				jsql
					.s()
					.t('transactions')
					.w({wallet_id: results[0].id})
					.run((err, results, fields) => {
						if (err) result(err, null);
						result(null, results);
					});
			}
		});
};
exports.getMyNFTs = (user_id, result) => {
	jsql.run('SELECT nft_list.* FROM nft_list LEFT JOIN nft_purchase ON nft_purchase.nft_id = nft_list.id WHERE nft_purchase.owner_id=?', [user_id], (err, results, fields) => {
		if (err) result(err, null);
		result(null, results);
	});
};