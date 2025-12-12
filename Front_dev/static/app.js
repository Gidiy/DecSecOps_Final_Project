console.log("app.js loaded correctly ✔");

// החלפת סקשן
function showSection(id) {
    document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    if (id === "players") {
        loadPlayers();
    }
}

// טעינת players מהבקאנד
async function loadPlayers() {
    try {
        const res = await fetch("/api/players_grouped");  // חייב לעבוד אצלך (בדקת בתוך docker exec)
        const data = await res.json();

        const tbody = document.getElementById("players-tbody");
        tbody.innerHTML = "";

        data.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td class="border px-3 py-1">${row.username}</td>
                <td class="border px-3 py-1">${row.total_points}</td>
            `;
            tbody.appendChild(tr);
        });

        console.log("Players loaded ✔");

    } catch (err) {
        console.error("Error loading players:", err);
    }
}
