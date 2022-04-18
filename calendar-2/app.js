window.addEventListener('DOMContentLoaded', () => {
    const yearsSection = document.getElementById('years');
    const monthsSections = document.querySelectorAll('.monthCalendar');
    const daysSections = document.querySelectorAll('.daysCalendar');
    const body = document.querySelector('body');
    const eventTable = document.getElementById('table');

    let storage = {};
    // console.log(storage);

    body.replaceChildren(yearsSection)

    yearsSection.addEventListener('click', displayMonths);

    let lastSelectedYear;
    let lastSelectedMonth;
    let lastDateDay;
    let lastEventName;
    let lastEventClassName;

    function displayMonths(e) {
        if (e.target.className == 'day') {
            const selectedYear = e.target.querySelector('div').textContent;

            const yearToDisplay = Array.from(monthsSections).find(element => element.id == `year-${selectedYear}`);

            lastSelectedYear = yearToDisplay;

            body.replaceChildren(yearToDisplay);
            yearToDisplay.addEventListener('click', displayDays);
            // console.log(yearToDisplay);
        }
    };

    function displayDays(e) {
        if (e.target.className == 'day') {
            const monthToNum = {
                Jan: 1,
                Feb: 2,
                Mar: 3,
                Apr: 4,
                May: 5,
                Jun: 6,
                Jul: 7,
                Aug: 8,
                Sept: 9,
                Oct: 10,
                Nov: 11,
                Dec: 12
            };
            const backBtn = document.createElement('button');
            backBtn.className = 'button';
            backBtn.textContent = "BACK";
            const homeBtn = document.createElement('button');
            homeBtn.className = 'button';
            homeBtn.textContent = "HOME";


            const selectedMonth = e.target.querySelector('div').textContent;
            const selectedYear = e.target.parentElement.parentElement.parentElement.children[0].textContent;

            const monthToDisplay = Array.from(daysSections).find(element => element.id == `month-${selectedYear}-${monthToNum[selectedMonth]}`);
            lastSelectedMonth = monthToDisplay;


            if (monthToDisplay.firstChild.className != 'button') {
                monthToDisplay.prepend(backBtn);
                monthToDisplay.prepend(homeBtn);
            };

            body.replaceChildren(monthToDisplay);

            monthToDisplay.addEventListener('click', displayDay);
            // console.log(monthToDisplay);
        } else if (e.target.textContent == 'BACK') {
            // console.log('button clicked');
            body.replaceChildren(yearsSection);
        };
    };
    function displayDay(e) {
        if (e.target.textContent == 'BACK') {
            eventTable.querySelector('#textarea').value = "";
            // console.log('BACK button clicked');
            body.replaceChildren(lastSelectedYear);
        } else if (e.target.textContent == 'HOME') {
            // console.log('button clicked');
            eventTable.querySelector('#textarea').value = "";
            body.replaceChildren(yearsSection);
        } else if (e.target.nodeName == 'LI') {

            const backBtn = document.createElement('button');
            backBtn.className = 'button';
            backBtn.textContent = "BACK";
            const homeBtn = document.createElement('button');
            homeBtn.className = 'button';
            homeBtn.textContent = "HOME";
            const saveBtn = document.createElement('button');
            saveBtn.className = 'button';
            saveBtn.textContent = "SAVE";

            if (eventTable.firstChild.className != 'button') {
                eventTable.prepend(saveBtn);
                eventTable.prepend(backBtn);
                eventTable.prepend(homeBtn);
            };
            const dateDay = e.target.parentElement.firstElementChild.textContent;
            lastDateDay = dateDay;

            body.replaceChildren(eventTable);
            let [x, year, month] = lastSelectedMonth.id.split('-');
            let toFind = Object.keys(storage).find(el => el == `${year}-${month}-${lastDateDay}-${lastEventClassName}`);

            if (toFind == undefined) {
                eventTable.querySelector('#textarea').value = "";
                eventTable.querySelector('th').textContent = e.target.textContent;
                lastEventName = e.target.textContent;
                lastEventClassName = e.target.className;
            } else {
                lastEventName = e.target.textContent;
                lastEventClassName = e.target.className;
                eventTable.querySelector('#textarea').value = "";
                eventTable.querySelector('#textarea').value = storage[toFind];
                // console.log(toFind);
            }

            eventTable.addEventListener('click', displayEvents);
            // window.location = '/table.html';
            // console.log(e.target.textContent);
        };
    };
    function displayEvents(e) {
        let textArea = body.querySelector('#textarea');

        if (e.target.textContent == 'BACK') {
            textArea.value = "";
            body.replaceChildren(lastSelectedMonth);
        } else if (e.target.textContent == 'HOME') {
            textArea.value = "";
            body.replaceChildren(yearsSection);
        } else if (e.target.textContent == 'SAVE') {
            let [x, year, month] = lastSelectedMonth.id.split('-');

            let text = textArea.value;

            const nameToSave = `${year}-${month}-${lastDateDay}-${lastEventClassName}`;
            storage[nameToSave] = text;

            body.querySelector('#textarea').value = "";

            body.replaceChildren(yearsSection);

            console.log(storage);
        }
    }
});

