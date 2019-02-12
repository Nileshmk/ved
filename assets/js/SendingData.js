// 4
let sendButton = $(
  "body > div > div.row > div:nth-child(2) > div.row.justify-content-md-center.createButton > div > button"
);
let te;
let URL = "http://localhost:4000/course/add";
sendButton.click(() => {
  // $.post(URL, JSON.stringify(data), (dat, status) => {
  //   console.log(dat, status);
  //   te = dat;
  // });
  let user;
  let y = confirm("Confirm to Create");
  if (y) {
    $.ajax({
      url: "/course/user",
      success: function (dat) {
        console.log(dat.data._id);
        user = dat.data._id;
        let data2 = {
          "user": user,
          "data": data
        };
        $.ajax({
          url: URL,
          type: "POST",
          data: JSON.stringify(data2),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (msg) {
            alert("Course has been created");
            window.location.href = "http://localhost:3000/profile";
          }
        });
      }
    });
  }
});