const Company = require('../models').Company;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, company;
    let user = req.user;

    let company_info = req.body;
    company_info.users = [{user:user._id}];

    [err, company] = await to(Company.create(company_info));
    if(err) return ReE(res, err, 422);

    return ReS(res,{company:company.toJSON()}, 201);
}
module.exports.create = create;

const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;
    let err, companies;
    [err, companies] = await to(user.Companies());

    return ReS(res, {companies:companies});
}
module.exports.getAll = getAll;

const get = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let company = req.company.toJSON();
    return ReS(res, {company:company});
}
module.exports.get = get;