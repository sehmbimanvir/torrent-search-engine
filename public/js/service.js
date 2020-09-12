function deleteService (serviceId) {
  if (confirm('Are you sure ?')) {
    $.ajax({
      url: window.location.href + '/' + serviceId,
      type: 'DELETE',
      success: function (response) {
        window.location.reload()
      }
    })
  }
}


function checkService (serviceId) {
  $.ajax({
    url: window.location.href + '/' + serviceId + '/check',
    type: 'GET',
    success: function (data) {
      alert(data.message)
    },
    error: function (response) {
      alert(response.responseJSON.message)
    }
  })
}