const createStoryElement = function (storyObj) {
  const $story = $(`
      <div class="each-story">
        <h1>${storyObj.id}</h1>
        <p>${storyObj.body}</p>
        <p>${storyObj.completed}</p>
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
  $("#loginButton").click(function (event) {
    event.preventDefault;
    window.location.assign(`/login`);
  });
  $("#searchStory").on("submit", function (event) {
    event.preventDefault();
    const val = $("#search").val();
    $.post("/index/api", { name: val }).then((res) => {
      console.log("this is res", res);
      if (res.length === 0) {
        $(".main-div").empty();
        $(".main-div").append("<h1>Story not found!</h1>");
      } else {
        window.location.assign(`/readStory/${val}`);

        // $(".main-div").empty();
        // renderStory(res);
      }
    });
  });
});
