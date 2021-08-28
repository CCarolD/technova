$(function() {
    // html.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').removeClass('active');
        $('#table-link').addClass('active');
        $('#summary-link').removeClass('active');
    });
});

// 用来从db.json中取数据的函数
const fetchRecords = async() => {
    const res = await fetch('http://localhost:5000/data');
    const data = await res.json();
    //console.log(data);
    return data;
}



let dataset = fetchRecords();

function buildTable(data){
    var table = document.getElementById("myTable");
    console.log(data.length);
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].id}</td>
                        <td>${data[i].lastName}</td>
                        <td>${data[i].firstName}</td>
                        <td>${data[i].studentId}</td>
                        <td>${data[i].faculty}</td>
                        <td>'Fully Vaccinated'</td>
                        <td>${data[i].doseNum}</td>
                        <td>${data[i].firstDoseManufacturer}</td>
                        <td>${data[i].firstDoseDate}</td>
                        <td>${data[i].secondDoseManufacturer}</td>
                        <td>${data[i].secondDoseDate}</td>
                  </tr>`;
        console.log(row);
        table.innerHTML += row;
    }
}

buildTable(dataset);

