Users = new Mongo.Collection("users");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    users: function () {
      return Users.find({});
    }
  });


  Template.body.events({
  "submit .new-user": function (event) {
    // This function is called when the new task form is submitted

    var first = event.target.first.value;
    var last = event.target.last.value;
    var email = event.target.email.value;
    var id = event.target.id.value;

    if (id == ""){
      Users.insert({
        first: first,
        last: last,
        email: email
      });
    }
    else {
      Users.update(id, { $set: {'first': first, 'last': last, 'email': email}});

    }

    // Clear form
    event.target.first.value = "";
    event.target.last.value = "";
    event.target.email.value = "";
    event.target.id.value = "";

    // Prevent default form submit
    return false;
    },

  });
  Template.user.events({
    "click .edit": function () {
    document.getElementById("first").value = this.first;
    document.getElementById("last").value = this.last;
    document.getElementById("email").value = this.email;
    document.getElementById("id").value = this._id;


    },

  "click .remove": function () {
    Users.remove(this._id);
  }
});
}

