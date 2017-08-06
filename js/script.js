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