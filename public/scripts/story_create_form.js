//const storyq = require("db/queries/story_queries");

//const { addStory } = require("../../db/queries/stories");

//const { json } = require("express");

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
  const oldwork = document.location.href.split("/")
  let number = 140

  //if the story is continuation

  //checks to see if the url 
  if (oldwork.length > 4) {
    $.get("/api/stories")
      .then(res => {
        $('#oldentry').text(res.body);
      }).catch(err =>{})
  } else { //probably need to remove this else.
    $('#oldentry').remove();
  }


  $("#writingform").on('submit', function (event) {
    event.preventDefault();
    console.log("abc");
    const data = $(this).serialize();
    console.log(data);

    //if the url contains id, then submit as contribution
    if (oldwork.length > 4) {
      $.post(`/api/stories/${oldwork[4]}`, data)
      .then(res => {
        console.log(res);
      })
    } else {
      $.post("/api/stories", data)
      .then(res => {
        console.log(res);
      })
    }

  })


  $(show).on('click', function (event) {
    event.preventDefault();
    console.log("shoooowwww");
    $('#oldentry').slideToggle("slow");
  });


  $(area).on("input paste focus", function () {
    number = area.textLength
    counter.textContent = number;
  })


})