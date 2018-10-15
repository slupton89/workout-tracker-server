const api = (function () {

  const search = function (query) {
    return $.ajax({
      type: 'GET',
      url: '/api/logs',
      dataType: 'json',
      data: query,
      headers: { 'Authorization': `Bearer ${store.currentUser.authToken}`}
    });
  },

  const details = function (id) {
    return $.ajax({
      type: 'GET',
      url: `/api/logs/${id}`,
      dataType: 'json',
      headers: { 'Authorization': `Bearer ${store.currentUser.authToken}`}
    });
  },

  const update = function (id, obj) {
    return $.ajax({
      type: 'PATCH',
      url: `/api/logs/${id}`,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(obj),
      headers: { 'Authorization': `Bearer ${store.currentUser.authToken}`}
    });
  },

  const create = function (obj) {
    return $.ajax({
      type: 'POST',
      url: 'api/logs',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj),
      headers: { 'Authorization': `Bearer ${store.currentUser.authToken}`}
    });
  },

  const remove = function (id) {
    return $.ajax({
      type: 'DELETE',
      url: `/api/logs/${id}`,
      dataType: 'json',
      headers: { 'Authorization': `Bearer ${store.currentUser.authToken}`}
    });
  }

  return {
    create,
    search,
    details,
    update,
    remove
  };
}());