// Selecting form and job list
const form = document.querySelector('form');
const jobList = document.getElementById('jobList');

// Load jobs from localStorage on page load
window.addEventListener('DOMContentLoaded', loadJobs);

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const company = form.elements['company'].value.trim();
    const role = form.elements['role'].value.trim();
    const status = form.elements['status'].value.trim();
    const link = form.elements['link'].value.trim();
    const notes = form.elements['notes'].value.trim();

    if (!company || !role) {
        alert('Please enter both Company Name and Role Title');
        return;
    }

    const job = { company, role, status, link, notes };
    addJobToUI(job);
    saveJob(job);
    form.reset();
});

// Save job to localStorage
function saveJob(job) {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.push(job);
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

// Load jobs from localStorage
function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs.forEach(job => addJobToUI(job));
}

// Add job to the UI
function addJobToUI(job) {
    const li = document.createElement('li');
    li.classList.add('job-item');

    li.innerHTML = `
        <strong>${job.company}</strong> - ${job.role} [${job.status}]<br>
        ${job.link ? `<a href="${job.link}" target="_blank">Link</a><br>` : ''}
        ${job.notes ? `<em>Notes:</em> ${job.notes}<br>` : ''}
        <button class="delete-btn">Delete</button>
    `;

    // Delete button logic
    li.querySelector('.delete-btn').addEventListener('click', function () {
        li.remove();
        deleteJob(job);
    });

    jobList.appendChild(li);
}

// Delete job from localStorage
function deleteJob(jobToDelete) {
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    jobs = jobs.filter(job =>
        !(job.company === jobToDelete.company &&
          job.role === jobToDelete.role &&
          job.status === jobToDelete.status &&
          job.link === jobToDelete.link &&
          job.notes === jobToDelete.notes)
    );
    localStorage.setItem('jobs', JSON.stringify(jobs));
}
