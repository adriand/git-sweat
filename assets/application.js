function doSet(exerciseSet) {
  exercise_labels = _(exerciseSet).keys();
  _(exercise_labels).each( function(exercise_label) {
    // $("#set").append("<tr>").append("<th>").html(exercise_label);
    /*$("#set").append("<tr><th>" + exercise_label + "</th>"); // </tr>");
    $("#set").append("<td>" + exerciseSet[exercise_label] + "</td>");
    $("#set").append("</tr>"); */
    $("#set").append("<tr><th>" + capitalize(exercise_label) + "</th>" + drawReps(exerciseSet[exercise_label]) + "</tr>");
  });
}

function loadSets(sets) {
  $(".set").each( function(exerciseSet) {
    exercises = [];
    title = $(exerciseSet).find('h1').html();
    $(exerciseSet).find('ul li').each( function(exerciseItem) {
      exercises.push(new Exercise(exerciseItem));
    });
    sets.push(exercises);
  });
}

function Exercise(exerciseItem) {
  this.parse = function() {
    label_and_reps = $(this.exerciseItem).text().split("\n")[0].split(":");
    this.label = label_and_reps[0];
    this.reps = label_and_reps[1].trim().split(",");
    // console.log(this.label);
    // console.log(this.reps);
    this.description = $(this.exerciseItem).find('p').html();
  }

  this.countTotalReps = function() {
    this.totalReps = _(this.reps).reduce( function(memo, num) { return memo + num; } );
  }

  this.exerciseItem = exerciseItem;

  this.parse();
  this.countTotalReps();
}

function drawReps(reps) {
  checks = "";
  _(reps).each( function(rep) {
    checks += "<td><label><input type='checkbox' /> " + rep + "</label></td>";
  });
  return checks;
}

function capitalize(label) {
  capitalizedLabel = label.replace("_", " ", "g"); // "g" doesn't work?
  return capitalizedLabel;
}

$( function() {
  
  // Push-up - 25,15,15
  // Planche both arms - 30,20,20
  
  first = {
    push_up:            [25,15,15],
    planche_both_arms:  [30,20,20]
  }

  // doSet(first);

  sets = [];
  loadSets(sets);

});
