/**
 * File Name: FKdatabase.js
 *
 * Revision History:
 *       Fatima Kharodia, 2019-02-25 : Created
 */

var db;

function errorHandler(tx, error) {
   console.error("SQL error: " + tx + " (" + error.code + ") " + 
       error.message);
}


var DB = {
    FKCreateDatabase: function () {
         var shortName = "FKFeedbackDB";
         var version = "1.0";
         var displayName = "FKFeedback DB";
         var dbSize = 2*1024*1024;

         console.info("Creating DB");
         db = openDatabase(shortName, version, displayName, dbSize, 
             dbCreateSuccess);

         function dbCreateSuccess () {
              console.info("DB Created"); 
         }
    },
    FKCreateTables: function () {
     function successCreate() {
          console.info("Success: Create Table successful. ");
      }
      function successDrop() {
          console.info("Success: Dropping Table successful. ");
      }
      function successInsert() {
          console.info("Success: Data insert successful");
      }

      function successTransaction() {
          console.info("Success: Transaction successful");
      }

      function txFunction(tx) {
          var options = [];

          console.info("Dropping Table recommend if exists...");
          var sql = "DROP TABLE IF EXISTS recommend;";


          tx.executeSql(sql, options, successDrop, errorHandler);

          console.info("Creating Table: recommend...");
          sql = "CREATE TABLE IF NOT EXISTS recommend("
              + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
              + "name VARCHAR(20) NOT NULL);";


          tx.executeSql(sql, options, successCreate, errorHandler);

          console.info("Inserting data to Table table...");
          //'' or "" both works.
          sql = ["INSERT INTO recommend(name) VALUES('Yes');",
              " INSERT INTO recommend(name) VALUES('No');"];

          for (var i = 0; i < sql.length; i++) {
              tx.executeSql(sql[i], options, successInsert, errorHandler);

          }

          console.info("Creating Table: review...");
          //table with foreign key snippet
          sql = "CREATE TABLE IF NOT EXISTS review( " +
              "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
              "businessName VARCHAR(30) NOT NULL," +
              "recommendId INTEGER NOT NULL," +
              "reviewerEmail VARCHAR(30)," +
              "reviewerComments TEXT," +
              "reviewDate DATE," +
              "hasRating VARCHAR(1)," +
              "rating1 INTEGER," +
              "rating2 INTEGER," +
              "rating3 INTEGER," +
              "FOREIGN KEY(recommendId) REFERENCES recommend(id));";


          tx.executeSql(sql, options, successCreate, errorHandler);
      }

      db.transaction(txFunction, errorHandler, successTransaction);
  },
  FKdropTables: function () {
      function successDrop() {
          console.info("Success: Dropping Table successful. ");
      }

      function successTransaction() {
          console.info("Success: Transaction successful");

      }

      function txFunction(tx) {
          var options = [];
          console.info("Dropping Table: table");
          sql = ["DROP TABLE IF EXISTS recommend;",
                  "DROP TABLE IF EXISTS review;"];

          for (var i = 0; i < sql.length; i++) {
              tx.executeSql(sql[i], options, successDrop, errorHandler);
          }
      }

      db.transaction(txFunction, errorHandler, successTransaction);
  }
};
