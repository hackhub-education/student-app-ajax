// Part 1: Fetch all student index and show skill list on click 

var APIURL = 'http://webdxd-student-api.herokuapp.com'

$.ajax({
  method: 'GET',
  url: APIURL + '/student',
})
.done(function( studentList ) {
  for (var i = 0; i < studentList.length; i++) {
    $('#sList').append($('<li>')
      .html('<p class="showSkills" id=' + studentList[i]._id + '>' + studentList[i].firstName + '</p>'))
  }

  $('#sList').on('click', '.showSkills', function() {
    var sid = $(this).attr('id')
    $.ajax({
      method: 'GET',
      url: APIURL + '/student/' + sid,
    })
    .done(function( studentDetail ) {
      var skillList = studentDetail.skills
      for (var i = 0; i < skillList.length; i++) {
        $('#' + studentDetail._id).append($('<span>').addClass('tag').text(skillList[i]))
      }
      $('#' + studentDetail._id).removeClass('showSkills')
    })
  })
})

// Part 2: Fetch from server api during search

var findUser = function(user, query) {
  if (query && user) {
    console.log(user)
    return user.skills.includes(query) ? user : false
  } else {
    return false
  }
}

$('#search-btn').click(function() {
  
  $('#user-container').empty()
  var query = $('#search').val()

  $.get(APIURL + '/student/', function(response) {
    for (var i = 0; i < response.length; i++) {
      if (findUser(response[i], query)) {
        var currentUser = $('<div>').addClass('user').attr('id', response[i]._id)
        $('<h1>').text(response[i].firstName).appendTo(currentUser)
        $('#user-container').append(currentUser)
      }
    }
  })
})

// Part 3: Add new student using add student form

$('#add-form').submit(function(e) {

  e.preventDefault()

  var skillList = $('#skills').val().split(',')

  var newStudent = {
    firstName: $('#fname').val(),
    lastName: $('#lname').val(),
    school: $('#school').val(),
    age: $('#age').val(),
    email: $('#email').val(),
    skills: skillList,
  }

  $.ajax({
    type: 'POST',
    url: APIURL + '/student',
    data: JSON.stringify(newStudent),
    contentType: 'application/json',
    success: function(data) { 
      $('#add-form').trigger('reset')
      alert('Success!')
    }
  });
})
