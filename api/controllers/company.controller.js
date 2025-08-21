const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create company
exports.create = (req, res) => {
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: parseInt(req.params.contact_id)
    };

    Companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });
};

// Get all companys
exports.findAll = (req, res) => {

    Companies.findAll({
        where: {
            contact_id: parseInt(req.params.contact_id)
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one company by id
exports.findOne = (req, res) => {
    Companies.findOne({
        where: {
            contact_id: req.params.contact_id,
            company_id: req.params.company_id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Update one company by id
exports.update = (req, res) => {
    const id = req.params.company_id;

    Companies.update(req.body, {
        where: { company_id: id, contact_id: req.params.contact_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};

// Delete one company by id
exports.delete = (req, res) => {
    const id = req.params.company_id;

    Companies.destroy({
        where: { company_id: id, contact_id: req.params.contact_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Company with id=" + id
            });
        });
};