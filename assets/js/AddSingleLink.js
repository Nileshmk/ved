// 2
// function for the single video to load
let singleInputArea = $("#target > input")[0];
let singleButton = $("#target > div > .linkSubmit");
let topicButton = $("#target > div > .topicSubmit");

// let AddingButtonListener = (singleButton, singleInputArea) => {
singleButton.click(() => {
  singlevideooptions.id = singleInputArea.value.split("=")[1];
  console.log(singlevideooptions);
  $.getJSON(singlevideoURL, singlevideooptions, function(dat) {
    dropListElement(
      singleInputArea,
      dat.items[0].snippet.thumbnails.default.url,
      dat.items[0].snippet.title
    );
    data.topics.push({
      topicno: data.topics.length + 1,
      "topic name": dat.items[0].snippet.title,
      youtubelink: dat.items[0].id,
      subtopics: null
    });
  }).fail(() => {
    alert("link is not valid. Enter the valid youtubeLink.");
  });
  singleInputArea.value = "";
});
// };

// calling for main youtube input

// AddingButtonListener(singleInputArea, singleButton);

$("#target > input").bind("keypress", function(e) {
  if (e.keyCode == 13) {
    $("#target > div > .linkSubmit").trigger("click");
    // console.log("hello");
  } else if (e.keyCode == 32) {
    console.log("hello");
    $("#target > div > .topicSubmit").trigger("click");
  }
});
