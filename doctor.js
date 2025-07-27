const allList = document.getElementById("appointments");
const acceptedList = document.getElementById("accepted");
const rejectedList = document.getElementById("rejected");
const dateFilter = document.getElementById("filter-date");
const severityFilter = document.getElementById("filter-severity");

let appointments = [];

async function fetchAppointments() {
  const res = await fetch("http://localhost:3000/api/appointments");
  appointments = await res.json();
  renderCards();
}

async function updateStatus(id, newStatus) {
  await fetch(`http://localhost:3000/api/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  });
  fetchAppointments(); // Reload updated data
}

function getStatusColor(status) {
  if (status === "Pending") return "text-yellow-600";
  if (status === "Accepted") return "text-green-600";
  if (status === "Rejected") return "text-red-600";
  return "text-gray-600";
}

function renderCards() {
  allList.innerHTML = "";
  acceptedList.innerHTML = "";
  rejectedList.innerHTML = "";

  const selectedDate = dateFilter.value;
  const selectedSeverity = severityFilter.value;

  appointments.forEach(app => {
    if ((selectedDate && app.date !== selectedDate) ||
        (selectedSeverity && app.severity !== selectedSeverity)) return;

    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow-md w-64";
    card.innerHTML = `
      <h3 class="text-lg font-bold text-indigo-700">Patient: ${app.name}</h3>
      <p><strong>Symptoms:</strong> ${app.symptoms}</p>
      <p><strong>Date:</strong> ${app.date}</p>
      <p><strong>Severity:</strong> ${app.severity}</p>
      <p><strong>Status:</strong> <span class="${getStatusColor(app.status)}">${app.status}</span></p>
      ${app.status === "Pending" ? `
        <div class="flex gap-2 mt-3">
          <button class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Accept</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
        </div>` : ""
      }
    `;

    if (app.status === "Pending") {
      const [acceptBtn, rejectBtn] = card.querySelectorAll("button");
      acceptBtn.onclick = () => updateStatus(app.id, "Accepted");
      rejectBtn.onclick = () => updateStatus(app.id, "Rejected");
      allList.appendChild(card);
    } else if (app.status === "Accepted") {
      acceptedList.appendChild(card);
    } else if (app.status === "Rejected") {
      rejectedList.appendChild(card);
    }
  });
}

// Filter listeners
dateFilter.oninput = renderCards;
severityFilter.onchange = renderCards;

// Initial load
fetchAppointments();
