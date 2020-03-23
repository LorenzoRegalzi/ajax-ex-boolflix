$(document).ready(function(){



    var cardTemplateSrc = $('#card-template').html();
    var cardTemplate = Handlebars.compile(cardTemplateSrc);

    $('#invia').click(cerca);
    $('#nome').keypress(function (event) {
        if(event.key == 'Enter') {
            cerca();
        }
    });

    function cerca() {
            var nomeInput = $('#nome').val();

            if (nomeInput.lenght !== 0) {
                apiRicercaFilm(nomeInput);
                apiRicercaSerie(nomeInput);
            } else {
                alert('scrivi nella ricerca')
            }
    };

    function apiRicercaFilm(nomeInput) {
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            data: {
                api_key: 'e9f1fc47cb8a9d7f36fc65d7f9caeb9a',
                query: nomeInput,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var movies = data.results;
                stampaCard(movies);

            },
            error: function (err) {
                alert('BOOM')
            }
        });
    }

    function stampaCard(movies) {
        $('#risultato').empty();
        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];
            var infos = {
                titolo: movie.title,
                titoloOriginale: movie.original_title,
                linguaOriginale: movie.original_language,
                voto: movie.vote_average,
                stelle: stars(movie.vote_average),
                poster: movie.poster_path,
                Flag: bandiere(movie.original_language),
            };
            var movieCard = cardTemplate(infos);
            $('#risultato').append(movieCard);
        }
    }




    var cardTemplateTv = $('#serie-template').html();
    var cardSerie = Handlebars.compile(cardTemplateTv);


    function apiRicercaSerie(nomeInput) {
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/tv',
            data: {
                api_key: 'e9f1fc47cb8a9d7f36fc65d7f9caeb9a',
                query: nomeInput,
                language: 'it-IT'
            },
            method: 'GET',
            success: function (data) {
                var series = data.results;
                stampaTv(series);

            },
            error: function (err) {
                alert('BOOM')
            }
        });
    }

    function stampaTv(series) {
        $('#tvshow').empty();
        for (var i = 0; i < series.length; i++) {
            var serie = series[i];
            var info = {
                poster: serie.poster_path,
                titolo: serie.name,
                titoloOriginale: serie.original_name,
                lingua: serie.original_language,
                stelle: stars(serie.vote_average),
                voto:  serie.vote_average,
            };
            var serieCard = cardSerie(info);
            $('#tvshow').append(serieCard);
        }
    }






    function bandiere(Stato) {
         var bandiera = Stato;
         if (Stato == 'ja') {
              bandiera = 'jp';
         } else if (Stato == 'en'){
             bandiera = 'us';
         }
         return bandiera;
    };




    function stars(vote){
        vote = Math.ceil(vote/ 2);
        var stringaStelle = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= vote) {
                stringaStelle += '<i class="fas fa-star"></i>'
            } else {
                stringaStelle += '<i class="far fa-star"></i>'
            }
        }





        return stringaStelle;
    }

















    // function stars(vote) {
    //     console.log(vote);
    //     var star = '';
    //     if (vote < 2) {
    //         console.log('na stella');
    //     } else if (vote < 4) {
    //         console.log('du stelle');
    //     } else if (vote < 6) {
    //         console.log('tre stelle');
    //     } else if (vote < 8) {
    //         console.log('quattro stelle');
    //
    //         star + '<i class="fas fa-star"></i>'
    //     } else if (vote < 10) {
    //         console.log('cinque stelle');
    //     }
    //
    //
    // }
});
