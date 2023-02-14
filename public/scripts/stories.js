const  getStory  = require('../db/queries/stories');
const createStoryElement = function (storyObj) {
  const $story = $(` <div class="main-div">
      <div class="each-story">
        <h1>${storyObj.name}</h1>
        <p>${storyObj.story}</p>
      </div>
    </div>`);
  return $story;
};
const renderStoryElements = function (stories) {
  for (let story of stories) {
    const eachStory = createStoryElement(story);
    $(".main-div").append(eachStory);
  }
};

$(() => {
  $(".main-div").click(function () {
    renderStoryElements(getStory.getStory());
  });
});
