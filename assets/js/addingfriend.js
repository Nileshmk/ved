let emailInput = $("#friends");
let button = $("body > div > div > div.col-sm-8 > div > div > button");
let total = $("body > div > div > div.col-sm-4 > p:nth-child(2) > span");
let per = $("body > div > div > div.col-sm-4 > p:nth-child(1) > span");
let pay = $('.pay');
let s = "http://localhost:4000/paywithpaytm?amount=";
y = []
let dropdown_value;
$(".dropdown-menu").on('click', 'a', function(){
    // $(".btn:first-child").text($(this).text());
    $('.dropdown .btn').text($(this).text());
    dropdown_value = $(this).text();
 });
button[0].onclick = ()=>{
    
    l = $('body > div > div > div.col-sm-8 > div > div > div.row.person > div:nth-child(3)');
    // $.each(l,(index,valu)=>{console.log(y.append(valu.innerText))});
    console.log(y)
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
                let cont = "<div class=\"row person\"><div class=\"col-sm-4\"><img class=\"card-img-top\" src=\""+msg.user.profileURL+"\" alt=\"Card image cap\" style=\"max-height: 20px; width: auto;\"></div><div class=\"col-sm-4\">"+msg.user.firstName+" "+msg.user.lastName+"</div><div class=\"col-sm-4\">"+msg.user.email+"<span>x</span></div></div></div>";
                let tempp = $(cont);
                tempp.find('span')[0].onclick = ()=>{
                    console.log('hello');
                    tempp.remove();
                }
                tempp.insertBefore(emailInput);
                y.push(emailInput.val());
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

pay[0].onclick = ()=>{
    $.ajax({
        url: "http://localhost:3000/pay",
        type: "POST",
        data: JSON.stringify({
            email: y,
            amount:total.text(),
            id:idd,
            location:dropdown_value,
            date:$('#datepicker').val()
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            location.replace(msg.link);
        }
    });
    
}

