const api_model = require("./models/api.model.js");
const user_model = require("./models/user.model");
exports.getGameList = (req, res) => {
  api_model.getGameList((err, data) => {
    if (err)
		  res.status(500).send({
			message:
			  err.message || "An error occurred during get gamelist."
		  });
		else res.send(data);
  });
};

exports.getGamiflyWalletBalance = (req, res) => {
  api_model.getGamiflyWalletBalance(req.params.user_id, (err, data) => {
		if (err) {
      if(err.kind == 'not_found') {
        res.status(404).send({
          message:
            err.message || "Not Found."
          });
      }else {
        res.status(500).send({
        message:
          err.message || "An error occurred during get platform wallet balance."
        });
      }
    }
		else res.send(data);
	});
};
exports.getGamiflyWalletTransactions = (req, res) => {
  api_model.getGamiflyWalletTransactions(req.params.user_id, (err, data) => {
		if (err) {
      if(err.kind == 'not_found') {
        res.status(404).send({
          message:
            err.message || "Not Found."
          });
      }else {
        res.status(500).send({
        message:
          err.message || "An error occurred during get platform wallet transactions."
        });
      }
    }
		else res.send(data);
	});
};
exports.getMyNFTs = (req, res) => {
  api_model.getMyNFTs(req.params.user_id, (err, data) => {
		if (err) {
      res.status(500).send({
      message:
        err.message || "An error occurred during get platform wallet transactions."
      });
    }
		else res.send(data);
	});
};
exports.getUserInfo = (req, res) => {
	api_model.getUserInfo(req.params.user_id, (err, data) => {
		if (err) {
      if(err.kind == 'not_found') {
        res.status(404).send({
          message:
            err.message || "Not Found."
          });
      }else {
        res.status(500).send({
        message:
          err.message || "An error occurred during get user info."
        });
      }
    }
		else res.send(data);
	});
};

exports.updateUserInfo = (req, res) => {
  user_model.updateUserInfo(req, (err, data) => {
    if (err)
		  res.status(500).send({
			message:
			  err.message || "An error occurred during get gamelist."
		  });
		else res.send(data);
  });
};

exports.getNFTList = (req, res) => {
  api_model.getNFTList((err, data) => {
    if (err)
		  res.status(500).send({
			message:
			  err.message || "An error occurred during get NFT list."
		  });
		else res.send(data);
  });
};