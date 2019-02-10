// 3
let DragSubtopic = temp => {
  let dropTarget = temp.querySelector("#subTarget");
  dropTarget.addEventListener("dragover", function(ev) {
    ev.preventDefault();
  });

  dropTarget.addEventListener("drop", function(ev) {
    ev.preventDefault();
    console.log("you draged on me");
    let val = ev.dataTransfer.getData("srcId");
    let index = val[val.length - 1] - 1;

    console.log(val);
    console.log(document.getElementById(val));
    //        ev.target.appendChild(document.getElementById(val));
    let url = document.getElementById(val).querySelector("img").src;
    let title = document.getElementById(val).querySelector("p").innerText;
    let searchElement = dropTarget.parentElement.parentElement.previousElementSibling.querySelector(
      "h4"
    ).innerText;
    for (let i = 0; i < data.topics.length; i++) {
      if (data.topics[i]["topic name"] == searchElement) {
        data.topics[i].subtopics.push({
          "subtopic no": data.topics[i].subtopics.length + 1,
          "subtopic name": title,
          youtubelink: playlistLinks[index]
        });
      }
    }

    dropListElement(ev.target, url, title);
  });
};

let addLinkArea = () => {
  let temp = document.createElement("div");
  temp.setAttribute("class", "row");
  const markup = `
  <div class="col-md-1">
                <h4><i class="fas fa-caret-right"></i></h4>
              </div>
              <div class="col-md-11">
  <div class="input-group mb-3" id="subTarget">
  <input
  type="text"
  class="form-control"
  placeholder="Enter Link"
/>
<div class="input-group-append">
  <button
    class="btn btn-outline-secondary linkSubmit"
    type="button"
  >
    YouTubeLink
  </button>
</div>
  </div><hr></div>`;
  temp.innerHTML = markup;
  console.log(temp);
  let singleInputArea = temp.querySelector("input");
  let singleButton = temp.querySelector("button");

  singleButton.onclick = () => {
    singlevideooptions.id = singleInputArea.value.split("=")[1];
    console.log(singlevideooptions);
    $.getJSON(singlevideoURL, singlevideooptions, function(dat) {
      dropListElement(
        singleInputArea,
        dat.items[0].snippet.thumbnails.default.url,
        dat.items[0].snippet.title
      );
      console.log(dat);
      let searchElement = temp.previousElementSibling.querySelector("h4")
        .innerText;
      for (let i = 0; i < data.topics.length; i++) {
        if (data.topics[i]["topic name"] == searchElement) {
          data.topics[i].subtopics.push({
            "subtopic no": data.topics[i].subtopics.length + 1,
            "subtopic name": dat.items[0].snippet.title,
            youtubelink: dat.items[0].id
          });
        }
      }
      console.log(document.querySelector("#target"));
    }).fail(() => {
      alert("link is not valid. Enter the valid youtubeLink.");
    });
    singleInputArea.value = "";
    console.log("hellow");
  };

  DragSubtopic(temp);
  console.log("this is the", temp);
  document.querySelector("#target").before(temp);
};

topicButton.click(() => {
  let string = singleInputArea.value;
  if (string.length == 0 || string.length > 16) {
    alert("give a valid Topic Name");
  } else {
    let temp = document.createElement("div");
    temp.setAttribute("class", "topicName");
    const markup = `
      <h4>
        ${singleInputArea.value}
        <i
          class="fas fa-minus-square subgroupBox"
          style="float:right"
        ></i>
      </h4>
      <hr />
    `;
    temp.innerHTML = markup;
    console.log(temp);
    data.topics.push({
      topicno: data.topics.length + 1,
      "topic name": singleInputArea.value,
      youtubelink: null,
      subtopics: []
    });
    document.querySelector("#target").before(temp);
    addLinkArea();
  }
  singleInputArea.value = "";
});

// Add the subVideos
let subButton = $(".subgroupBox");

subButton.click(() => {
  subButton.toggleClass("fa-minus-square fa-plus-square");
  // let temp = singleInputArea.parentElement.clone();
});
