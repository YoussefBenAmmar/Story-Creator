// Client facing scripts here



// ------------- MAIN STORY
const createStoryElement = function (story) {
  const $story = $(`
      <div class="story">
        <h1>${story[0].title}</h1>
        <p>${story[0].body}</p>
      </div>
    `);
  return $story;
};
const renderStoryElements = function (story) {
  console.log("story", story)

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
  console.log("contrObj", contrObj)
  const $contribution = $(`
      <div class="contribution">
        <h1>${contrObj[0].name}</h1>
        <p>${contrObj[0].message}</p>
        <p>${contrObj[0].upvote}</p>

      </div>
    `);
  return $contribution;
};

const renderContrElements = function (contribution) {
for (element of contribution) {
  console.log("individual contributions :", element);
}
    const eachContr = createContrElement(contribution);
    $(".contributions").append(eachContr);
};

const loadContr = function (id) {
  $.get(`/api/readStoryContr/${id}`, function (data) {
    // console.log(data);
    // console.log(data[0].title);
    // console.log(data[0].message);
    renderContrElements(data);
  });

}

// --------------- VOTING

const vote = function () {
  $.get("/api/readStory", function (data) {

  });
};

$(() => {
  const currentwork = document.location.href.split("/")
  if(currentwork.length > 4) {
    console.log(currentwork);
    console.log("current work id is",currentwork[4]);
    loadSpecific(currentwork[4]);
  }


   $(".main-div").click(function (event) {
    event.preventDefault();
    loadStories();
  });


  $(".contributions").click(function (event) {
    // console.log("contribution", loadContr())
    event.preventDefault();
    loadContr(currentwork[4]);
  });

  // $(".upButton").click(function (event) {
  //   event.preventDefault();

  // });


});
