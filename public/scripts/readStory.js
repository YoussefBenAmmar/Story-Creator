// Client facing scripts here



// ------------- MAIN STORY ///public button was moved out of the story
const createStoryElement = function (story) {
  const $story = $(`
      <div class="story">
        <h1>${story[0].title}</h1>
        <p>${story[0].body}</p> 
      </div>
      <button class='publish' value = "submit"> Publish 🔐 </i> </button>
      <button class='contribute'  value="submit"  > Click Here to Add Contribution ➕ </i> </button>
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
        <p id='upvote_${contrObj[0].id}'>${contrObj[0].upvote}</p>
        <button class='upButton'  value="submit" data-attribute-upvoteid='${contrObj[0].id}' > upvote 🆙 </i> </button>
        <button class='accept' value = "submit"> Accept Contribution ✅ </i> </button>
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

    $(".upButton").click(function(event) {
      event.preventDefault();
      const id = $(event.target).attr("data-attribute-upvoteid")
      vote(id);

    })
};

const loadContr = function (id) {
  $.get(`/api/readStoryContr/${id}`, function (data) {
    renderContrElements(data);
  });

}

// --------------- VOTING

const vote = function (id) {
  $.post(`/api/readStoryContr/${id}/upvote`, function (data) {
    $.get(`/api/readStoryContr/${id}/upvote`, function(data){
      $(`#upvote_${id}`).text(data);
    })
  });
};


// ------------- PUBLISH

const publish = function(story_id) {
  $.post()
}


//-------- Contribute

const contribute = function (id){
  //console.log("contribute button is clicked");
  window.location.assign(`/create/${id}`);
  $.post(`/create/${id}`).then(
    res => {
      
    }
  )
}


$(() => {
  const button2 = `<button class='contri'  value="submit"  > Click Here to Add Contribution ➕ </i> </button>`
  $("body").append(button2);

  const currentwork = document.location.href.split("/")
  if(currentwork.length > 4) {
    console.log(currentwork);
    console.log("current work id is",currentwork[4]);
    loadSpecific(currentwork[4]);
  }

  //this was .main-div
   $(".story").click(function (event) {
    event.preventDefault();
    loadStories();
  });


  $(".contribution-button").click(function (event) {
    // console.log("contribution", loadContr())
    event.preventDefault();
    loadContr(currentwork[4]);
  });


  $(".publish").click(function (event){
    event.preventDefault();

  })

  $(".contribute").click(function (event){
    event.preventDefault();
    contribute(currentwork[4]);
  })

  //outside of main-div which works.
  $('.contri').on( 'click',function (event) {
    window.location.replace(`/create/${currentwork[4]}`);

  })


  // $(',complete').on('click', (event) => {
  //   event.preventDefault();
  //   // $form.hide(300);

  //   return $.ajax({
  //     method: 'PUT',
  //     url: `/api/readStory/${storyId}`
  //   }).then((res) => {
  //     if (res.redirect) {
  //       window.location.assign(res.redirect);
  //     } else {
  //       location.reload(true);
  //     }
  //   });
  // });
});

