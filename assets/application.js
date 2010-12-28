function drawSets(sets) {
  _(sets).each( function(exerciseSet) {
    // $("#sets").append('<tr><th><h1>' + exerciseSet.title + '</h1></th><th>' + exerciseSet.totalReps + '</th></tr>');
    $("#sets").append('<tr><th><h1>' + exerciseSet.title + '</h1></th></tr>');
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

function loadSets(sets) {
  $(".set").each( function(exerciseSetItem) {
    title = $(exerciseSetItem).find('h1').html();
    exerciseSet = new ExerciseSet(title);
    $(exerciseSetItem).find('ul li').each( function(exerciseItem) {
      exerciseSet.exercises.push(new Exercise(exerciseItem));
    });
    exerciseSet.countTotalReps();
    sets.push(exerciseSet);
  });
}

function ExerciseSet(title) {
  this.title = title;
  this.exercises = [];
  this.totalReps = 0;

  this.countTotalReps = function() {
    this.totalReps += _(this.exercises).reduce( function(memo, exercise) {
      return memo + exercise.totalReps;
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
    this.totalReps = _(this.reps).reduce( function(memo, num) { return memo + num; } );
  }

  this.exerciseItem = exerciseItem;

  this.parse();
  this.countTotalReps();
}

$( function() {
  sets = [];
  loadSets(sets);
  drawSets(sets);
  $(".set").hide();
});
