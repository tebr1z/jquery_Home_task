$(document).ready(function() {
    const locations = {
        "Azerbaycan": {
            "Bakı": ["Nərimanov", "Nəsimi", "Xətai"],
            "Gəncə": ["Kapaz", "Nizami"],
            "Naxçıvan": ["İstisna"],
            "Sumqayıt": ["İstisna"],
            "Lənkəran": ["İstisna"],
            "Mingəçevir": ["İstisna"],
            "Naftalan": ["İstisna"],
            "Xankəndi": ["İstisna"],
            "Şəki": ["İstisna"],
            "Şirvan": ["İstisna"],
            "Yevlax": ["İstisna"],
            "Abşeron rayonu": ["Xırdalan şəhəri"],
            "Ağcabədi rayonu": ["İstisna"],
            "Ağdam rayonu": ["Quzanlı qəsəbəsi"],
            "Ağdaş rayonu": ["İstisna"],
            "Ağdərə rayonu": ["İstisna"],
            "Ağstafa rayonu": ["İstisna"],
            "Ağsu rayonu": ["İstisna"],
            "Astara rayonu": ["İstisna"],
            "Babək rayonu": ["İstisna"],
            "Balakən rayonu": ["İstisna"],
            "Beyləqan rayonu": ["İstisna"],
            "Bərdə rayonu": ["İstisna"],
            "Biləsuvar rayonu": ["İstisna"],
            "Cəbrayıl rayonu": ["İstisna"],
            "Cəlilabad rayonu": ["İstisna"],
            "Culfa rayonu": ["İstisna"],
            "Daşkəsən rayonu": ["İstisna"],
            "Füzuli rayonu": ["İstisna"],
            "Gədəbəy rayonu": ["İstisna"],
            "Goranboy rayonu": ["İstisna"],
            "Göyçay rayonu": ["İstisna"],
            "Göygöl rayonu": ["İstisna"],
            "Hacıqabul rayonu": ["İstisna"],
            "Xaçmaz rayonu": ["İstisna"],
            "Xızı rayonu": ["İstisna"],
            "Xocalı rayonu": ["İstisna"],
            "Xocavənd rayonu": ["İstisna"],
            "İmişli rayonu": ["İstisna"],
            "İsmayıllı rayonu": ["İstisna"],
            "Kəlbəcər rayonu": ["İstisna"],
            "Kəngərli rayonu": ["Qıvraq qəsəbəsi"],
            "Kürdəmir rayonu": ["İstisna"],
            "Qax rayonu": ["İstisna"],
            "Qazax rayonu": ["İstisna"],
            "Qəbələ rayonu": ["İstisna"],
            "Qobustan rayonu": ["İstisna"],
            "Quba rayonu": ["İstisna"],
            "Qubadlı rayonu": ["İstisna"],
            "Qusar rayonu": ["İstisna"],
            "Laçın rayonu": ["İstisna"],
            "Lerik rayonu": ["İstisna"],
            "Lənkəran rayonu": ["İstisna"],
            "Masallı rayonu": ["İstisna"],
            "Neftçala rayonu": ["İstisna"],
            "Oğuz rayonu": ["İstisna"],
            "Ordubad rayonu": ["İstisna"],
            "Saatlı rayonu": ["İstisna"],
            "Sabirabad rayonu": ["İstisna"],
            "Salyan rayonu": ["İstisna"],
            "Samux rayonu": ["İstisna"],
            "Sədərək rayonu": ["Heydərabad qəsəbəsi"],
            "Siyəzən rayonu": ["İstisna"],
            "Şabran rayonu": ["İstisna"],
            "Şahbuz rayonu": ["İstisna"],
            "Şamaxı rayonu": ["İstisna"],
            "Şəki rayonu": ["İstisna"],
            "Şəmkir rayonu": ["İstisna"],
            "Şərur rayonu": ["İstisna"],
            "Şuşa rayonu": ["İstisna"],
            "Tərtər rayonu": ["İstisna"],
            "Tovuz rayonu": ["İstisna"],
            "Ucar rayonu": ["İstisna"],
            "Yardımlı rayonu": ["İstisna"],
            "Yevlax rayonu": ["İstisna"],
            "Zaqatala rayonu": ["İstisna"],
            "Zəngilan rayonu": ["İstisna"],
            "Zərdab rayonu": ["İstisna"]
        },

        "Türkiye": {
            "İstanbul": ["Kadıköy", "Beşiktaş", "Üsküdar"],
            "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"]
        }
    };

    $('#country').change(function() {
        const country = $(this).val();
        $('#city').empty().append('<option value="">Şehər seçin</option>');
        $('#district').empty().append('<option value="">İlk olaraq şeher seçin</option>');

        if (country) {
            const cities = Object.keys(locations[country]);
            for (let city of cities) {
                $('#city').append(`<option value="${city}">${city}</option>`);
            }
        }
    });

    $('#city').change(function() {
        const country = $('#country').val();
        const city = $(this).val();
        $('#district').empty().append('<option value="">Rayon seçin</option>');

        if (city) {
            const districts = locations[country][city];
            for (let district of districts) {
                $('#district').append(`<option value="${district}">${district}</option>`);
            }
        }
    });
    $('#location-form').submit(function(event) {
        event.preventDefault();
        
        const country = $('#country').val().trim();
        const city = $('#city').val().trim();

        const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

        $('#location-info').html(`<h2>${country}, ${city} Namaz vaxtlari</h2>`);

        $('#namaz-times').html('<div class="spinner-border text-primary" role="status"><span class="sr-only">Yüklənir</span></div>');

        $.getJSON(apiUrl, function(data) {
            const timings = data.data.timings;
            const date = data.data.date.gregorian.date;
            const hijriDate = data.data.date.hijri.date;
            const timezone = data.data.meta.timezone;

            $('#date-info').html(`
                <p><strong>Qriqori Tarixi:</strong> ${date}</p>
                <p><strong>Hicri Tarixi:</strong> ${hijriDate}</p>
                <p><strong>Saat:</strong> ${timezone} <strong> vaxti ilə göstərilir</strong> </p>
            `);

            let html = '<table class="table table-striped mt-4">';
            html += '<thead><tr><th>Namaz</th><th>Vaxtı</th></tr></thead><tbody>';

            for (let time in timings) {
                html += `<tr><td>${time}</td><td>${timings[time]}</td></tr>`;
            }

            html += '</tbody></table>';

            $('#namaz-times').html(html);
        }).fail(function() {
            $('#namaz-times').html('<div class="alert alert-danger">Namaz getirle bilinmei tekrar cehd edin</div>');
        });
    });
});