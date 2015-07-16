module.exports = function(req, res, next, args) {
	res.sendStatus(args[0]);
};
