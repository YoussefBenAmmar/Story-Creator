//const storyq = require("db/queries/story_queries");

//const { json } = require("express");

const generateRandomString = function () {
  let result = [];
  let charas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0 ; i < 6; i++) {
    let rand = Math.floor(Math.random() * (charas.length - 1) + 1);
    result.push(charas[rand]);
  }
  return result.join('');
}

$(document).ready(()=>{
  const area = document.getElementsByName("story")[0];
  const counter = document.getElementsByName("counter")[0];
  const show = document.getElementById("show");
  prevwork = document.getElementById("oldentry");
  let number = 140

  $('#oldentry').text("previous entry here");
 
  $(document).find("form").on('submit',function(event) {
    event.preventDefault();
    console.log("abc");
    
    
    console.log(JSON($(this).serialize()));

    $.ajax({
      url:`/create`,
      method:"POST",
      data : $(this).serialize(),
      success : (ev) => {
       console.log($(this).serialize());
       $writing.value = "";
      }
    }); 

  })


  $(show).on('click', function(event) {
    event.preventDefault();
    console.log("shoooowwww");
    $('#oldentry').slideToggle("slow");
  });


  $(area).on("input paste focus",function() {
    number = area.textLength
    counter.textContent = number;
  })


})