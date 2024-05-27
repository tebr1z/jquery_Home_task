$(document).ready(function() {
    $('#search').click(function() {
        var city = $('#citys').val();
        var units = $('#options').val();
      
        var apiUrl = `https://api.weatherapi.com/v1/current.json?key=6bc15cfb31414fbda9f95625221905&q=${city}`;

        $.get(apiUrl, function(data) {
            $('#city').text(data.location.name);
            $('#country').text(data.location.country);

            if (units === 'cel') {
                $('#weather').text(data.current.temp_c + '°C');
            } else if (units === 'fah') {
                $('#weather').text(data.current.temp_f + '°F');
            } else {
                $('#weather').text(data.current.temp_c + '°C / ' + data.current.temp_f + '°F');
            }

            $('#sky-condition').text(data.current.condition.text);

            var conditionText = data.current.condition.text;
                    $('#condition').text(conditionText);

            var iconUrl = "https:" + data.current.condition.icon;
            $('#weather-icon').attr('src', iconUrl);

        }).fail(function() {
            alert('City not found or API request failed.');
        });
    });
});