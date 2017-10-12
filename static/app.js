$(function() {
  $("#prediction_form").submit(function(e) {
    var url = "/results"; // the script where you handle the form input.
    $.ajax({
      type: "POST",
      url: url,
      data: $("#prediction_form").serialize(), // serializes the form's elements.
      success: function(data) {
        //$('#result').text(data)
        console.log(data.probability)
          //day: "Day: 1"
          //hour : "Hour: 12"
          //prediction : "no data found"
          //probability : 0
          //steps_last_hour : "Steps hour: 12"
          //steps_total : "Steps total: 120"
          //treatment_id : "Treatment_id : 1000"
        $('#probability').text(data.probability)
        $('#prediction').text(data.prediction)
        $('#steps_last_hour_result').text(data.steps_last_hour)
        $('#steps_total_result').text(data.steps_total)
        $('#treatment_id_result').text(data.treatment_id)
        $('#hour').text(data.hour)
        $('#day').text(data.day)
        console.log(JSON.stringify(data))

        $('#result').show()
      }
    });
    e.preventDefault(); // avoid to execute the actual submit of the form.

  });

  $('select').material_select();
});
