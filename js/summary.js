google.charts.load("current", {
    packages: ["corechart"]
});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {

    var mydata = await setDistrib([], (vacDistribution) => {
        console.log(vacDistribution);
        var data = google.visualization.arrayToDataTable([
            ["Name of Manufacturer", "Sum"],
            ["Pfizer BioNTech Manufacturing GmbH", vacDistribution[0]],
            ["AstraZeneca, AB", vacDistribution[1]],
            ["Moderna Biotech", vacDistribution[2]],
            ["Janssen–Cilag International NV", vacDistribution[3]],
            ["Sinovac", vacDistribution[4]],
            ["Sinoharm/BIBP", vacDistribution[5]],
            ["Other", vacDistribution[6]],
        ]);

        var options = {
            title: 'Total Number of Vaccines Students Taken'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

        chart.draw(data, options);
    });
}

const vacTypeArr = [
    "Pfizer BioNTech Manufacturing GmbH",
    "AstraZeneca, AB",
    "Moderna Biotech",
    "Janssen–Cilag International NV",
    "Sinovac",
    "Sinoharm/BIBP",
    "Other",
];

const getTypeSize = async(vacType) => {
    const first = await fetchFirstVacType(vacType);
    const second = await fetchSecondVacType(vacType);
    return first + second + 0;
}



$(function() {
    // html.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').removeClass('active');
        $('#table-link').removeClass('active');
        $('#summary-link').addClass('active');
    });
    /*let vacDistribution = [{}, {}, {}, {}, {}, {}, {}];
    vacTypeArr.forEach(async function(type, i) {
        let len = await getTypeSize(type);
        const obj = {
            value: len,
            name: type
        };
        vacDistribution[i] = obj;
    });
    renderVacType(vacDistribution);*/
});

const renderVacType = (data) => {
    console.log(data);
}

const fetchFirstVacType = async(vacType) => {
    let data;
    const res = await fetch(`http://localhost:5000/data?firstDoseManufacturer=${vacType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(temp => {
            data = temp;
        });
    return data.length;
}

const fetchSecondVacType = async(vacType) => {
    let data;
    await fetch(`http://localhost:5000/data?secondDoseManufacturer=${vacType}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(temp => {
            data = temp;
        });
    return data.length;
}

async function setDistrib(vacDistribution, func) {
    await new Promise((resolve) => {
        vacTypeArr.forEach(async function(type, i) {
            let len = await getTypeSize(type);
            vacDistribution.push(len);
            console.log(i, vacDistribution)
            if (vacDistribution.length === 7) {
                resolve();
            }
        });
    });

    console.log(vacDistribution);
    func(vacDistribution);
    return vacDistribution;

}
