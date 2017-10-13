var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });

  app.get("/addProducts", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addProducts.html"));
  });

  app.get("/history", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/history.html"));
  });

  app.get("/reports", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/reports.html"));
  });


};
