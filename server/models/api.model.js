const jsql = require("./db.js");
exports.login = (token, result) => {
	jsql.s().t('users').w({access_token: token}).run((err, results, fields) => {
		if (err) result(err, null);
		result(null, results[0]);
	})
};

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
        .w({user_id: user_id})
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
        .w({user_id: user_id})
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
exports.getNFTList = (result) => {
	jsql.run('SELECT nft_list.*, IF(nft_purchase_list.purchase_amount is NULL, nft_list.total_amount, nft_list.total_amount - nft_purchase_list.purchase_amount) as left_amount FROM nft_list LEFT JOIN (select count(*) as purchase_amount, nft_id from nft_purchase GROUP BY nft_id) as nft_purchase_list ON nft_purchase_list.nft_id = nft_list.id', (err, results, fields) => {
		if (err) result(err, null);
		result(null, results);
	});
};