import { apiCallDoctor } from './../js/project.js';
import { apiCallKeyword } from './../js/project.js';
var apiKey = require('./../.env').apiKey;

function addDoctorToPage(doctorInfo){
  if (doctorInfo.meta.count === 0) {
    $('#doctorSearchResponse').append(`<p>Sorry, no doctors met your search criteria. Please try your search again.</p>`);
  } else {
    for (var i = 0; i < doctorInfo.data.length; i++) {
      // $('#doctorSearchResponse').append(`
      //   <p>Name: ${doctorInfo.data[i].profile.first_name}  ${doctorInfo.data[i].profile.last_name}<br>
      //   ${doctorInfo.data[i].profile.image_url}>Website<br>Accepts new patients: ${doctorInfo.data[i].practices[0].accepts_new_patients}<br>Address: ${doctorInfo.data[i].practices[0].visit_address.street}<br>${doctorInfo.data[i].practices[0].visit_address.city} ${doctorInfo.data[i].practices[0].visit_address.state}${doctorInfo.data[i].practices[0].visit_address.zip}<br>
      //   Phone: ${doctorInfo.data[i].practices[0].phones[0].number}</p>`);
      $('#doctorSearchResponse').append(`<div class="card">
        <div class="card-body">
          <h5 class="card-title">${doctorInfo.data[i].profile.first_name}  ${doctorInfo.data[i].profile.last_name}</h5>
          <p class="card-text">Accepts new patients: ${doctorInfo.data[i].practices[0].accepts_new_patients}<br>Address: ${doctorInfo.data[i].practices[0].visit_address.street}<br>${doctorInfo.data[i].practices[0].visit_address.city} ${doctorInfo.data[i].practices[0].visit_address.state} ${doctorInfo.data[i].practices[0].visit_address.zip}<br>
          Phone: ${doctorInfo.data[i].practices[0].phones[0].number}</p></p>
          <a href="${doctorInfo.data[i].profile.image_url}" class="btn btn-primary">Website</a>
        </div>
      </div>`);
      $('#doctorSearchResponse').show();
    }
  }
}

function addKeywordToPage(keywordInfo){
  if (keywordInfo.meta.count === 0) {
    $('#keywordSearchResponse').append(`<p>Sorry, no doctors met your search criteria. Please try your search again.</p>`);
  } else {
    for (var i = 0; i < keywordInfo.data.length; i++) {
      $('#keywordSearchResponse').append(`
        <p class="listing">Name: ${keywordInfo.data[i].profile.first_name}  ${keywordInfo.data[i].profile.last_name}<br>
          ${keywordInfo.data[i].profile.image_url}Website</a><br>Accepts new patients: ${keywordInfo.data[i].practices[0].accepts_new_patients}<br>
          Address: ${keywordInfo.data[i].practices[0].visit_address.street}<br>
          ${keywordInfo.data[i].practices[0].visit_address.city} ${keywordInfo.data[i].practices[0].visit_address.state} ${keywordInfo.data[i].practices[0].visit_address.zip}<br>
          Phone: ${keywordInfo.data[i].practices[0].phones[0].number}
           </p>`);
      $('#keywordSearchResponse').show();
    }
  }
}

$(document).ready(function(){
  $(".search-again").hide();

  $("form#searchByName").submit(function(event) {
    event.preventDefault();
    let inputName = $("#doctorName").val();
    apiCallDoctor(inputName, apiKey, addDoctorToPage);
    $(".searchboxes").hide();
    setTimeout(function() {
      $(".search-again").show();
    }, 4000);
  });

  $("form#searchByKeyword").submit(function(event) {
    event.preventDefault();
    let inputKeyword = $("#keyword").val();
    apiCallKeyword(inputKeyword, apiKey, addKeywordToPage);
    $(".searchboxes").hide();
    setTimeout(function() {
      $(".search-again").show();
    }, 4000);
  });
});
