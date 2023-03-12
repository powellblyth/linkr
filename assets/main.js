
(function () {
    var client = ZAFClient.init();
    client.invoke('resize', { width: '100%', height: '200px' });

client.context().then(function(context) {
    console.log(context.location);
    // Check which page we are on
    if (context.location == 'ticket_sidebar')
    {
        client.get('ticket.requester.id').then(
            function(data) {
              var user_id = data['ticket.requester.id'];
              requestUserInfo(client, user_id);
            }
          );
    }
    else if (context.location == 'user_sidebar')
    {
        client.get('user.id').then(
            function(data) {
                console.log(data)
              var user_id = data['user.id'];
              requestUserInfo(client, user_id);
            }
          );

    }
    })


})();

function showInfo(data) {
    console.log( data.user.user_fields.fake_external_id)
    var requester_data = {
        'name': data.user.name,
        'tags': data.user.tags,
        'person_id': data.user.user_fields.fake_external_id,
        'company_id': data.user.user_fields.company_id,
        'created_at': formatDate(data.user.created_at),
        'last_login_at': formatDate(data.user.last_login_at)
    };

    var source = document.getElementById("requester-template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(requester_data);
    document.getElementById("content").innerHTML = html;
  }


  function showError(status, error) {
    var error_data = {
      'status': status,
      'statusText': error
    };

    var source = document.getElementById("error-template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(error_data);
    document.getElementById("content").innerHTML = html;
  }

  function requestUserInfo(client, id) {
    var settings = {
      url: '/api/v2/users/' + id + '.json',
      type:'GET',
      dataType: 'json',
    };

    client.request(settings).then(
      function(data) {
        showInfo(data);
        console.log(data)
      },
      function(response) {
        showError(response.status, response.stsatusText);
      }
    );

  }

  function formatDate(date) {
    var cdate = new Date(date);
    var options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    date = cdate.toLocaleDateString("en-us", options);
    return date;
  }