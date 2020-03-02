function signUp(event) {
  event.preventDefault();
  var name = document.getElementById('signup-name').value;
  var email = document.getElementById('signup-email').value;
  var phoneNumber = document.getElementById('signup-phone-number').value;
  var password = document.getElementById('signup-password').value;
  var roleOptions = document.getElementsByName('role');
  var role;
  for (i = 0; i < roleOptions.length; i++) {
    if (roleOptions[i].checked) {
      role = roleOptions[i].value;
    }
  }

  if (role == undefined || name == '' || email == '' || phoneNumber == '') {
    alert('All the fields and options are mandatory to fill.');
  } else {
    var users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      var emailExist = false;
      for (i = 0; i < users.length; i++) {
        if (users[i].email == email) {
          emailExist = true;
          break;
        }
      }
      if (emailExist) {
        alert('Email already exist.');
      } else {
        users.push({
          name,
          email,
          phoneNumber,
          role,
          password
        });
      }
    } else {
      var users = [{ name, email, phoneNumber, role, password }];
    }
    localStorage.setItem('users', JSON.stringify(users));
    alert('You are successfully signed up.');
    window.location.href = 'login.html';
  }
}

function logIn(event) {
  event.preventDefault();
  var email = document.getElementById('login-email').value;
  var password = document.getElementById('login-password').value;
  if (email == '' || password == '') {
    alert('Please fill in both fields.');
  } else {
    var users = JSON.parse(localStorage.getItem('users'));
    var loginSuccess = false;
    var userData = {};
    if (users) {
      for (i = 0; i < users.length; i++) {
        if (users[i].email == email) {
          if (users[i].password == password) {
            userData = users[i];
            loginSuccess = true;
            break;
          }
        }
      }
      if (loginSuccess) {
        delete userData.password; //For removing password from object so it doesn't get used anywhere.
        localStorage.setItem('user', JSON.stringify(userData));
        window.location.href = 'index.html';
      } else {
        alert('Invalid Login.');
      }
    } else {
      alert('Invalid login.');
    }
  }
}

function addProperty(event) {
  event.preventDefault();

  var address = document.getElementById('property-address').value;
  var neighborhood = document.getElementById('property-neighborhood').value;
  var sqft = document.getElementById('property-square-feet').value;
  var parking = document.getElementById('property-parking').checked;
  var transportation = document.getElementById('property-transportation')
    .checked;
  var visibility = document.getElementById('property-visibility').checked;
  if (address == '' || neighborhood == '' || sqft == '') {
    alert('Please fill in all the text fields.');
  } else {
    var properties = JSON.parse(localStorage.getItem('properties'));
    var email = JSON.parse(localStorage.getItem('user')).email;
    var id = Math.floor(Math.random() * 1000000000);

    var alreadyExist = [];
    if (properties) {
      alreadyExist = properties.filter(function(property) {
        if (property.id == id) {
          return property;
        }
      });
    }
    if (alreadyExist.length > 0) {
      alert('Something went wrong! Please try again.');
    } else {
      if (properties) {
        properties.push({
          id,
          address,
          neighborhood,
          sqft,
          parking,
          transportation,
          email,
          visibility
        });
      } else {
        var properties = [
          {
            id,
            address,
            neighborhood,
            sqft,
            parking,
            transportation,
            email,
            visibility
          }
        ];
      }
      localStorage.setItem('properties', JSON.stringify(properties));
      alert('Added Property Successfully.');
      window.location.href = 'my-properties.html';
    }
  }
}

function isLoggedIn() {
  if (localStorage.getItem('user')) {
    return true;
  } else return false;
}

function isOwner() {
  if (JSON.parse(localStorage.getItem('user')).role == 'owner') {
    return true;
  } else return false;
}

function isCoWorker() {
  if (JSON.parse(localStorage.getItem('user')).role == 'co-worker') {
    return true;
  } else return false;
}

function createNavigationLink(label, url) {
  var navigation = document.getElementById('navigation');
  var a = document.createElement('a');
  a.setAttribute('href', url);
  var label = document.createTextNode(label);
  a.appendChild(label);
  navigation.appendChild(a);
}

window.onload = function() {
  if (isLoggedIn()) {
    if (isOwner()) {
      createNavigationLink('Add New', 'add-property.html');
      createNavigationLink('My Properties', 'my-properties.html');
    } else {
      createNavigationLink('All Workspaces', 'workspaces.html');
      createNavigationLink('Search', 'search.html');
    }
    createNavigationLink('Sign Out', 'signout.html');
  } else {
    createNavigationLink('Signup', 'signup.html');
    createNavigationLink('Login', 'login.html');
  }
};