var updateTextfields = function(data) {
  $('#probability').text(data.probability);
  $('#prediction').text(data.prediction);
  $('#steps_last_hour_result').text(data.steps_last_hour);
  $('#steps_total_result').text(data.steps_total);
  $('#treatment_id_result').text(data.treatment_id);
  $('#hour').text(data.hour);
  $('#day').text(data.day);
  $('#result').show();
}

$(function() {
  $("#prediction_form").submit(function(e) {
    var url = "/results"; // the script where you handle the form input.
    $.ajax({
      type: "POST",
      url: url,
      data: $("#prediction_form").serialize(), // serializes the form's elements.
      success: updateTextfields
    });
    //
    // avoid to execute the actual submit of the form.
    e.preventDefault();
  });

  $('select').material_select();
});
