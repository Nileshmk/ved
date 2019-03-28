let emailInput = $("#friends");
let button = $("body > div > div > div.col-sm-8 > div > div > button");
let total = $("body > div > div > div.col-sm-4 > p:nth-child(2) > span");
let per = $("body > div > div > div.col-sm-4 > p:nth-child(1) > span");
let pay = $('.pay');


button[0].onclick = ()=>{
    console.log(emailInput.val());
    $.ajax({
        url: "http://localhost:3000/course/addFriend",
        type: "POST",
        data: JSON.stringify({
            email: emailInput.val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            if(msg.user){
                let cont = "<div class=\"row person\"><div class=\"col-sm-4\"><img class=\"card-img-top\" src=\""+msg.user.profileURL+"\" alt=\"Card image cap\" style=\"max-height: 20px; width: auto;\"></div><div class=\"col-sm-4\">"+msg.user.firstName+" "+msg.user.lastName+"</div><div class=\"col-sm-4\">"+msg.user.email+"</div></div></div>";
                $(cont).insertBefore(emailInput);
                let temp = parseInt(per.text())-getDiscount;
                per.text(temp.toString());
                total.text((temp*($('.person').length+1)).toString());
                console.log(total.val(),per.val());
                emailInput.val("");
                if($('.person').length>=getmaxUser){
                    emailInput.remove();
                    button.remove();
                }

                console.log("success");
            }
            else{
                alert("user not found");
            }
        }
    });
    
}