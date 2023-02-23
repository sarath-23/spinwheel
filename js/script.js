$(function() {
    var WItems = !!localStorage.getItem('SpinWheel') ? $.parseJSON(localStorage.getItem('SpinWheel')) : [];
    var whContainerHeight = $('#wheel-container').height();
    var Circumference = whContainerHeight * 3.14;
    var itemCount = Object.keys(WItems).length;
    var arc = Circumference / itemCount;
    var arcPerc = (arc / Circumference) * 100;
    var arcLenDed = (arcPerc * 4)
    var deg = Math.floor(360 * (arcPerc / 100));
    var takenColor = []
    for (var i = 0; i < itemCount; i++) {
        var randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);// color value random 1 to 16777215
        var item = $('<span class="item">')
        item.css('background-color', randColor);
        item.css('transform', "rotate(" + ((i * deg) + 45) + "deg)");
        item.html("<b><span>Text " + (i + 1) + "</span></b>")
        $('#wheel').append(item)
            // break;
    }
    var i = 0;
    if (Object.keys(WItems).length > 0) {
        Object.keys(WItems).map(function(k) {
            var data = WItems[k]
            var item = $('<span class="item">')
            item.css('background-color', data.color);
            item.css('transform', "rotate(" + ((i * deg) + 45) + "deg)");
            item.html("<b><span>" + (data.text) + "</span></b>")
            $('#wheel').append(item)
            i++;
        })
    }

    if (itemCount > 1) {
        var calcArc = Math.ceil(Math.ceil(arcPerc) * 4);
        console.log(calcArc)
        var poly = [];
        poly.push("50% 50%")
        poly.push("0% 0%")
        var i = 0;
        while (true) {
            i++;

            if (calcArc <= 100) {
                if (i == 2)
                    poly.push("100% " + (calcArc) + "%");
                else
                    poly.push("0% " + (calcArc) + "%");
                break;
            } else {
                if (i == 1)
                    poly.push("100% 0%");
                else
                    poly.push("0% 100%");
                calcArc -= 100
            }
        }

        $('#wheel .item').css('clip-path', "polygon(" + (poly.join(',')) + ")");
    }

    if (Object.keys(WItems).length > 0) {
        Object.keys(WItems).map(function(k) {
            var data = WItems[k]
            var item = $('#item-form .item-label').first().clone()
            item.find('input').val(data.text)
            $('#item-form .item-label').last().after(item)
            item.find('.rem-item').click(function() {
                rem_item(item)
            })
            item.find('input').focus()
        })
        $('#item-form .item-label').first().remove()
    }

    $('#new_item').click(function() {
        var item = $('#item-form .item-label').first().clone()
        item.find('input').val('')
        $('#item-form .item-label').last().after(item)
        item.find('.rem-item').click(function() {
            rem_item(item)
        })
        item.find('input').focus()
    })
    $('#item-form .item-label .rem-item').click(function() {
        rem_item($(this).closest('.item-label'))
    })
    $('#item-form').submit(function(e) {
        e.preventDefault()
        var items = [];
        $(this).find('[name="item_text"]').each(function() {
            var randColor;
            if ($(this).val().trim() != '') {
                while (true) {
                    randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    if ($.inArray(randColor, takenColor) < 0) {
                        takenColor.push(randColor)
                        break;
                    }
                }
                items.push({ 'color': randColor, text: $(this).val() })
            }
        })

        localStorage.setItem("SpinWheel", JSON.stringify(items))
        if (items.length > 0) {
            alert("Wheel Items successfully saved.")
        }
        location.reload()
    })
    $('#spin').click(function() {
        var min = 2000;
        var max = 5000;
        var degree = Math.floor(Math.random() * (max * min)) - min
        $('#wheel').css('transform', "rotate(" + degree + "deg)");//random spin
    })
})

function rem_item(_this) {
    if ($('#item-form .item-label').length == 1) {
        $('#item-form .item-label').first().find('input').val('').focus()
    } else {
        _this.remove()

    }
}

