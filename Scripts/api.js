const api = {

  search: function (query) {
    return $.ajax({
      type: 'GET',
      url: '/api/logs',
      dataType: 'json',
      data: query
    });
  },

  details: function (id) {
    return $.ajax({
      type: 'GET',
      url: `/api/logs/${id}`,
      dataType: 'json',
    });
  },

  update: function (id, obj) {
    return $.ajax({
      type: 'PATCH',
      url: `/api/logs/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj)
    });
  },

  create: function (obj) {
    return $.ajax({
      type: 'POST',
      url: 'api/logs',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj)
    });
  },

  remove: function (id) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/notes/${id}`,
      dataType: 'json'
    });
  }
}