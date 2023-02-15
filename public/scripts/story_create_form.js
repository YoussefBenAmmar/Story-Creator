const cookieSession = require('cookie-session');

const generateRandomString = function () {
  let result = [];
  let charas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 6; i++) {
    let rand = Math.floor(Math.random() * (charas.length - 1) + 1);
    result.push(charas[rand]);
  }
  return result.join('');
}

$(document).ready(() => {
  const area = document.getElementsByName("story")[0];
  const counter = document.getElementsByName("counter")[0];
  const show = document.getElementById("show");
  prevwork = document.getElementById("oldentry");
  new_workID = generateRandomString();
  const oldwork = document.location.href.split("/")
  let number = 140
  $(show).hide();
  $('#oldentry').hide();
  

  //checks to see if the url has story id, if it does that means its a contribution
  if (oldwork.length > 4) {
    console.log("oldwork length target ", oldwork[4])
    $.get(`/api/stories/${oldwork[4]}`)
      .then(res => {
        console.log(res.params)
        $('#oldentry').show();
        $('#oldentry').text(res.body);
        $(show).show();
      }).catch(err =>{console.log("there was a error",err.message);})
  }


  //this is the submit form. where we send what we have to the database
  $("#writingform").on('submit', function (event) {
    event.preventDefault();
    console.log("abc");
    const data = $(this).serialize();
    data['user_id'] = cookieSession.user_id;
    console.log(data);

    //if the url contains id, then submit as contribution
    if (oldwork.length > 4) {
      $.post(`/create/${oldwork[4]}`, data)
      .then(res => {
        // should be window.location.href = "/read/${oldwork}"
        window.location.href = res.redirect;
        console.log(res);
      })

    } else {
      //submit it as a new work from the story_create_routes
      $.post(`/create/${new_workID}`, data)
      .then(res => {
        //should be window.location.href = "/read/${newwork}"
        window.location.href = "/login";
        //console.log(res);
      })
    }

  })

  //shows previous entry
  $(show).on('click', function (event) {
    event.preventDefault();
    $('#oldentry').slideToggle("slow");
  });


  $(area).on("input paste focus", function () {
    number = area.textLength
    counter.textContent = number;
  })


})