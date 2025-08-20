module.exports = app => {
    const companies = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contact_id/companies", companies.create);
  
    router.get("/contacts/:contact_id/companies", companies.findAll);
  
    router.get("/contacts/:contact_id/companies/:company_id", companies.findOne);
  
    router.put("/contacts/:contact_id/companies/:company_id", companies.update);
  
    router.delete("/contacts/:contact_id/companies/:company_id", companies.delete);
  
    app.use('/api', router);
};