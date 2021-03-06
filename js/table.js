$(function() {
    $('#navBar').load('navbar.html', function() {
        $('#home-link').removeClass('active');
        $('#table-link').addClass('active');
        $('#summary-link').removeClass('active');
    });
    $('#footer').load('footer.html');
});


let data = [];


// Fetch data from db.json
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
    buildTable(filteredStudents);
});



function buildTable(data) {
    var table = document.getElementById("myTable");
    table.innerHTML = '';
    for (var i = 0; i < data.length; i++){
        var fullyVac = "Not Fully Vaccinated";
        
        if (data[i].doseNum === "2") {
            fullyVac = "Fully Vaccinated";
        }
        var row = `<tr>
                        <td>${data[i].lastName}</td>
                        <td>${data[i].firstName}</td>
                        <td>${data[i].studentId}</td>
                        <td>${data[i].faculty}</td>
                        <td>${fullyVac}</td>
                        <td>${data[i].doseNum}</td>
                        <td>${data[i].firstDoseManufacturer}</td>
                        <td>${data[i].firstDoseDate}</td>
                        <td>${data[i].secondDoseManufacturer}</td>
                        <td>${data[i].secondDoseDate}</td>
                  </tr>`;
        table.innerHTML += row;
    }
}

