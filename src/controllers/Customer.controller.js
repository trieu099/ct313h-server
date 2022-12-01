const CustomerService = require('../services/Customer.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    if (!req.body?.cusName || !req.body?.bookCode) {
        return next(new ApiError(400, 'Customer name and book code can not be empty'));
    }
    try {
        const cusService = new CustomerService();
        const cus = await cusService.create(req.body);
        return res.send(cus);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500,'An error occurred while register')
        );
    }
};
exports.findAll = async (req, res, next) => {
    let cuss = [];

    try {
        const customerService = new CustomerService();
        const { name } = req.query;
        if (name) {
            cuss = await customerService.findByName(name);
        } else {
            cuss = await customerService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving books')
        );
    }
    return res.send(cuss);
};
exports.findOne = async( req,res,next) => {
    try {
        const customerService = new CustomerService();
        const cus = await customerService.findById(req.params.listId);
        if (!cus) {
            return next(new ApiError(404,'customer not found'));
        }
        return res.send(cus);
    } catch (error){
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving customer with id = ${req.params.listId}`));
        
    }
};
//update
// exports.update = async (req, res, next) => {
//     if (Object.keys(req.body).length === 0) {
//         return next(new ApiError(400, 'Data to update can not be empty'));
//     }

//     try {
//         const customerService = new CustomerService();
//         const updated = await customerService.update(req.params.listId, req.body);
//         if (!updated) {
//             return next(new ApiError(404, 'customer not found'));
//         } 
//         return res.send({ message: 'Customer was updated successfully'});
//     } catch (error) {
//         console.log(error);
//         return next(
//             new ApiError(
//                 500, 
//                 `Error updating customer with id=${req.params.listId}`
//             )
//         );
//     }
// };

exports.delete = async (req, res, next) => {
    try {
        const customerService = new CustomerService();
        const deleted = await customerService.delete(req.params.listId);
        if (!deleted) {
            return next(new ApiError(404, 'Customer not found'));
        } 
        return res.send({ message: 'Customer was deleted successfully'});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500, 
                `Could not delete customer with ID=${req.params.listId}`
            )
        );
    }
};

