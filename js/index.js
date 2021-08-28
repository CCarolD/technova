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
    let fac = document.getElementById("faculty-input");
    let getVisa = document.getElementById("visa-input");
    let doseCount = document.getElementById("dose-num-input");
    let dose = doseCount.options[doseCount.selectedIndex].text;
    let _firstDoseManufacturer = "";
    let _firstDoseDate = "";
    let _secondDoseManufacturer = "";
    let _secondDoseDate = "";
    if (Number(dose) >= 1) {
        manufacturer1 = document.getElementsByClassName('form-control')[7];
        _firstDoseManufacturer = manufacturer1.options[manufacturer1.selectedIndex].text;
        _firstDoseDate = document.getElementsByClassName('form-control')[6];
    }
    if (dose === '2') {
        manufacturer2 = document.getElementsByClassName('form-control')[9];
        _secondDoseManufacturer = manufacturer2.options[manufacturer2.selectedIndex].text;
        _secondDoseDate = document.getElementsByClassName('form-control')[8];
    }
    const info = {
        studentId: document.querySelector('#student-id-input').value,
        faculty: fac.options[fac.selectedIndex].text,
        visa: getVisa.options[getVisa.selectedIndex].text,
        lastName: document.querySelector('#last-name-input').value,
        firstName: document.querySelector('#first-name-input').value,
        doseNum: dose,
        firstDoseManufacturer: _firstDoseManufacturer,
        firstDoseDate: _firstDoseDate,
        secondDoseManufacturer: _secondDoseManufacturer,
        secondDoseDate: _secondDoseDate
    }
    return info;
}

function checkValidity() {
    const inputArr = document.getElementById('add-form').getElementsByTagName('input');
    const numOfDose = $("#dose-num-input option:selected").text();
    let isValid = true;
    let counter = 0;
    $.each(inputArr, (key, inputObj) => {
        if (inputObj.type !== 'date' || counter >= numOfDose) return;
        counter++;
        console.log(key, numOfDose);
        if (inputObj.style.display !== 'none' && inputObj.value == "") {
            inputObj.className += ' btn-outline-danger';
            if (inputObj.nextElementSibling) {
                inputObj.nextElementSibling.style.display = 'block';
            }

            isValid = false;
        }
    });

    $.each(inputArr, (key, inputObj) => {
        if (inputObj.type !== 'text') return;
        if (inputObj.style.display !== 'none' && inputObj.value == "") {
            inputObj.className += ' btn-outline-danger';
            if (inputObj.nextElementSibling) {
                inputObj.nextElementSibling.style.display = 'block';
            }

            isValid = false;
        }

    });

    return isValid;

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
    const inputArr = document.getElementById('add-form').getElementsByTagName('input');
    $.each(inputArr, (key, inputObj) => {
        if (inputObj.type !== 'text' && inputObj.type !== 'date') {
            return;
        }
        inputObj.onchange = () => {
            inputObj.className = 'form-control';
            if (inputObj.nextElementSibling) {
                inputObj.nextElementSibling.style.display = 'none';
            }
        }
    });
    /*window.addEventListener('load', function() {

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                console.log('submit!');
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);*/
});

$(".next").click(function() {
    if ($(this).hasClass("submit-btn")) {
        if (!checkValidity()) {
            alert("Some required fields are not filled!");
            return false;
        } else {
            var newRecord = bindFormData();
            console.log(newRecord);
            addRecord(newRecord);
        }
    }
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
