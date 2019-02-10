// 1

let data = {};
let playlistLinks = [];

let key = "AIzaSyBBgK8o7LZEv4TPG5Rfs-KFUoVFBR0PvXw";
//  let playlistId = 'PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f';
let playlistURL = "https://www.googleapis.com/youtube/v3/playlistItems";
let playlistId;
let playlistoptions = {
  part: "snippet",
  key: key,
  maxResults: 20,
  playlistId: playlistId
};
let id;
let singlevideoURL = "https://www.googleapis.com/youtube/v3/videos";
let singlevideooptions = {
  part: "snippet",
  key: key,
  id: id
};

let button = $(
  "body > div > div > div:nth-child(2) > div.row.playlistArea > div > div.input-group.mb-3 > div > button"
);
let inputArea = $(
  "body > div > div > div:nth-child(2) > div.row.playlistArea > div > div.input-group.mb-3 > input"
)[0];
let examplePlaylistBlock = $(
  "body > div > div > div:nth-child(2) > div.row.playlistArea > div > div.row.youtubeContainer"
);
let areaToAppend =
  "body > div > div > div:nth-child(2) > div.row.playlistArea > div";

let exampleListBlock = $(".linksArea > div.row.boxContainerClone");

$("#courseName").click();

$("#storeD").click(() => {
  let courseTitle = $("#courseTitle").val();
  let courseDescription = $("#description").val();
  // console.log(courseTitle);
  // console.log(courseDescription.val());
  if (courseTitle.length == 0 || courseDescription == 0) {
    alert("course title length should be greater than 0");
  } else {
    console.log(courseTitle, courseDescription);
    data["courseName"] = courseTitle;
    data["description"] = courseDescription;
    data["topics"] = [];
    $("#exampleModalLong").modal("toggle");
  }
});

let dropListElement = (target, url, title) => {
  let temp = exampleListBlock.clone(true);
  temp.toggleClass("boxContainerClone boxContainer");
  temp.find("img")[0].src = url;
  temp.find("input")[0].value = title;
  temp.insertBefore(target.parentElement);
  console.log(temp);
  console.log(target);
  //    t1 = target;
  //    t2 = element;
};
// function for add the every data box in youtube playlist
let enabledraggable = () => {
  let draggables = document.querySelectorAll(".youtubeContainerClone");
  let dropTarget = document.querySelector("#target");

  for (let i = 0; i < draggables.length; i++) {
    draggables[i].addEventListener("dragstart", function(ev) {
      ev.dataTransfer.setData("srcId", ev.target.id);
    });
  }

  dropTarget.addEventListener("dragover", function(ev) {
    ev.preventDefault();
  });

  dropTarget.addEventListener("drop", function(ev) {
    ev.preventDefault();
    let val = ev.dataTransfer.getData("srcId");
    console.log("value is ", val);
    let index = val[val.length - 1] - 1;
    console.log(index);
    console.log(document.getElementById(val));
    //        ev.target.appendChild(document.getElementById(val));
    let url = document.getElementById(val).querySelector("img").src;
    let title = document.getElementById(val).querySelector("p").innerText;
    data.topics.push({
      topicno: data.topics.length + 1,
      "topic name": document.getElementById(val).querySelector("p").innerText,
      youtubelink: playlistLinks[index],
      subtopics: null
    });
    dropListElement(ev.target, url, title);
  });
};

// displaying function

let addPlaylistVideo = (title, url, id) => {
  let temp = examplePlaylistBlock.clone(true);
  temp.attr("draggable", "true");
  temp.attr("id", `block${id + 1}`);
  temp.toggleClass("youtubeContainer youtubeContainerClone");
  temp.find("img")[0].src = url;
  temp.find("p")[0].innerText = title;
  temp.appendTo(areaToAppend);
  console.log(temp);
};
let displayPlaylist = data => {
  timepass = data;
  for (let i = 0; i < data.items.length; i++) {
    console.log(i);
    console.log(data.items[i].snippet.title);
    console.log(data.items[i].snippet.thumbnails.default.url);
    playlistLinks.push(data.items[i].snippet.resourceId.videoId);
    addPlaylistVideo(
      data.items[i].snippet.title,
      data.items[i].snippet.thumbnails.default.url,
      i
    );
  }
  enabledraggable();
  console.log(playlistLinks);
};

button.click(() => {
  //    console.log(inputArea.value);
  //    console.log(inputArea.value.split("=")[1]);
  playlistoptions.playlistId = inputArea.value.split("=")[1];
  $.getJSON(playlistURL, playlistoptions, function(data) {
    displayPlaylist(data);
  });
  inputArea.value = "";
});
