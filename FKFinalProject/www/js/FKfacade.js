/**
 * File Name: FKfacade.js
 *
 * Revision History:
 *       Fatima Kharodia, 2019-04-04 : Created
 */

 function FKinitStorage(){
	 alert("Default Reviewer email saved");
	 localStorage.setItem("accountEmail", $("#accountEmail").val());
 }

 function FKUpdateRecommendsDropdown() {
    var options = [];

    function callback(tx, results) {
        var htmlcode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['name'] == "Yes") {
                htmlcode += "<option value = " + row['name'] + " selected>" + row['name'] + "</option>";
            }
            else {
                htmlcode += "<option value = " + row['name'] + ">" + row['name'] + "</option>";
            }
        }
        var recommendList;
        recommendList = $("#FKRecommend");
        recommendList = recommendList.html(htmlcode);
        recommendList.selectmenu("refresh");
    }

    recommend.FKselectAll(options, callback);
}

function FKaddFeedback() {
    if (doValidate_addFdbck()) {
        var options = [];
        var txtName = $("#txtName").val();
        var FKRecommend = $("#FKRecommend").prop("selectedIndex");
		var txtEmail = $("#txtEmail").val();
        var txtComments = $("#txtComments").val();
        var txtReviewDate = $("#txtReviewDate").val();
		var hasRating = $("#FKRatingCheck").prop("checked");
		
        var quality = parseInt($("#quality").val());
        var Source = parseInt($("#Source").val());
        var value = parseInt($("#value").val());

        if (hasRating) {
            options = [txtName, FKRecommend, txtEmail, txtComments, txtReviewDate, 
				hasRating, quality, Source, value];
        }
        else {
            options = [txtName, FKRecommend, txtEmail, txtComments, txtReviewDate, 
				hasRating, null, null, null];
        }

        function callback() {
            alert("New Review Added.");
            console.info("Success: Record inserted successfully");
        }

        review.FKinsert(options, callback)
    }
    else {
        console.error("Validation failed");
    }
}
function FKgetReviews () {
	var options = [];
    var htmlcode = "";

    function callback(tx, results) {
        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            var overallRating;
            if (row['hasRating']) {
                overallRating = (row['rating1'] + row['rating2'] + row['rating3']) / 15 * 100;
                overallRating = parseInt(overallRating);
            }
            else {
                overallRating = 0;
            }

            htmlcode += "<li><a data-role='button'  data-row-id=" + row['id'] + " href='#'>"
                + "<h1>Makeup Brand/Product Name: " + row['businessName'] + "</h1>"
                + "<h3>Reviewer Email: " + row['reviewerEmail'] + "</h3>"
                + "<h3>Comments: " + row['reviewerComments'] + "</h3>"
                + "<h3>Overall rating: " + overallRating + "</h3></a></li>"
        }
        var lvAll = $("#reviewList");
        lvAll = lvAll.html(htmlcode);
        lvAll.listview("refresh");

        $("#reviewList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $.mobile.changePage("#FKEditFeedbackPage", {transition: 'none'});
        }
    }

    review.FKselectAll(options, callback);
}

function FKshowCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function callback(tx, result) {
        var row = result.rows[0];
        $("#txtName2").val(row['businessName']);
        $("#FKRecommend2").prop("selectedIndex", row['recommendId']).selectmenu("refresh");
        $("#txtEmail2").val(row['reviewerEmail']);
        $("#txtComments2").val(row['reviewerComments']);
        $("#txtReviewDate2").val(row['reviewDate']);
        if (row['hasRating'] == "true") {
        	$("#FKRatingCheck2").prop("checked", true).checkboxradio('refresh');
        	$("#quality2").val(row['rating1']);
        	$("#Source2").val(row['rating2']);
        	$("#value2").val(row['rating3']);
        }
        else {
            $("#FKCheckRating2").prop("checked", false).checkboxradio('refresh');
        }

        ShowHideFKRating2();
        FKGetRate2();
    }

    review.FKselect(options, callback);
}

function FKupdateFeedback() {
    if (doValidate_modFdbck()) {
        var options = [];
        var id = localStorage.getItem("id");
        var txtName = $("#txtName2").val();
        var FKRecommend = $("#FKRecommend2").prop("selectedIndex");
		var txtEmail = $("#txtEmail2").val();
        var txtComments = $("#txtComments2").val();
        var txtReviewDate = $("#txtReviewDate2").val();
		var hasRating = $("#FKRatingCheck2").prop("checked");
		
        var quality = parseInt($("#quality2").val());
        var Source = parseInt($("#Source2").val());
        var value = parseInt($("#value2").val());

		if (hasRating) {
            options = [txtName, FKRecommend, txtEmail, txtComments, txtReviewDate, 
				hasRating, quality, Source, value, id];
        }
        else {
            options = [txtName, FKRecommend, txtEmail, txtComments, txtReviewDate, 
				hasRating, null, null, null, id];
        }

        function callback() {
            console.info("Success: Record updated successfully");
        }

        review.FKupdate(options, callback);
        alert("Review Updated successfully");
        $.mobile.changePage("#FKViewFeedbackPage", {transition: 'none'});
    }
    else {
        console.error("Validation failed");
    }
}

function FKdeleteFeedback() {
    var id = localStorage.getItem("id");
    var options = [id];
    function callback() {
        alert("Review Deleted successfully.");
        $.mobile.changePage("#FKViewFeedbackPage", {transition: 'none'});
    }
    review.FKdelete(options,callback);

}

