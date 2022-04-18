let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
// const backDrop = document.getElementById('modalBackDrop');
// const eventTitleInput = document.getElementById('eventTitleInput');
// const form = document.getElementById('form');
const time = document.getElementById('time');
const names = document.getElementById('names');
const phone = document.getElementById('phone');
const kaparo = document.getElementById('kaparo');
const age = document.getElementById('age');
const other = document.getElementById('other');
// const container = document.getElementById('container');


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(event, date) {
    clicked = date;
    // container.display.style = "none";

    if (event.target.className == 'event') {
        
        newEventModal.style.display = 'none';
        deleteEventModal.style.display = 'block';

        let [name, years, reservationTime] = event.target.textContent.split(' ');
        years = years.slice(0, -2);
        reservationTime = reservationTime.slice(0, -2);

        const currentEvent = events.find(e => e.name == name && e.age == years && e.time == reservationTime);
        document.getElementById('име').textContent = currentEvent.name;
        document.getElementById('години').textContent = currentEvent.age;
        document.getElementById('час').textContent = currentEvent.time;
        document.getElementById('телефон').textContent = currentEvent.phone;
        document.getElementById('капаро').textContent = currentEvent.kaparo;
        document.getElementById('друго').textContent = currentEvent.other;
        document.getElementById('дата').textContent = date;

        document.getElementById('deleteBtn').addEventListener('click', deleteReservation)
        document.getElementById('editBtn').addEventListener('click', () => {

            newEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';

            time.value = currentEvent.time;
            names.value = currentEvent.name;
            phone.value = currentEvent.phone;
            kaparo.value = currentEvent.kaparo
            age.value = currentEvent.age;
            other.value = currentEvent.other;

            document.getElementById('saveButton').style.display = 'none';
            document.getElementById('deleteButton').style.display = 'inline-block';
            document.querySelector('#newEventModal h2').textContent = 'Редактирай Резервация';
            const editBtn = document.getElementById('editButton');
            editBtn.style.display = 'inline-block';
            editBtn.addEventListener('click', editReservation);
            deleteButton.addEventListener('click', deleteReservation);


            function editReservation() {
                if (!time.value || !names.value || !phone.value || !kaparo.value || !age.value) {
                    return;
                };
                events.push({
                    date: clicked.trim(),
                    name: names.value.trim(),
                    kaparo: kaparo.value.trim(),
                    phone: phone.value.trim(),
                    time: time.value.trim(),
                    age: age.value.trim(),
                    other: other.value.trim(),
                });

                localStorage.setItem('events', JSON.stringify(events));

                let editedStorage = events.filter(e => e != currentEvent);
                localStorage.clear();
                localStorage.setItem('events', JSON.stringify(editedStorage));
                // load();
                // closeModal();
                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                location.reload();
            };
        });

        function deleteReservation() {

            if (confirm('Сигурен ли си че искаш да изстриеш планираното събитие?')) {
                let editedStorage = events.filter(e => e != currentEvent);
                localStorage.clear();
                localStorage.setItem('events', JSON.stringify(editedStorage));
                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                location.reload();
            };
        };

    } else {
        document.querySelector('#newEventModal h2').textContent = 'Нова Резервация';
        newEventModal.style.display = 'block';
        deleteEventModal.style.display = 'none';
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('saveButton').style.display = 'inline-block';
        document.getElementById('deleteButton').style.display = 'none';
       
    };
};

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    };

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }
            if (localStorage.length > 0) {

                const eventForDay = JSON.parse(localStorage.events).filter(e => (e.date == dayString));

                if (eventForDay.length > 0) {
                    eventForDay.map(ev => {
                        const eventDiv = document.createElement('div');
                        eventDiv.classList.add('event');
                        eventDiv.innerText = ev.name + " " + ev.age + "г." + " " + ev.time + "ч.";
                        daySquare.appendChild(eventDiv);
                    });
                };
            };
            daySquare.addEventListener('click', (event) => openModal(event, dayString));
        } else {
            daySquare.classList.add('padding');
        };
        calendar.appendChild(daySquare);
    };
};

function closeModal() {
    // eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    // backDrop.style.display = 'none';
    // eventTitleInput.value = '';
    phone.value = '';
    names.value = '';
    time.value = '';
    kaparo.value = '';
    age.value = '';
    other.value = '';
    // reservationPerDay++
    clicked = null;

    load();
}

function saveEvent() {
    if (names.value && time.value && age.value && phone.value && kaparo.value) {
        names.classList.remove('error');
        time.classList.remove('error');
        age.classList.remove('error');
        phone.classList.remove('error');
        kaparo.classList.remove('error');

        events.push({
            date: clicked.trim(),
            name: names.value.trim(),
            kaparo: kaparo.value.trim(),
            phone: phone.value.trim(),
            time: time.value.trim(),
            age: age.value.trim(),
            other: other.value.trim(),
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        names.classList.add('error');
        age.classList.add('error');
        time.classList.add('error');
        phone.classList.add('error');
        kaparo.classList.add('error');
        return;
    };
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    // document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}
initButtons();
load();