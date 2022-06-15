const jsql = require("./db.js");
const dateFormat = require('date-and-time');
const Web3 = require("web3");
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider(process.env.MAIN_PROVIDER));
}
exports.findOrCreate = (email, user_info, callback) => {
	jsql
		.s()
		.t('users')
		.w({email: email})
		.run((err, results, fields) => {
			if (err) throw err
			if (results.length==0){
				jsql
					.i({
						email: email,
						name: user_info.name,
						login_type: user_info.login_type,
						wallet_address: user_info.wallet_address,
						avatar: '',
						access_token: user_info.accessToken,
						created: new Date(),
						verified: 0
					})
					.t('users')
					.run((err, res, fields) => {
						if (err) throw err
						account = web3.eth.accounts.create();
						var user_id = res.insertId;
						jsql.i({
							user_id: user_id,
							public_address: account.address,
							private_key: account.privateKey,
							amount: 0,
							created: new Date(),
						}).t('gamifly_wallet').run((err, res, fields) => {
							if (err) throw err
							callback({id: user_id, ...user_info });
						});
					})
			}else {
				jsql.u({access_token: user_info.accessToken}).t('users').w({id: results[0].id}).run((err, res, fields) => {
					if (err) throw err;
					callback({id: results[0].id, ...user_info });
				});
			}
		});
};
exports.updateUserInfo = (req, result) => {
	var avatar_name = '';
	if (req.files && Object.keys(req.files).length > 0) {
		let avatar_file = req.files.avatar;
		var ext = avatar_file.name.split('.');
		avatar_name = dateFormat.format(new Date(), "YYYYMMDDHHmmss")+"."+ext[ext.length - 1];
  		uploadPath = './server/assets/avatars/' + avatar_name;
		avatar_file.mv(uploadPath, function(err) {
			if (err)
				result(err, null);
		});
	}
	let user_info = {
		name: req.body.name,
		avatar: avatar_name
	};
	jsql
		.u(user_info)
		.t('users')
		.w({id: req.body.id})
		.run((err, results, fields) => {
			if (err) throw err
			result(null, results.affectedRowed);
		})
};