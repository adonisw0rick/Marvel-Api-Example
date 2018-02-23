$(document).ready(function () {

    $("#tarta").click(function () {
        $('#chart_div').css('display', 'block');
        $('#chart_div2').css('display', 'none');
    });
    $("#barras").click(function () {
        $('#chart_div2').css('display', 'flex');
        $('#chart_div2 *').css('width', '100%');
        $('#chart_div').css('display', 'none');
    });
    // Load the Visualization API and the corechart package.

    var valor = localStorage['votos'];

    //Gráficos de tartas

    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        var tabladatos = JSON.parse(localStorage.votos)
        var tabladatossinrepetir = tabladatos.unique();
        var comicyvoto = { comics: [], votos: [] }

        for (let i = 0; i < (tabladatossinrepetir.length); i++) {
            comicyvoto.comics[i] = tabladatossinrepetir[i]
        }
        for (let i = 0; i < (tabladatossinrepetir.length); i++) {
            for (let j = 0; j <= tabladatos.length - 1; j++) {
                if (comicyvoto.comics[i] == tabladatos[j]) {
                    if ((comicyvoto.votos[i] != 0) && (comicyvoto.votos[i] == null)) {
                        comicyvoto.votos[i] = 0;
                    }
                    comicyvoto.votos[i] = comicyvoto.votos[i] + 1;
                }

            }
        }
        for (let i = 0; i <= comicyvoto.comics.length - 1; i++) {
            data.addRow([comicyvoto.comics[i], comicyvoto.votos[i]]);

        }
        // Set chart options
        var options = {
            'title': 'Ranking Comics',
            'width': 1024,
            'height': 800
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
})

google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawColColors);
Array.prototype.unique = function (a) {
    return function () { return this.filter(a) }
}(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0
});
function drawColColors() {
    var data2 = new google.visualization.DataTable();
    data2.addColumn('string', 'Topping');
    data2.addColumn('number', 'Slices');
    var tabladatos = JSON.parse(localStorage.votospers)
    var tabladatossinrepetir = tabladatos.unique();
    var comicyvoto = { comics: [], votos: [] }
    console.log(comicyvoto);

    for (let i = 0; i < (tabladatossinrepetir.length); i++) {
        comicyvoto.comics[i] = tabladatossinrepetir[i]
    }
    for (let i = 0; i < (tabladatossinrepetir.length); i++) {
        for (let j = 0; j <= tabladatos.length - 1; j++) {
            if (comicyvoto.comics[i] == tabladatos[j]) {
                if ((comicyvoto.votos[i] != 0) && (comicyvoto.votos[i] == null)) {
                    comicyvoto.votos[i] = 0;
                }
                comicyvoto.votos[i] = comicyvoto.votos[i] + 1;
            }

        }
    }
    for (let i = 0; i <= comicyvoto.comics.length - 1; i++) {
        data2.addRow([comicyvoto.comics[i], comicyvoto.votos[i]]);

    }
    // Set chart options
    var options2 = {
        'title': 'Ranking Personajes',
        'width': 1024,
        'height': 800
    };

    // Instantiate and draw our chart, passing in some options.
    var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart2.draw(data2, options2);
}