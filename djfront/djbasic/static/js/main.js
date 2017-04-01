$(document).ready(function(){
  $('form').submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/customer/save/',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(data){
        console.log(data);
        location.href = '/customer/';
      },
      error: function(error, response, settings){
        console.error(settings.url, response, error.toString());
      }
    });
  });
});

// set up jQuery ajax object to always send CSRF token in headers

var getCookie = function (name) {
  var cookieValue = null;
  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrfSafeMethod = function (method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
  }
});