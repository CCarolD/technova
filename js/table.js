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
    console.log(data);
    return data;
}
