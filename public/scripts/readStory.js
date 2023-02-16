// Client facing scripts here

// ------------- MAIN STORY ///public button was moved out of the story
const createStoryElement = function (story) {
  const $story = $(`
      <div class="story">
        <h1>${story[0].title}</h1>
        <p>${story[0].body}</p>
      </div>
      <button class='publish' value = "submit"> Publish 🔐 </i> </button>
    `);
  return $story;
};
const renderStoryElements = function (story) {
  console.log("story", story);

  const eachStory = createStoryElement(story);
  $(".main-div").append(eachStory);
};

const loadStories = function () {
  $.get("/api/readStory", function (data) {
    renderStoryElements(data);
  });
};

const loadSpecific = function (id) {
  $.get(`/api/readStory/${id}`, function (data) {
    renderStoryElements(data);
  });
};

// ----------------- CONTRIBUTIONS

const createContrElement = function (contrObj) {
  console.log("contrObj", contrObj);
  const $contribution = $(`
      <div class="contribution">
        <h1>${contrObj.name}</h1>
        <p>${contrObj.message}</p>
        <p id='upvote_${contrObj.id}'>${contrObj.upvote}</p>
        <button class='upButton'  value="submit" data-attribute-upvoteid='${contrObj.id}' > upvote 🆙 </i> </button>
        <button class='accept' value = "submit"> Accept Contribution ✅ </i> </button>
      </div>
    `);
  return $contribution;
};

const renderContrElements = function (contribution) {
  console.log(contribution);
  for (element of contribution) {
    console.log("individual contributions :", element);
    const eachContr = createContrElement(element);
    $(".contributions").append(eachContr);
  }

  $(".upButton").click(function (event) {
    event.preventDefault();
    const id = $(event.target).attr("data-attribute-upvoteid");
    vote(id);
  });
};

const loadContr = function (id) {
  $.get(`/api/readStoryContr/${id}`, function (data) {
    renderContrElements(data);
  });
};

// --------------- VOTING

const vote = function (id) {
  $.post(`/api/readStoryContr/${id}/upvote`, function (data) {
    $.get(`/api/readStoryContr/${id}/upvote`, function (data) {
      console.log("data here is", data.rows[0].count);
      $(`#upvote_${id}`).text(data.rows[0].count);
    });
  });

  // $.post(`/api/readStoryContr/${id}/upvote`).then(
  //   res =>{
  //     $.get(`/api/readStoryContr/${id}/upvote`).then(
  //       data=>{
  //         $(`#upvote_${id}`).text(data.upvote);
  //       }
  //     )
  //   }
  // )
};

// ------------- PUBLISH

const publish = function (story_id) {
  $.post(`${story_id}/publish`).then((res) => {
    window.location.assign(`/publish/${story_id}`);
  });
};

//-------- Contribute

const contribute = function (id) {
  //console.log("contribute button is clicked");
  window.location.assign(`/create/${id}`);
  $.post(`/create/${id}`).then((res) => {});
};

$(() => {
  const button2 = `<button class='contri'  value="submit"  > Click Here to Add Contribution ➕ </i> </button>`;
  $("body").append(button2);

  const currentwork = document.location.pathname.split("/")[2];
  if (currentwork) {
    console.log(currentwork);
    console.log("current work id is", currentwork);
    loadSpecific(currentwork);
  }

  // //this was .main-div
  //  $(".story").click(function (event) {
  //   event.preventDefault();
  //   loadStories();
  // });

  $(".contribution-button").click(function (event) {
    const currentwork = document.location.pathname.split("/")[2];
    $(".contributions").empty();
    event.preventDefault();
    loadContr(currentwork);
  });

  $(".publish").click(function (event) {
    event.preventDefault();
  });

  $(".contribute").click(function (event) {
    const currentwork =
      document.location.href[document.location.href.length - 1];

    event.preventDefault();
    contribute(currentwork);
  });

  //outside of main-div which works.
  $(".contri").on("click", function (event) {
    window.location.replace(`/create/${currentwork}`);
  });
});
