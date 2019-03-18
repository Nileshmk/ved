let emailInput = $("#friends");
let button = $("body > div > div > div.col-sm-8 > div > div > button");
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
                let newt = document.createElement("div");
                newt.setAttribute("class","row");
                let cont = "<div class=\"col-sm-4\"><img class=\"card-img-top\" src=\""+msg.user.profileURL+"\" alt=\"Card image cap\" style=\"max-height: 20px; width: auto;\"></div><div class=\"col-sm-4\">"+msg.user.firstName+" "+msg.user.lastName+"</div><div class=\"col-sm-4\">"+msg.user.email+"</div></div>";
                newt.innerHTML = cont;
                emailInput.get(0).parentElement.insertBefore(emailInput.get(0));
                console.log("success");
            }
            else{
                alert("user not found");
            }
        }
    });
}