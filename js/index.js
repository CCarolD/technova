const addRecord = async(record) => {
    record = {
        lastName: 'Mosunov',
        firstName: 'Anton'
    };
    const res = await fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(record),
    });
    const data = await res.json();
    return data;
}

function bindFormData() {
    // Carol在这边写取值的码，return一个object
}

$(function() {
    // index.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').addClass('active');
        $('#table-link').removeClass('active');
        $('#summary-link').removeClass('active');
    });
    $("#first-dose").hide();
    $("#second-dose").hide();
});

$(".next").click(function() {
    const current_fs = $(this).parent().parent().parent().parent();
    const next_fs = current_fs.next();
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({
                'opacity': opacity
            });
        },
        duration: 600
    });
});

$(".prev").click(function() {
    const current_fs = $(this).parent().parent().parent().parent();
    const next_fs = current_fs.prev();
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
        opacity: 0
    }, {
        step: function(now) {
            // for making fielset appear animation
            opacity = 1 - now;

            current_fs.css({
                'display': 'none',
                'position': 'relative'
            });
            next_fs.css({
                'opacity': opacity
            });
        },
        duration: 600
    });
});

$("#dose-num-input").on("change", function() {
    if (this.value === "2") {
        $("#first-dose").show();
        $("#second-dose").show();
    } else if (this.value === "1") {
        $("#first-dose").show();
        $("#second-dose").hide();
    } else {
        $("#first-dose").hide();
        $("#second-dose").hide();
    }
});

$("#submit-btn").on("change", function() {
    var newRecord = bindFormData();
    addRecord(newRecord);
});
