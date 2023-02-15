// Client facing scripts here

const createStoryElement = function (storyObj) {
  const $story = $(`
      <div class="each-story">
        <h1>${storyObj.user_id}</h1>
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

$(() => {

 const loadStories = function () {
    $.get("/api/readStory", function (data) {

      renderStoryElements(data);
    });
  };


   $(".main-div").click(function (event) {
    event.preventDefault();
    loadStories();
  });

});
