let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const time = document.getElementById('time');
const names = document.getElementById('names');
const phone = document.getElementById('phone');
const kaparo = document.getElementById('kaparo');
const kaparoNomer = document.getElementById('kaparoNomer');
const age = document.getElementById('age');
const parti = document.getElementById('parti');
const animator = document.getElementById('animator');
const cacke = document.getElementById('cacke');
const pices = document.getElementById('pices');
const cackeCode = document.getElementById('cackeCode');
const cackeTaste = document.getElementById('cackeTaste');
const HBDName = document.getElementById('HBDName');
const cackeDescript = document.getElementById('cackeDescript');
const prise = document.getElementById('prise');
const order = document.getElementById('order');
const kidsMenu = document.getElementById('kidsMenu');
const kidsNumber = document.getElementById('kidsNumber');
const quantity = document.getElementById('quantity');

let kidsCetaring = document.getElementById('cetaring');


const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',];

function openModal(event, date) {
    clicked = date;

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
        document.getElementById('капароНомер').textContent = currentEvent.kaparoNomer;
        document.getElementById('аниматор').textContent = currentEvent.animator;
        document.getElementById('парти').textContent = currentEvent.parti;
        document.getElementById('торта').textContent = currentEvent.cacke;
        document.getElementById('парчета').textContent = currentEvent.pices;
        document.getElementById('тортаКод').textContent = currentEvent.cackeCode;
        document.getElementById('тортаПълнеж').textContent = currentEvent.cackeTaste;
        document.getElementById('ЧРДИме').textContent = currentEvent.HBDName;
        document.getElementById('тортаОписание').textContent = currentEvent.cackeDescript;
        document.getElementById('цена').textContent = currentEvent.prise;
        document.getElementById('детскоМеню').textContent = currentEvent.kidsMenu
        document.getElementById('бройДеца').textContent = currentEvent.kidsNumber;

        let kidsCetaringDiv = document.getElementById('кетарингДеца');
        currentEvent.kidsCetaring.map(element => {
            let paragraph = document.createElement('p');
            paragraph.textContent = `меню: ${element[0]} - ${element[1]} броя ; друго: ${element[2]}`
            kidsCetaringDiv.appendChild(paragraph);
        });

        document.getElementById('поръчана').textContent = currentEvent.order;

        document.getElementById('друго').textContent = currentEvent.other;
        // document.getElementById('дата').textContent = date;

        document.getElementById('deleteBtn').addEventListener('click', deleteReservation)
        document.getElementById('editBtn').addEventListener('click', () => {

            newEventModal.style.display = 'block';
            deleteEventModal.style.display = 'none';

            time.value = currentEvent.time;
            names.value = currentEvent.name;
            phone.value = currentEvent.phone;
            kaparo.value = currentEvent.kaparo
            kaparoNomer.value = currentEvent.kaparoNomer
            age.value = currentEvent.age;
            parti.value = currentEvent.parti;
            animator.value = currentEvent.animator;
            cacke.value = currentEvent.cacke;
            pices.value = currentEvent.pices;
            prise.value = currentEvent.prise;
            cackeCode.value = currentEvent.cackeCode;
            cackeTaste.value = currentEvent.cackeTaste;
            cackeDescript.value = currentEvent.cackeDescript;
            order.value = currentEvent.order;
            HBDName.value = currentEvent.HBDName;
            kidsMenu.value = currentEvent.kidsMenu;
            kidsNumber.value = currentEvent.kidsNumber;

            if (currentEvent.kidsCetaring.length > 0) {
                currentEvent.kidsCetaring.forEach((e) => {
                    let newMenu = document.createElement("kidsMenu");
                    newMenu.innerHTML = `<select class="kidsMenu">
                        <option value="${e[0]}" selected>${e[0]}</option>
                        <option value="Запечен Сандвич">Запечен Сандвич</option>
                        <option value="Тост Сандвич">Тост Сандвич</option>
                        <option value="Клуб Сандвич">Клуб Сандвич</option>
                        <option value="Пица">Пица</option>
                        <option value="Солена Палачинка">Солена Палачинка</option>
                        <option value="Бургер с франзела">Бургер с франзела</option>
                        <option value="Бургер с Питка">Бургер с Питка</option>
                        <option value="Пилешки Хапки">Пилешки Хапки</option>
                        <input type="number" id="quantity" placeholder="" value=${e[1]}> 
                        <input type="text" id="descript" placeholder="" value=${e[2]}>
                        </select>`;
                    let button = document.createElement('button');
                    button.id = 'deleteBtn';
                    button.textContent = 'Изтрий';
                    button.addEventListener('click', removeSection)
                    let table = document.querySelector('#cetaring');
                    newMenu.appendChild(button);
                    table.appendChild(newMenu);
                });
                function removeSection(e) {
                    e.target.parentElement.remove();
                };
            };

            other.value = currentEvent.other;

            document.getElementById('saveButton').style.display = 'none';
            document.getElementById('deleteButton').style.display = 'inline-block';
            document.querySelector('#newEventModal h2').textContent = 'Редакция на резервация';
            const editBtn = document.getElementById('editButton');
            editBtn.style.display = 'inline-block';
            editBtn.addEventListener('click', editReservation);
            deleteButton.addEventListener('click', deleteReservation);


            function editReservation() {
                if (!time.value || !names.value || !phone.value || !age.value) {
                    return alert('Не са попълнени всички задължителни полета!');
                };
                kidsCetaring = document.getElementById('cetaring');
                console.log(kidsCetaring.children);
                cateringToPush = [];
                Array.from(kidsCetaring.children).map(e => cateringToPush.push([e.children[0].value, e.children[1].value, e.children[2].value]));

                events.push({
                    date: clicked.trim(),
                    name: names.value.trim(),
                    kaparo: kaparo.value.trim(),
                    kaparoNomer: kaparoNomer.value.trim(),
                    phone: phone.value.trim(),
                    time: time.value.trim(),
                    age: age.value.trim(),
                    parti: parti.value.trim(),
                    animator: animator.value.trim(),
                    cacke: cacke.value.trim(),
                    cackeCode: cackeCode.value.trim(),
                    cackeDescript: cackeDescript.value.trim(),
                    cackeTaste: cackeTaste.value.trim(),
                    prise: prise.value.trim(),
                    pices: pices.value.trim(),
                    order: order.value.trim(),
                    other: other.value.trim(),
                    HBDName: HBDName.value.trim(),
                    kidsMenu: kidsMenu.value.trim(),
                    kidsNumber: kidsNumber.value.trim(),
                    kidsCetaring: cateringToPush,
                });

                localStorage.setItem('events', JSON.stringify(events));

                let editedStorage = events.filter(e => e != currentEvent);
                localStorage.clear();
                localStorage.setItem('events', JSON.stringify(editedStorage));

                phone.value = '';
                names.value = '';
                time.value = '';
                kaparo.value = '';
                age.value = '';
                other.value = '';
                parti.value = '';
                cacke.value = '';
                cackeCode.value = '';
                cackeDescript.value = '';
                cackeTaste.value = '';
                prise.value = '';
                pices.value = '';
                order.value = '';
                HBDName.value = '';
                kidsMenu.value = '';
                kidsNumber.value = '';

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
                parti.value = '';
                cacke.value = '';
                cackeCode.value = '';
                cackeDescript.value = '';
                cackeTaste.value = '';
                prise.value = '';
                pices.value = '';
                order.value = '';
                other.value = '';
                HBDName.value = '';
                kidsMenu.value = '';
                kidsNumber.value = '';

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
        `${dt.toLocaleDateString('bg-bg', { month: 'long' })} ${year}`;

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
    kaparoNomer.value = "";
    age.value = '';
    parti.value = '';
    animator.value = '';
    cacke.value = '';
    cackeCode.value = '';
    cackeDescript.value = '';
    cackeTaste.value = '';
    prise.value = '';
    pices.value = '';
    order.value = '';
    other.value = '';
    HBDName.value = '';
    kidsMenu.value = '';
    kidsNumber.value = '';

    clicked = null;

    location.reload();
}

function saveEvent() {
    if (names.value && time.value && age.value && phone.value) {
        names.classList.remove('error');
        time.classList.remove('error');
        age.classList.remove('error');
        phone.classList.remove('error');

        // console.log(Array.from(kidsCetaring.children));
        kidsCetaring = document.getElementById('cetaring');

        cateringToPush = [];
        Array.from(kidsCetaring.children).map(e => cateringToPush.push([e.children[0].value, e.children[1].value, e.children[2].value]))
        console.log(Array.from(cateringToPush));

        events.push({
            date: clicked.trim(),
            name: names.value.trim(),
            kaparo: kaparo.value.trim(),
            kaparoNomer: kaparoNomer.value.trim(),
            phone: phone.value.trim(),
            time: time.value.trim(),
            age: age.value.trim(),
            parti: parti.value.trim(),
            animator: animator.value.trim(),
            cacke: cacke.value.trim(),
            cackeCode: cackeCode.value.trim(),
            cackeDescript: cackeDescript.value.trim(),
            cackeTaste: cackeTaste.value.trim(),
            prise: prise.value.trim(),
            pices: pices.value.trim(),
            order: order.value.trim(),
            other: other.value.trim(),
            HBDName: HBDName.value.trim(),
            kidsMenu: kidsMenu.value.trim(),
            kidsNumber: kidsNumber.value.trim(),
            kidsCetaring: cateringToPush,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        names.classList.add('error');
        age.classList.add('error');
        time.classList.add('error');
        phone.classList.add('error');

        return alert('Не са попълнени всички задължителни полета!');
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
    document.getElementById('closeButton').addEventListener('click', closeModal);
}
initButtons();
load();