var conjuntocomics;
var conjuntocomics2;
var muchoscomics = [];
$.ajax('https://gateway.marvel.com:443/v1/public/characters?apikey=824c94f997f221962f3bbc13e6dcdf0c', {
    success: function (response) { console.log('success'); },
    error: function (request, errorType, errorMessage) {
        alert(errorType + ' with ' + errorMessage);
    },
    timeout: 5000

});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        limit: 100
    }).done(function (response) {
            var results = response.data.results;
            conjuntocomics = results;
            muchoscomics[0] = results;
            var resultsLen = results.length;
            var output = '<ul>';
            $(function () {
                $('#paginator').pagination({
                    items: 1100,
                    itemsOnPage: 10,
                    cssStyle: 'light-theme',
                    prevText: 'Anterior',
                    nextText: 'Siguiente',
                    onPageClick: function numeropag() {
                        let curr = $('#paginator').pagination('getCurrentPage');
                        var numeroelementos = curr * 10;
                        $('#results').empty()
                        var output = '<ul>';
                        for (let i = (numeroelementos - 10); i < numeroelementos; i++) {
                            output += '<li><img src="' + todosloscomics[i].thumbnail.path + '/standard_xlarge.' + todosloscomics[i].thumbnail.extension + '"><br>' + todosloscomics[i].name;
                            output += '<button value="' + todosloscomics[i].name + '">Votar</button>' + '</li>';
                        }
                        output += '</ul>'
                        $('#results').append(output);
                        $("button").click(function () {
                            var description;
                            for (let i = 0; i < todosloscomics.length; i++) {
                                if(this.value == todosloscomics[i].name){
                                    description = todosloscomics[i].description
                                    console.log(description);
                                }
                                
                            }
                            if(description.length < 5){
                                description = 'No tiene descripcion';
                            }
                            var havotado = this.value;
                            var descripcion;
                            var urlimg;
                            
                            if ($(this).prev().prev().closest('img')[0] !== undefined) {
                                urlimg = $(this).prev().prev().closest('img')[0].currentSrc;
                            }
                            $('#havotado').text(havotado);
                            $('#desc').text(description);
                            $('#imagenvotada').attr('src', urlimg);
                            var dialog
                            var form
                            var name = $('#name')
                            var email = $('#email')
                            var tlfn = $('#tlfn')
                            var allFields = $([]).add(name)
                            var tips = $('.validateTips')

                            function updateTips(t) {
                                tips
                                    .text(t)
                                    .addClass('ui-state-highlight')
                                setTimeout(function () {
                                    tips.removeClass('ui-state-highlight', 1500)
                                }, 500)
                            }

                            function checkLength(o, n, min, max) {
                                if (o.val().length > max || o.val().length < min) {
                                    o.addClass('ui-state-error')
                                    updateTips('El tamaño del ' + n + ' debe estar comprendido entre ' +
                                        min + ' y ' + max + ' carácteres.')
                                    return false
                                } else {
                                    return true
                                }
                            }

                            function checkRegexp(o, regexp, n) {
                                if (!(regexp.test(o.val()))) {
                                    o.addClass('ui-state-error')
                                    updateTips(n)
                                    return false
                                } else {
                                    return true
                                }
                            }
                            function addUser() {
                                console.log('hi')
                                var valid = true
                                allFields.removeClass('ui-state-error')
                                valid = valid && checkLength(tlfn, 'Número de teléfono', 9, 15)
                                valid = valid && checkLength(name, 'nombre', 2, 100)
                                valid = valid && checkRegexp(name, /^[A-Za-z]([a-z_\s])+$/i, 'El nombre sólo puede contener letras y espacios.')
                                valid = valid && checkRegexp(tlfn, /^([0-9])*$/i, 'El número de teléfono sólo puede contener números.')
                                valid = valid && checkRegexp(email, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/i, 'El correo electrónico debe ser formato usuario@xxx.es')


                                if (valid) {
                                    $(location).attr('href', 'votaciones.html')
                                    dialog.dialog('close')
                                }
                                // console.log(name.val()) Al ver que no podemos pasar el valor, porque la ventana modal se cierra, la añadimos al texto del input
                                return valid
                                $(location).attr('href', 'votaciones.html')
                            }
                            // console.log(name.val())
                            // Ventanas modales
                            dialog = $('#dialog-form').dialog({
                                show: { effect: 'fold', duration: 700 },
                                hide: { effect: 'fold', duration: 700 },
                                autoOpen: false,
                                height: 'auto',
                                width: 'auto',
                                modal: true,
                                buttons: {
                                    'Aceptar': addUser,
                                    'Cancel': function () {
                                        dialog.dialog('close')
                                    }
                                },
                                close: function () {
                                    dialog.dialog('close')
                                }
                            })
                            $('#create-user').button().on('click', function () {
                                dialog.dialog('open')
                            })
                            if (localStorage.votospers) {
                                const estructuravotos = localStorage.votospers;
                                const nuevosvotos = JSON.parse(estructuravotos);
                                nuevosvotos.push(this.value);
                                localStorage.setItem('votospers', JSON.stringify(nuevosvotos));
                                dialog.dialog('open')
                            }
                            else {
                                const estructuravotos = [];
                                estructuravotos.push(this.value);
                                nuevaclave('votospers', JSON.stringify(estructuravotos));
                                dialog.dialog('open')
                            }
                        });
                        function nuevaclave(clave, valor) {
                            if (localStorage[clave] != null) {
                                localStorage.setItem(clave, valor);
                            }
                            else {
                                localStorage.setItem(clave, valor)
                            }
                        }
                    }
                });
            });


        });

});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 100,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[1] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 200,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[2] = results2;
        });
    });

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 300,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[3] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 400,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[4] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 500,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[5] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 600,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[6] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 600,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[7] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 600,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[8] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 600,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[9] = results2;
        });
});

$(function () {
    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters?';
    $.getJSON(marvelAPI, {
        apikey: '824c94f997f221962f3bbc13e6dcdf0c',
        offset: 600,
        limit: 100
    }).done(function (response) {
            var results2 = response.data.results;
            conjuntocomics2 = results2;
            muchoscomics[10] = results2;
        });
});
var contador = 0;
var todosloscomics;

$(document).ajaxComplete(function () {
    contador++
    if (contador == 12) {
        $('#spinner').remove();
        todosloscomics = [...muchoscomics[0], ...muchoscomics[1], ...muchoscomics[2], ...muchoscomics[3], ...muchoscomics[4], ...muchoscomics[5],
        ...muchoscomics[6], ...muchoscomics[7], ...muchoscomics[8], ...muchoscomics[9], ...muchoscomics[10]];
        $('#paginator > ul > li:nth-child(3) > a').click();
        $("#paginator > ul > li:nth-child(2) > a").click();
    }
});


//Personajes

