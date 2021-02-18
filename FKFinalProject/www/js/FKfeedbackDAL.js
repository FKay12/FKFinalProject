/**
 * File Name: FKfeedbackDAL.js
 *
 * Revision History:
 *       Fatima Kharodia, 2019-02-25 : Created
 */

var review = {
    FKinsert: function (options, callback) {
        function txFunction(tx) {
            var sql = "";

                sql = "INSERT INTO review(businessName, recommendId, reviewerEmail, " +
				"reviewerComments, reviewDate, hasRating, rating1, " +
				"rating2, rating3) " +
				"VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?); " ; 
            
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Insert transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    FKupdate: function (options, callback) {
        function txFunction(tx) {
            var sql = "";

                sql = "UPDATE review " +
				"SET businessName=?, recommendId=?, reviewerEmail=?, " +
				"reviewerComments=?, reviewDate=?, hasRating=?, " +
				"rating1=?, rating2=?, rating3=? " +
				"WHERE id=?;"; 
          
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Update transaction successful");

        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    FKdelete: function (options, callback) {
        function txFunction(tx) {
            var sql = "DELETE FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Delete transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    FKselect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    FKselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var recommend = {
    FKselectAll: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM recommend;";
            tx.executeSql(sql, options, callback, errorHandler);
        }

        function successTransaction() {
            console.info("Success: Select All transaction successful");
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};