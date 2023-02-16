const createStoryElement = function (storyObj) {
  const $story = $(`
      <div class="each-story">
        <h1>${storyObj.id}</h1>
        <p>${storyObj.body}</p>
      </div>
    `);
  return $story;
};
const renderStoryElements = function (stories) {
  for (let story of stories) {
    const eachStory = createStoryElement(story);
    $(".main-div").append(eachStory);
  }
};
const renderStory = function (story) {
  const eachStory = createStoryElement(story[0]);
  $(".main-div").append(eachStory);
};

$(() => {
  const loadStories = function () {
    $.get("/index/api", function (stories) {
      renderStoryElements(stories);
    });
  };
  loadStories();
  $("#searchStory").on("submit", function (event) {
    event.preventDefault();
    const val = $("#search").val();
    $.post("/index/api", { name: val }).then((res) => {
      if (res.length === 0) {
        $(".main-div").empty();
        $(".main-div").append("<h1>Story not found!</h1>");
      } else {
        $(".main-div").empty();
        renderStory(res);
      }
    });
  });
});
