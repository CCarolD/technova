$(function() {
    // index.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').addClass('active');
        $('#table-link').removeClass('active');
        $('#summary-link').removeClass('active');
    });
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
        $("#second-dose").show();
    } else {
        $("#second-dose").hide();
    }
});
