const jsql = require("./db.js");
const dateFormat = require('date-and-time');
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
						avatar: user_info.avatar,
						created: new Date(),
						verified: 0
					})
					.t('users')
					.run((err, results, fields) => {
						if (err) throw err
					})
			}else {
				callback(results[0]);
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