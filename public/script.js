document.getElementById('pdfForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pdfInput = document.getElementById('pdfInput');
    const outputDiv = document.getElementById('output');
    const processingMessage = document.getElementById('processingMessage');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    if (pdfInput.files.length === 0) {
        alert('Please select at least one PDF file.');
        return;
    }

    processingMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    const formData = new FormData();
    for (const file of pdfInput.files) {
        formData.append('pdfs', file);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error);
                });
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.querySelector('#resultsTable tbody');
            tableBody.innerHTML = ''; // Clear previous data

            data.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td contenteditable="false">${result.fileName}</td>
                <td contenteditable="false">${result.titre}</td>
                <td contenteditable="false">${result.auteur}</td>
                <td contenteditable="false">${result.description}</td>
                <td>
                    <button class="edit-btn btn btn-primary btn-sm">Edit</button>
                    <button class="save-btn btn btn-success btn-sm hidden">Save</button>
                </td>
                <td>
                    <button class="open-pdf-btn btn btn-info btn-sm">
                        <i class="fas fa-search"></i>
                    </button>
                </td>
            `;
                tableBody.appendChild(row);
            });

            if ($.fn.DataTable.isDataTable('#resultsTable')) {
                $('#resultsTable').DataTable().destroy();
            }
            const dataTable = $('#resultsTable').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'excelHtml5'
                ]
            });

            processingMessage.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Add event listeners for edit and save buttons using event delegation
            document.querySelector('#resultsTable').addEventListener('click', function(event) {
                const target = event.target;
                if (target.classList.contains('edit-btn')) {
                    const row = target.closest('tr');
                    row.querySelectorAll('td[contenteditable]').forEach(cell => {
                        cell.contentEditable = true;
                    });
                    row.querySelector('.edit-btn').classList.add('hidden');
                    row.querySelector('.save-btn').classList.remove('hidden');
                } else if (target.classList.contains('save-btn')) {
                    const row = target.closest('tr');
                    row.querySelectorAll('td[contenteditable]').forEach(cell => {
                        cell.contentEditable = false;
                    });
                    row.querySelector('.edit-btn').classList.remove('hidden');
                    row.querySelector('.save-btn').classList.add('hidden');

                    // Save data logic here
                    const updatedData = {
                        fileName: row.cells[0].innerText,
                        titre: row.cells[1].innerText,
                        auteur: row.cells[2].innerText,
                        description: row.cells[3].innerText
                    };
                    console.log('Updated Data:', updatedData);

                    // Optionally, send updatedData to the server if needed
                } else if (target.classList.contains('open-pdf-btn')) {
                    const row = target.closest('tr');
                    let fileName = row.cells[0].innerText;
                    if (fileName.endsWith('-1')) {
                        fileName = fileName.replace(/-1$/, '');
                    }

                    const fileUrl = `../pdfs_view/${fileName}.pdf`;
                    window.open(fileUrl, '_blank');
                }
            });

        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = error.message;
            errorMessage.classList.remove('hidden');
            processingMessage.classList.add('hidden');
        });
});



let uploadsChart;
function initializeUploadsChart() {
    const ctx = document.getElementById('uploadsChart').getContext('2d');
    uploadsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Number of Files Uploaded',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// function updateUploadsChart(filesCount) {
//     const currentTime = new Date().toLocaleTimeString();
//     uploadsChart.data.labels.push(currentTime);
//     uploadsChart.data.datasets[0].data.push(filesCount);
//     uploadsChart.update();
// }

// document.getElementById('dashboardLink').addEventListener('click', function() {
//     document.getElementById('dashboardContent').style.display = 'block';
//     document.getElementById('ipaContent').style.display = 'none';
//     document.getElementById('contactContent').style.display = 'none';
//     document.getElementById('documentationContent').style.display = 'none';
//     initializeUploadsChart();
//     // closeMenu();
// });

document.getElementById('ipaLink').addEventListener('click', function() {
 //   document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('ipaContent').style.display = 'block';
    document.getElementById('contactContent').style.display = 'none';
    document.getElementById('documentationContent').style.display = 'none';
    document.getElementById('aboutContent').style.display = 'none';
    // closeMenu();
});

document.getElementById('contact').addEventListener('click', function() {
//    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('ipaContent').style.display = 'none';
    document.getElementById('contactContent').style.display = 'block';
    document.getElementById('documentationContent').style.display = 'none';
    document.getElementById('aboutContent').style.display = 'none';
    // closeMenu();
});

document.getElementById('documentation').addEventListener('click', function() {
 //   document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('ipaContent').style.display = 'none';
    document.getElementById('contactContent').style.display = 'none';
    document.getElementById('documentationContent').style.display = 'block';
    document.getElementById('aboutContent').style.display = 'none';
    // closeMenu();
});

document.getElementById('about').addEventListener('click', function() {
    //   document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('ipaContent').style.display = 'none';
    document.getElementById('contactContent').style.display = 'none';
    document.getElementById('documentationContent').style.display = 'none';
    document.getElementById('aboutContent').style.display = 'block';
    // closeMenu();
});


document.getElementById("menu-btn").addEventListener("click", openMenu);

function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeMenu() {
    document.getElementById("side-menu").style.width = "0";
}
