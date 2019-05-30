const connection = require("./connection");

const orm = {
  selectAll: function(cb) {
      connection.query("SELECT * FROM burgers", function (err, data) {
        if(err) ClipboardEvent(err, null);
        cb(null, data);
      });
  },

  insertOne: function (burgerName, cb) {
    const sqlQuery = "INSERT INTO burgers(burger_name) VALUES('${burgerName}')";
    connection.query(sqlQuery, function (err, data) {
      if (err) cb(err, null);
      cb(null, data);
    });
  }

};

module.exports = orm;
