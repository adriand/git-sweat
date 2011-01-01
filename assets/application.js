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
    $("#set").html(""); // clear the table
    obj = this;
    $("#set").append('<tr><th><h1>' + obj.title + '</h1></th><th colspan="100%"><h1><span id="completed_reps">0</span> of <span id="total_reps">' + obj.totalReps + '</span></h1></th></tr>');
    _(obj.exercises).each( function(exercise) {
      $("#set").append('<tr><th>' + exercise.label + '</th><td>' + obj.drawReps(exercise.reps) + '</td></tr>');
    });
  }

  this.drawReps = function(reps) { 
    checks = "";
    _(reps).each( function(rep) {
      checks += "<td><label><input type='checkbox' /> " + rep + "</label></td>";
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

function updateProgressBar(progress) {
  $("#progress #bar").css("width", progress + "%;");
}

function updateProgress(clickedElement) {
  completed_reps_element = $("#completed_reps");
  completed_reps = parseInt(completed_reps_element.text());
  just_completed_reps = parseInt($(clickedElement).closest('label').text());
  // TODO: this doesn't decrement
  // Could just replace with a single call that traverses all checked elements and increments a total
  total_so_far = completed_reps + just_completed_reps
  completed_reps_element.text(total_so_far);
  progress = (total_so_far / parseInt($("#total_reps").text())) * 100;
  updateProgressBar(progress);
}

$( function() {
  $("#programs a").bind('click', function(event) {
    $.get($(this).attr("href"), function(data) {
      set = new ExerciseSet(data);
      set.draw();
      $("#exercising").show(); $("#programs").hide();
      $("#set input").bind('click', function(event) {
        updateProgress(this);
      });
    });
    event.preventDefault();
  });

  $("#return_to_programs").bind('click', function(event) {
    updateProgressBar(0);
    $("#exercising").hide(); $("#programs").show();
    event.preventDefault();
  });
});
