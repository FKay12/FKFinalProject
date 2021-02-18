/**
 * File Name: FKUtil.js
 *
 * Revision History:
 *       Fatima Kharodia, 2019-02-25 : Created
 */

 //display the quality,Source,value text box in add page
function ShowHideFKRating(){
    if($("#FKRatingCheck").is(":checked")){
        $("#FKRating").show();
    }
    else
    {
        $("#FKRating").hide();
    }
}

//display the ratings in the edit page
function ShowHideFKRating2(){
    if($("#FKRatingCheck2").is(":checked")){
        $("#FKRating2").show();
    }
    else
    {
        $("#FKRating2").hide();
    }
}

//calculates the rate in add page
function FKGetRate() {
    var quality = Number($("#quality").val()) ;
    var Source = Number($("#Source").val());
    var value = Number($("#value").val());
    var rating = (quality + Source + value) / 15 * 100;
    rating = Math.floor(rating) + "%";
    $("#rating").val(rating);
}

//calculated the rate in edit page
function FKGetRate2() {
    var quality = Number($("#quality2").val()) ;
    var Source = Number($("#Source2").val());
    var value = Number($("#value2").val());
    var rating = (quality + Source + value) / 15 * 100;
    rating = Math.floor(rating) + "%";
    $("#rating2").val(rating);
}

function doValidate_addFdbck() {
    var form = $("#addFdbck");
    form.validate({
        rules:{
            txtName:{
                required: true,
                rangelength: [2, 30]
            },
            txtEmail:{
                required: true,
                emailcheck: true,
                
            },
            txtReviewDate:{
                required: true
            },
            quality:{
                required: true,
                range: [0, 5]
            },
            Source:{
                required: true,
                range: [0, 5]
            },
            value:{
                required: true,
                range: [0, 5]
            }
        },
        messages:{
            txtName:{
                required: "You must enter Business Name",
                minlength: "Length must be at least 2-30 characters long"
            },
            txtEmail:{
                required: "You must enter an Email Address",
                emailcheck:"You must enter a valid Email Address"
            },
            txtReviewDate:{
                required: "Review Date is required"
            },
            quality:{
                required: "Value is required",
                min: "Value must be 0-5"
            },
            Source:{
                required: "Value is required",
                min: "Value must be 0-5"
            },
            value:{
                required: "Value is required",
                min: "Value must be 0-5"
            }
        }
    });
    return form.valid();
    

}
function doValidate_modFdbck() {
    var form = $("#modFdbck");
    form.validate({
        rules:{
            txtName2:{
                required: true,
                rangelength: [2, 30]
            },
            txtEmail2:{
                required: true,
                emailcheck: true,
                
            },
            txtReviewDate2:{
                required: true
            },
            quality2:{
                required: true,
                range: [0, 5]
            },
            Source2:{
                required: true,
                range: [0, 5]
            },
            value2:{
                required: true,
                range: [0, 5]
            }
        },
        messages:{
            txtName2:{
                required: "You must enter Business Name",
                minlength: "Length must be at least 2-30 characters long"
            },
            txtEmail2:{
                required: "You must enter an Email Address",
                emailcheck:"You must enter a valid Email Address"
            },
            txtReviewDate2:{
                required: "Review Date is required"
            },
            quality2:{
                required: "Value is required",
                min: "Value must be 0-5"
            },
            Source2:{
                required: "Value is required",
                min: "Value must be 0-5"
            },
            value2:{
                required: "Value is required",
                min: "Value must be 0-5"
            }
        }
    });
    return form.valid();
}


jQuery.validator.addMethod("emailcheck",
    function(value, element){
        var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return this.optional(element) || regex.test(value);
    },
    "Please enter a valid email address");