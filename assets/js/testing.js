// inputArea.value =
//   "https://www.youtube.com/playlist?list=PLPRhQEDGqsFC4NL3DiYpPVnDKP9o1dnTw";
// button.click();

// $("#courseTitle").val("nilesh");
// $("#description").val("nothing for now");

// $("#storeD").click();
// {{ state }}
let gotData;
$.ajax({
  url: "http://35.154.103.69/course/id",
  type: "POST",
  data: JSON.stringify({
    id: getDataId
  }),
  contentType: "application/json; charset=utf-8",
  dataType: "json",
  success: function (msg) {
    console.log(msg.user);
    gotData = msg.user;
    webscrap();
  },
  error: function (error) {
    alert("course unable to load");
  }
});

let webscrap = () => {

  $(document).ready(function () {
    $("#courseTitle").val(gotData.courseName);
    $("#description").val(gotData.description);
    $("#storeD").trigger("click");
    for (var i = 0; i < gotData.topics.length; i++) {
      if (gotData.topics[i].subtopics == null) {
        singleInputArea.value = " =" + gotData.topics[i].youtubelink;
        singleButton.trigger("click");
      } else {
        singleInputArea.value = gotData.topics[i]["topic name"];
        topicButton.trigger("click");
        let ar = singleInputArea.parentElement.previousElementSibling.querySelector(
          "input"
        );
        let br = singleInputArea.parentElement.previousElementSibling.querySelector(
          "button"
        );
        for (let j = 0; j < gotData.topics[i].subtopics.length; j++) {
          ar.value = " =" + gotData.topics[i].subtopics[j].youtubelink;
          br.click();
        }
      }
    }
  });
};

let deleteButton = $("#deleteButton");

deleteButton.click(() => {
  let y = confirm("do you want to delete");
  if (y) {
    $.ajax({
      url: "http://35.154.103.69/course/delete",
      type: "POST",
      data: JSON.stringify({
        id: getDataId
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function (msg) {
        window.location.href = "http://localhost:3000/profile";
      },
      error: function (error) {
        alert("course unable to delete");
      }
    });
  }
});