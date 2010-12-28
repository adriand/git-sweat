function doSet(exerciseSet) {
  exercise_labels = _(exerciseSet).keys();
  _(exercise_labels).each( function(exercise_label) {
    // $("#set").append("<tr>").append("<th>").html(exercise_label);
    /*$("#set").append("<tr><th>" + exercise_label + "</th>"); // </tr>");
    $("#set").append("<td>" + exerciseSet[exercise_label] + "</td>");
    $("#set").append("</tr>"); */
    $("#set").append("<tr><th>" + exercise_label + "</th>" + drawReps(exerciseSet[exercise_label]) + "</tr>");
  });
}

function drawReps(reps) {
  checks = "";
  _(reps).each( function(rep) {
    checks += "<td><label><input type='checkbox' /> " + rep + "</label></td>";
  });
  return checks;
}

$( function() {
  
  // Push-up - 25,15,15
  // Planche both arms - 30,20,20
  
  first = {
    push_up:            [25,15,15],
    planche_both_arms:  [30,20,20]
  }

  doSet(first);

});
