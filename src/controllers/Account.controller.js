const AccService = require('../services/Account.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.accUsername || !req.body?.accPassword) {
        return next(new ApiError(400, 'Username and Password can not be empty'));
    }
    try {
        const accService = new AccService();
        const acc = await accService.create(req.body);
        return res.send(acc);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while register')
        );
    }
};

// exports.create = (req, res) => {
//         return res.send({ message: 'create handler'});
//     };