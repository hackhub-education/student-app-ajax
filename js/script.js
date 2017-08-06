// Part 1: Fetch all student index and show skill list on click 

var APIURL = 'https://webdxd-student-api.herokuapp.com'

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
    return !query || new RegExp(query,'i').test(user.firstName) ? user : false
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