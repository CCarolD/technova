$(function() {
    // html.html navbar一栏，设置active class
    $('#navBar').load('navbar.html', function() {
        $('#home-link').removeClass('active');
        $('#table-link').addClass('active');
        $('#summary-link').removeClass('active');
    });   
});


let data = [];


// 用来从db.json中取数据的函数
const fetchRecords = async(func) => {
    const res = await fetch('http://localhost:5000/data');
    data = await res.json();
    console.log(data);
    
    func(data);
    return data;
}

let dataset = fetchRecords((data) => {
    buildTable(data);
})

const searchBar = document.getElementById("searchBar");


searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredStudents = data.filter((student) => {
        return (
            student.studentId.toLowerCase().includes(searchString) ||
            student.studentId.toLowerCase().includes(searchString)
        );
    });
    // fetchRecords((data, newData='') => {
    //     if (newData='') buildTable(data);
    //     else buildTable(newData);
    // })
    buildTable(filteredStudents);
    //buildTable(filteredStudents);
});



function buildTable(data){
    var table = document.getElementById("myTable");
    table.innerHTML = '';
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
        table.innerHTML += row;
    }
}
