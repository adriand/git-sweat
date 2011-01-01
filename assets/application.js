function drawSets(sets) {
  _(sets).each( function(exerciseSet) {
    $("#sets").append('<tr><th><h1>' + exerciseSet.title + '</h1></th><th colspan="100%"><h1><span id="completed_reps">0</span> of <span id="total_reps">' + exerciseSet.totalReps + '</span></h1></th></tr>');
    _(exerciseSet.exercises).each( function(exercise) {
      $("#sets").append('<tr><th>' + exercise.label + '</th><td>' + drawReps(exercise.reps) + '</td></tr>');
    });
  });
}

function drawReps(reps) {
  checks = "";
  _(reps).each( function(rep) {
    checks += "<td><label><input type='checkbox' /> " + rep + "</label></td>";
  });
  return checks;
}

function ExerciseSet(title) {
  this.title = title;
  this.exercises = [];
  this.totalReps = 0;

  this.load = function(exerciseSetItem) {
    this.title = $(exerciseSetItem).find('h1').html();
    $(exerciseSetItem).find('p').each( function(exerciseItem) {
      this.exercises.push(new Exercise(exerciseItem));
    });
    this.countTotalReps();
  }

  this.countTotalReps = function() {
    obj = this;
    _(this.exercises).each( function(exercise) {
      obj.totalReps += exercise.totalReps;
    });
  }
}

function Exercise(exerciseItem) {
  this.parse = function() {
    label_and_reps = $(this.exerciseItem).text().split("\n")[0].split(":");
    this.label = label_and_reps[0];
    this.reps = label_and_reps[1].trim().split(",");
    this.description = $(this.exerciseItem).find('p').html();
  }

  this.countTotalReps = function() {
    this.totalReps = _(this.reps).reduce( function(memo, num) { return parseInt(memo) + parseInt(num); } );
  }

  this.exerciseItem = exerciseItem;

  this.parse();
  this.countTotalReps();
}

function updateProgress(clickedElement) {
  completed_reps_element = $("#completed_reps");
  completed_reps = parseInt(completed_reps_element.text());
  just_completed_reps = parseInt($(clickedElement).closest('label').text());
  // TODO: this doesn't decrement
  total_so_far = completed_reps + just_completed_reps
  completed_reps_element.text(total_so_far);
  progress = (total_so_far / parseInt($("#total_reps").text())) * 100;
  $("#progress #bar").css("width", progress + "%;");
}

$( function() {
  $("#programs a").bind('click', function(event) {
    $.get($(this).attr("href"), function(data) {
      console.log(data);
    });
    event.preventDefault();
  });
  // drawSets(sets);
  $("#sets input").bind('click', function(event) {
    updateProgress(this);
  });
  $("#test").load("programs/standard_fitness_1.htm");
});
