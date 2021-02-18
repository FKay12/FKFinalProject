/**
 * File Name: FKglobal.js
 *
 * Revision History:
 *       Fatima Kharodia, 2019-02-25 : Created
 */

function btnSave_click() {
  FKaddFeedback();

}

function btnUpdate_click() {
  FKupdateFeedback();
}

function FKAddFeedbackPage_pageshow() {
  var emailAddress = localStorage.getItem("DefaultEmail");
  $("#txtEmail").val(emailAddress);
  FKUpdateRecommendsDropdown();
}

function FKAddToStorage() {
  FKinitStorage();
}
function FKDisplayRate(){
  FKGetRate();
}

function FKDisplayRateModify(){
  FKGetRate2();
}

function FKRatingCheck_check(){
  ShowHideFKRating();
}

function FKRatingCheck2_check(){
  ShowHideFKRating2();
}
function FKClearDatabase_click() {
  FKclearDatabase();
}
function FKShowAllList() {
  FKgetReviews();
}
function FKEditFeedbackPage_pageshow() {
  FKUpdateRecommendsDropdown();
  FKshowCurrentReview();
}

function btnDelete_click() {
  FKdeleteFeedback();
}


 function init() {

  $("#btnSave").on("click", btnSave_click);
  $("#btnUpdate").on("click", btnUpdate_click);
  $("#btnDelete").on("click", btnDelete_click);

  $("#quality").on("change",FKDisplayRate);
  $("#Source").on("change",FKDisplayRate);
  $("#value").on("change",FKDisplayRate);

  $("#FKQualityModify").on("change",FKDisplayRateModify);
  $("#FKSourceModify").on("change",FKDisplayRateModify);
  $("#FKValueModify").on("change",FKDisplayRateModify);

  $("#FKRatingCheck").on("click",FKRatingCheck_check);
  $("#FKRatingCheck2").on("click",FKRatingCheck2_check);
  
  $("#btnDeflts").on("click",FKAddToStorage);
  $("#FKClearDatabase").on("click", FKClearDatabase_click);

  $("#FKAddFeedbackPage").on("pageshow", FKAddFeedbackPage_pageshow);
  $("#FKViewFeedbackPage").on("pageshow", FKShowAllList);
  $("#FKEditFeedbackPage").on("pageshow", FKEditFeedbackPage_pageshow);
  
    
  }

  function initDB() {
    console.info("Creating Database.");
    try {
        DB.FKCreateDatabase();
        if (db) {
            console.info("Creating Tables!");
            DB.FKCreateTables();
        }
        else {
            console.error("Error: Cannot create tables : Database not available!");
        }
    } catch (e) {
        console.error("Fatal: Error in initDB(). Can not proceed.");
    }
}
  
$(document).ready(function () {
    init();
    initDB();
});
