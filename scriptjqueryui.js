$(document).ready(function () {
    
    // Dificultad

    // Datos
    var dialog
    var form
    var name = $('#name')
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
        var valid = true
        allFields.removeClass('ui-state-error')

        valid = valid && checkLength(name, 'nombre', 2, 100)
        valid = valid && checkRegexp(name, /^[A-Za-z]([a-z_\s])+$/i, 'El nombre de jugador solo puede tener letras y espacios.')
        if (dificultad === '') {
            valid = false
            updateTips('Debes seleccionar un nivel de dificultad.')
        }
        if (valid) {
            puntuacion = 0
            // console.log(name.val())
            $('#dialog-form #name').text(name.val())
            dialog.dialog('close')
        }
        // console.log(name.val()) Al ver que no podemos pasar el valor, porque la ventana modal se cierra, la añadimos al texto del input
        return valid
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
    function addUser() {
        console.log('hi')
        var valid = true
        allFields.removeClass('ui-state-error')

        valid = valid && checkLength(name, 'nombre', 2, 100)
        valid = valid && checkRegexp(name, /^[A-Za-z]([a-z_\s])+$/i, 'El nombre sólo puede contener letras y espacios.')
        

        if (valid) {
            $(location).attr('href', 'votaciones.html')
            dialog.dialog('close')
        }
        // console.log(name.val()) Al ver que no podemos pasar el valor, porque la ventana modal se cierra, la añadimos al texto del input
        return valid
        $(location).attr('href', 'votaciones.html')
    }
})
