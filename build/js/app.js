(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "a85393c184865c71941852b7df5afc36";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCallDoctor = apiCallDoctor;
exports.apiCallKeyword = apiCallKeyword;
//API CALL FOR SEARCH BY NAME
function apiCallDoctor(inputName, apiKey, addDoctorToPage) {
  var promise = new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    var url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + inputName + "&location=45.523062%2C-122.676482%2C100&user_location=45.523062%2C-122.676482&skip=0&limit=10&user_key=" + apiKey;
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function (response) {
    var doctorInfo = JSON.parse(response);
    addDoctorToPage(doctorInfo);
  });
}

//API CALL FOR SEARCH BY KEYWORD
function apiCallKeyword(inputKeyword, apiKey, addKeywordToPage) {
  var promise = new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + inputKeyword + "&location=45.523062%2C-122.676482%2C100&user_location=45.523062%2C-122.676482&skip=0&limit=10&user_key=" + apiKey;
    request.onload = function () {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    };
    request.open("GET", url, true);
    request.send();
  });

  promise.then(function (response) {
    var keywordInfo = JSON.parse(response);
    addKeywordToPage(keywordInfo);
  });
}

},{}],3:[function(require,module,exports){
'use strict';

var _project = require('./../js/project.js');

var apiKey = require('./../.env').apiKey;

function addDoctorToPage(doctorInfo) {
  if (doctorInfo.meta.count === 0) {
    $('#doctorSearchResponse').append('<p>Sorry, no doctors met your search criteria. Please try your search again.</p>');
  } else {
    for (var i = 0; i < doctorInfo.data.length; i++) {
      // $('#doctorSearchResponse').append(`
      //   <p>Name: ${doctorInfo.data[i].profile.first_name}  ${doctorInfo.data[i].profile.last_name}<br>
      //   ${doctorInfo.data[i].profile.image_url}>Website<br>Accepts new patients: ${doctorInfo.data[i].practices[0].accepts_new_patients}<br>Address: ${doctorInfo.data[i].practices[0].visit_address.street}<br>${doctorInfo.data[i].practices[0].visit_address.city} ${doctorInfo.data[i].practices[0].visit_address.state}${doctorInfo.data[i].practices[0].visit_address.zip}<br>
      //   Phone: ${doctorInfo.data[i].practices[0].phones[0].number}</p>`);
      $('#doctorSearchResponse').append('<div class="card">\n        <div class="card-body">\n          <h5 class="card-title">' + doctorInfo.data[i].profile.first_name + '  ' + doctorInfo.data[i].profile.last_name + '</h5>\n          <p class="card-text">Accepts new patients: ' + doctorInfo.data[i].practices[0].accepts_new_patients + '<br>Address: ' + doctorInfo.data[i].practices[0].visit_address.street + '<br>' + doctorInfo.data[i].practices[0].visit_address.city + ' ' + doctorInfo.data[i].practices[0].visit_address.state + ' ' + doctorInfo.data[i].practices[0].visit_address.zip + '<br>\n          Phone: ' + doctorInfo.data[i].practices[0].phones[0].number + '</p></p>\n          <a href="' + doctorInfo.data[i].profile.image_url + '" class="btn btn-primary">Website</a>\n        </div>\n      </div>');
      $('#doctorSearchResponse').show();
    }
  }
}

function addKeywordToPage(keywordInfo) {
  if (keywordInfo.meta.count === 0) {
    $('#keywordSearchResponse').append('<p>Sorry, no doctors met your search criteria. Please try your search again.</p>');
  } else {
    for (var i = 0; i < keywordInfo.data.length; i++) {
      $('#keywordSearchResponse').append('\n        <p class="listing">Name: ' + keywordInfo.data[i].profile.first_name + '  ' + keywordInfo.data[i].profile.last_name + '<br>\n          ' + keywordInfo.data[i].profile.image_url + 'Website</a><br>Accepts new patients: ' + keywordInfo.data[i].practices[0].accepts_new_patients + '<br>\n          Address: ' + keywordInfo.data[i].practices[0].visit_address.street + '<br>\n          ' + keywordInfo.data[i].practices[0].visit_address.city + ' ' + keywordInfo.data[i].practices[0].visit_address.state + ' ' + keywordInfo.data[i].practices[0].visit_address.zip + '<br>\n          Phone: ' + keywordInfo.data[i].practices[0].phones[0].number + '\n           </p>');
      $('#keywordSearchResponse').show();
    }
  }
}

$(document).ready(function () {
  $(".search-again").hide();

  $("form#searchByName").submit(function (event) {
    event.preventDefault();
    var inputName = $("#doctorName").val();
    (0, _project.apiCallDoctor)(inputName, apiKey, addDoctorToPage);
    $(".searchboxes").hide();
    setTimeout(function () {
      $(".search-again").show();
    }, 4000);
  });

  $("form#searchByKeyword").submit(function (event) {
    event.preventDefault();
    var inputKeyword = $("#keyword").val();
    (0, _project.apiCallKeyword)(inputKeyword, apiKey, addKeywordToPage);
    $(".searchboxes").hide();
    setTimeout(function () {
      $(".search-again").show();
    }, 4000);
  });
});

},{"./../.env":1,"./../js/project.js":2}]},{},[3]);
