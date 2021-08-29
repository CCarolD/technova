google.charts.load("current", {
    packages: ["corechart", "bar"]
});
google.charts.setOnLoadCallback(drawChart);

const vacTypeArr = [
    'Pfizer BioNTech Manufacturing GmbH',
    "AstraZeneca, AB",
    "Moderna Biotech",
    "Janssen–Cilag International NV",
    "Sinovac",
    "Sinoharm/BIBP",
    "Other",
];

const visaStatusArr = [
    "Canadian",
    "Canadian Permanent Resident",
    "International"
];

async function drawChart() {

    // Pie chart
    await setDistrib([], (vacDistribution, vacMap) => {
        var data = google.visualization.arrayToDataTable([
            ["Name of Manufacturer", "Sum"],
            ["Pfizer BioNTech Manufacturing GmbH", vacDistribution[vacMap["Pfizer BioNTech Manufacturing GmbH"]]],
            ["AstraZeneca, AB", vacDistribution[vacMap["AstraZeneca, AB"]]],
            ["Moderna Biotech", vacDistribution[vacMap["Moderna Biotech"]]],
            ["Janssen–Cilag International NV", vacDistribution[vacMap["Janssen–Cilag International NV"]]],
            ["Sinovac", vacDistribution[vacMap["Sinovac"]]],
            ["Sinoharm/BIBP", vacDistribution[vacMap["Sinoharm/BIBP"]]],
            ["Other", vacDistribution[vacMap["Other"]]],
        ]);

        var options = {
            fontName: 'Oxygen',
            fontSize: 14.5,
            titleTextStyle: {fontSize: 18},
            title: 'Total Number of Vaccines Students Taken',
            position: 'left'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));

        chart.draw(data, options);

        var tableData = [];
        for (var i = 0; i < vacTypeArr.length; ++i) {
            tableData.push({
                name: vacTypeArr[i],
                value: vacDistribution[vacMap[vacTypeArr[i]]]
            });
        }
        
        console.log(tableData); //这里的数据可以用来画个表格
    });

    // Bar graph
    await setVisaDistrib({}, (dbData) => {

        function getVisaObj(type) {

            let visaObj = visaStatusArr.map((state) => {
                if (!dbData[type][state]) {
                    console.log(type, state);
                    return 0;

                }
                return dbData[type][state][0];
            });
            return visaObj;
        }
        var data = google.visualization.arrayToDataTable([
            ['Visa Status', ...visaStatusArr],
            ["Pfizer BioNTech Manufacturing GmbH", ...getVisaObj("Pfizer BioNTech Manufacturing GmbH")],
            ["AstraZeneca, AB", ...getVisaObj("AstraZeneca, AB")],
            ["Moderna Biotech", ...getVisaObj("Moderna Biotech")],
            ["Janssen–Cilag International NV", ...getVisaObj("Janssen–Cilag International NV")],
            ["Sinovac", ...getVisaObj("Sinovac")],
            ["Sinoharm/BIBP", ...getVisaObj("Sinoharm/BIBP")],
            ["Other", ...getVisaObj("Other")]
        ]);

        var options = {
            chart: {
                title: 'Types of Vaccine',
                subtitle: '@ University of Waterloo Health Centre',
                fontName: 'Oxygen',
                position: 'bottom',
                
            },
            titleTextStyle: {fontSize: 18, color: 'black', bold: true},
            bars: '', // Required for Material Bar Charts.
            fontName: 'Oxygen',
            fontSize: 13,
            titlePosition: 'none',
            legend: {position: "none"}
        };

        var chart = new google.charts.Bar(document.getElementById('barchart_div'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    });

    await setFullyVaccined((total, valid) => {
        var data = google.visualization.arrayToDataTable([
            ['Immunization State', 'Percentage'],
            ['Valid', valid],
            ['Invalid', total - valid]
        ]);

        var options = {
            title: 'Percentage of Fully Vaccined Students',
            pieHole: 0.4,
            fontName: 'Oxygen',
            fontSize: 14.5,
            titleTextStyle: {fontSize: 18},
            position: 'right'
        };

        var chart = new google.visualization.PieChart(document.getElementById('fully_vaccined_div'));
        chart.draw(data, options);
    })
}


const getTypeSize = async(vacType, visa) => {
    const first = await fetchFirstVacType(vacType, visa);
    const second = await fetchSecondVacType(vacType, visa);
    return [first + second + 0, first, second];
}

$(function() {
    // html.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').removeClass('active');
        $('#table-link').removeClass('active');
        $('#summary-link').addClass('active');
    });
    $('#footer').load('footer.html');
    setVisaDistrib();
});

const renderVacType = (data) => {
    console.log(data);
}

const fetchFirstVacType = async(vacType, visa) => {
    let data;
    if (visa) {
        await fetch(`http://localhost:5000/data?firstDoseManufacturer=${vacType}&visa=${visa}`, {
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
    await fetch(`http://localhost:5000/data?firstDoseManufacturer=${vacType}`, {
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

const fetchSecondVacType = async(vacType, visa) => {
    let data;
    if (visa) {
        await fetch(
                `http://localhost:5000/data?secondDoseManufacturer=${vacType}&visa=${visa}`, {
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

const fetchRecords = async() => {
    const res = await fetch('http://localhost:5000/data');
    data = await res.json();
    return data.length;
}

const fetchFullyVaccined = async() => {
    await fetch(
            `http://localhost:5000/data?doseNum=2`, {
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
    vacMap = {};
    await new Promise((resolve) => {
        vacTypeArr.forEach(async function(type, i) {
            let size = await getTypeSize(type);
            vacDistribution.push(size[0]);
            vacMap[type] = vacDistribution.length - 1;
            if (vacDistribution.length === 7) {
                resolve();
            }
        });
    });
    func(vacDistribution, vacMap);
    return vacDistribution;
}

async function setVisaDistrib(distrib, func) {
    vacMap = {};
    distrib = {};
    await new Promise((resolve) => {
        vacTypeArr.forEach(async function(type, i) {
            distrib[type] = {};
            for (var visaIdx = 0; visaIdx < visaStatusArr.length; ++visaIdx) {
                distrib[type][visaStatusArr[visaIdx]] = await getTypeSize(type, visaStatusArr[visaIdx]);
            }
            if (i === 6) {
                resolve();
            }
        });
    });
    //console.log(distrib);
    func(distrib);
    return distrib;
}

async function setFullyVaccined(func) {
    var total = await fetchRecords();
    var valid = await fetchFullyVaccined();
    func(total, valid);
}
