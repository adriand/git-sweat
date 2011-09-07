function ExerciseSet(exerciseSetTemplate) {
  this.title = "";
  this.exercises = [];
  this.totalReps = 0;

  this.load = function(exerciseSetTemplate) {
    items = exerciseSetTemplate.split("\n\n");
    this.title = items[0];

    for (i = 1;i < items.length;i++) {
      this.exercises.push(new Exercise(items[i]));
    }

    this.countTotalReps();
  }

  this.countTotalReps = function() {
    obj = this;
    _(this.exercises).each( function(exercise) {
      obj.totalReps += exercise.totalReps;
    });
  }

  this.draw = function() {
    $("#set").html(""); // clear the sets
    obj = this;
    $("#header_label").html(obj.title);
    _(obj.exercises).each( function(exercise) {
      $("#set").append('<div class="row"><div class="three columns"><strong>' + exercise.label + '</strong></div>' + obj.drawReps(exercise.reps) + '</div>');
    });
  }

  this.drawReps = function(reps) { 
    checks = "";
    _(reps).each( function(rep) {
      checks += "<div class='two columns'><label><input type='checkbox' /> <span>" + rep + "</span></label></div>";
    });
    return checks;
  }

  this.load(exerciseSetTemplate);
}

function Exercise(exerciseItemTemplate) {
  this.load = function(exerciseItemTemplate) {
    exerciseItems = exerciseItemTemplate.split("\n");
    label_and_reps = exerciseItems[0].split(":");
    this.label = label_and_reps[0];
    this.reps = label_and_reps[1].trim().split(",");
    // optional items
    if (exerciseItems.length > 1) this.description = exerciseItems[1]; 
  }

  this.countTotalReps = function() {
    this.totalReps = _(this.reps).reduce( function(memo, num) { return parseInt(memo) + parseInt(num); } );
  }

  this.load(exerciseItemTemplate);
  this.countTotalReps();
}

function Progress() {
  this.progress = 0;
  this.total = 0;

  this.reset = function() {
    this.progress = 0;
    $("#total_reps").html(this.total);
    this.draw();
  }

  this.draw = function() {
    percentage = Math.round((this.progress / this.total) * 100);
    $("#progress #bar").css("width", percentage + "%;");
    $("#completed_reps").html(this.progress);
    if (this.progress == this.total) {
      $("#progress #bar").addClass('completed');
    } else {
      $("#progress #bar").removeClass('completed');
    }
  }

  this.update = function(clickedElement) {
    just_completed = parseInt($(clickedElement).closest('label').text());
    if ($(clickedElement).is(':checked')) {
      this.progress += just_completed;
    } else {
      this.progress -= just_completed;
    }

    this.draw();
  }

}

$( function() {
  progress = new Progress();
  
  $("li.program a").bind('click', function(event) {
    $.get($(this).attr("href"), function(data) {
      // load and draw a new set of exercises based on the data retrieved via AJAX, post-click
      set = new ExerciseSet(data);
      set.draw();

      // save the total number of reps into our progress object so we can calculate percentage complete
      progress.total = set.totalReps;
      // reset progress bar status and show the total number of reps
      progress.reset();

      // show the exercise set and hide the index of exercise programs
      $("#exercising").show(); $("#programs").hide();

      // when one of the checkboxes is clicked, update progress appropriately
      $("#set input").bind('click', function(event) {
        progress.update(this);
      });

      // Fix mobile Safari's lack of support for clickable labels by triggering a click event on the
      // inputs when a *containing* (i.e. does not use the 'for' attribute) label is clicked. 
      $("#set label").bind('click', function(event) {
        $('a', $(this)).trigger('click');
      });
    });
    event.preventDefault();
  });

  $("#return_to_programs").bind('click', function(event) {
    // hide the set of exercises, and show the list of exercise programs
    $("#exercising").hide(); $("#programs").show();
    $("#header_label").html("");
    event.preventDefault();
  });

  /* two ways of responding to appcache events:
  window.applicationCache.onchecking = function() {
    console.log("Checking...");
  }

  function yo() { alert('yo'); }

  window.applicationCache.addEventListener('checking', yo, false);
  */

});
