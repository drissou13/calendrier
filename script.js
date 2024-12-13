// Liste des événements avec des détails d'établissements à Marseille
const events = [
    { day: "Lundi", title: "Concert Jazz", time: "18h", location: "Théâtre National, Marseille", link: "https://example.com/concert-jazz" },
    { day: "Mardi", title: "Pièce de Théâtre", time: "20h", location: "Salle des Arts, Marseille", link: "https://example.com/piece-theatre" },
    { day: "Mercredi", title: "Concert Rock", time: "21h", location: "Le Dôme de Marseille", link: "https://example.com/concert-rock" },
    { day: "Jeudi", title: "Opéra", time: "19h", location: "Opéra de Marseille", link: "https://example.com/opera" },
    { day: "Vendredi", title: "Stand-up Comedy", time: "20h", location: "Le Quai du Rire, Marseille", link: "https://example.com/standup-comedy" },
    { day: "Samedi", title: "Festival Électronique", time: "22h", location: "Dock des Suds, Marseille", link: "https://example.com/festival-electronique" },
    { day: "Dimanche", title: "Marché des Créateurs", time: "10h", location: "Cours Julien, Marseille", link: "https://example.com/marche-createurs" },
];

// Liste des établissements à Marseille
const establishments = [
    { name: "Théâtre National", type: "Théâtre", address: "12 Rue des Arts, Marseille", website: "https://theatre-national-marseille.com" },
    { name: "Le Dôme de Marseille", type: "Concerts", address: "3 Boulevard de la Libération, Marseille", website: "https://ledome-marseille.com" },
    { name: "Opéra de Marseille", type: "Opéra", address: "2 Rue Molière, Marseille", website: "https://opera-marseille.com" },
    { name: "Dock des Suds", type: "Festival", address: "12 Rue Urbain V, Marseille", website: "https://dockdesuds.com" },
    { name: "Salle des Arts", type: "Théâtre", address: "8 Rue de la République, Marseille", website: "https://salledesarts.com" },
    { name: "Le Quai du Rire", type: "Comedy", address: "18 Rue du Théâtre, Marseille", website: "https://quaidurire.com" },
    { name: "Cours Julien", type: "Marché", address: "Place Cours Julien, Marseille", website: "https://coursjulien-marseille.com" },
];

// Fonction pour générer les dates de la semaine actuelle (semaine commençant le lundi)
function getWeekDates() {
    const currentDate = new Date();
    const weekDates = [];
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    // Trouver le premier jour de la semaine (Lundi)
    const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); // Lundi = currentDay - currentDay.getDay() + 1

    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        weekDates.push({ day: daysOfWeek[day.getDay()], date: day.toLocaleDateString("fr-FR") });
    }
    return weekDates;
}

// Génération dynamique du planning
function generateCalendar() {
    const weekDates = getWeekDates();
    const calendar = document.getElementById("calendar");
    
    // Nettoyer le calendrier actuel avant de le remplir
    calendar.innerHTML = "";

    weekDates.forEach(({ day, date }) => {
        const dayEvents = events.filter(event => event.day === day);
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";

        dayDiv.innerHTML = `<h3>${day} - ${date}</h3>`;
        const ul = document.createElement("ul");

        dayEvents.forEach(event => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#" onclick="showDetails('${event.title}', '${date}', '${event.time}', '${event.location}', '${event.link}')">${event.title}</a>`;
            ul.appendChild(li);
        });

        dayDiv.appendChild(ul);
        calendar.appendChild(dayDiv);
    });
}

// Afficher les détails d'un événement dans une modale
function showDetails(title, date, time, location, link) {
    document.getElementById("event-title").textContent = title;
    document.getElementById("event-date").textContent = "Date : " + date;
    document.getElementById("event-time").textContent = "Horaire : " + time;
    document.getElementById("event-location").textContent = "Lieu : " + location;
    document.getElementById("event-link").href = link;

    // Ajout des informations sur l'établissement associé à l'événement
    const establishment = establishments.find(est => location.includes(est.name));
    if (establishment) {
        document.getElementById("event-location").textContent += ` (${establishment.address})`;
        document.getElementById("event-link").href = establishment.website;
    }

    document.getElementById("event-modal").style.display = "block";
}

// Fermer la modale
function closeModal() {
    document.getElementById("event-modal").style.display = "none";
}

// Initialiser le planning
generateCalendar();
