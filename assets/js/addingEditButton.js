let editButton = $("#createEditButtons > button:nth-child(1)");
editButton.click(() => {
    let lis = $("#CourseList ul li");
    let t;
    lis.each(function (index) {
        $(this).append($("<i class='far fa-edit'></i>"));
        $(this).find("i").click(() => {
            let id = $(this).attr('id');
            // $.ajax({
            //     url: "http://localhost:3000/profile/edit/?id=123",
            //     type: "GET",
            //     beforeSend: function () {
            //         console.log("submitting data")
            //     },
            //     cache: false,
            //     success: function (html) {
            //         window.location.href = "http://localhost:3000/profile/edit?id=123";
            //         // window.location.replace("http://localhost:3000/profile/edit");
            //     }
            // });
            let s = "http://localhost:3000/profile/edit?id=" + id;
            window.location.href = s;
            // $.ajax({
            //     url: "http://localhost:4000/course/id",
            //     type: "POST",
            //     data: JSON.stringify({
            //         "id": id
            //     }),
            //     contentType: "application/json; charset=utf-8",
            //     dataType: "json",
            //     success: function (msg) {
            //         console.log(msg);
            //         window.location.replace("http://localhost:3000/profile/edit");
            //     }
            // });
        })
    });
});