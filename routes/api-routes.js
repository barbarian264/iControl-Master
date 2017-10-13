var db = require("../models");
var fs = require("fs");
var path = require("path");
var moment = require("moment");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(app) {

    app.post("/api/product", function(req, res) {
        db.items.create({

            itemBarcode: req.body.itemBarcode,
            itemCode: req.body.itemCode,
            description: req.body.description,
            quantity: req.body.quantity,
            reorderPoint: req.body.reorderPoint,
            unitCost: req.body.unitCost,
            location: req.body.location

        });


    });

    app.get("/api/table", function(req, res) {

        db.items.findAll({

        }).then(function(results) {

            res.json(results);

        });

    });

    app.get("/api/history", function(req, res) {

        db.itemRecord.findAll({
            limit: 10,
            order: [
                ['createdAt', 'DESC']
            ]

        }).then(function(results) {

            res.json(results);

        });

    });

    app.get("/api/chart", function(req, res) {

        db.itemRecord.findAll({


        }).then(function(results) {

            res.json(results);

        });

    });

    app.put("/api/addUpdate", function(req, res) {
        db.items.findOne({
            where: { itemBarcode: req.body.itemBarcode }
        }).then(function(data) {

            // console.log(data);

            db.items.update(

                { quantity: data.quantity + 1 }, {
                    where: {
                        itemBarcode: req.body.itemBarcode
                    }

                }).then(function(done) {
                res.json(done);

            });


        });

    });

    app.put("/api/subUpdate", function(req, res) {
        db.items.findOne({
            where: { itemBarcode: req.body.itemBarcode }
        }).then(function(data) {

            // console.log(data);

            db.items.update(

                { quantity: data.quantity - 1 }, {
                    where: {
                        itemBarcode: req.body.itemBarcode
                    }

                }).then(function(done) {
                res.json(done);
            });


        });

    });

    app.post("/api/searchInv", function(req, res) {
        console.log(req.body.itemBarcode);
        db.items.findAll(

            {
                where: { itemBarcode: req.body.itemBarcode }

            }).then(function(done) {

            res.json(done);

        });

    });

    app.post("/api/manualsubmit", function(req, res) {
        console.log(req.body.itemCode);
        db.items.findAll(

            {
                where: { itemCode: req.body.itemCode }

            }).then(function(done) {

            res.json(done);

        });

    });

    app.post("/api/record", function(req, res) {

        console.log(req.body.action);

        db.items.findOne(

            {
                where: { itemBarcode: req.body.itemBarcode }

            }).then(function(done) {

            // console.log(req.body.action);
            if (req.body.action == "add") {
                var value = 1;
            } else {
                var value = -1;
            }

            db.itemRecord.create({

                itemBarcode: done.itemBarcode,
                itemCode: done.itemCode,
                description: done.description,
                qty: value,
                status: "Processed"

            });

        });

    });
    
    app.post('/signup',
        passport.authenticate('local-signup'),
        function(req, res) {
            
            res.json({redirect: '/inventory'});
    });

    
    app.post('/signin',
        passport.authenticate('local-signin'),
        function(req, res) {
            
            res.json({redirect: '/inventory'});
    });
    

 
};
