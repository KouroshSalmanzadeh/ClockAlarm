const selectOptions = document.querySelectorAll('select');
const clockBox = document.querySelector('.clock');
const alarmButton = document.querySelector('button');
const alertBox = document.querySelector('.alert-box');
let date = new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();
let alarmTime, isAlarmSet = false;
const ringtone = new Audio('assets/audio/ringtone.mp3');

for (let i = 0; i <= 23; i++) {

    const option = document.createElement('option');
    if (i < 10) {
        option.value = '0' + i;
        option.innerText = '0' + i;
    } else {
        option.value = i;
        option.innerText = i;
    }

    selectOptions[0].appendChild(option);
}

for (let i = 0; i <= 59; i++) {

    const option = document.createElement('option');
    if (i < 10) {
        option.value = '0' + i;
        option.innerText = '0' + i;
    } else {
        option.value = i;
        option.innerText = i;
    }

    selectOptions[1].appendChild(option);
}



setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    clockBox.innerText = h + ':' + m + ':' + s;
    if (alarmTime == h + ':' + m) {
        checkAlarm();
    }
}, 1000);

alarmButton.addEventListener('click', () => {
    if (isAlarmSet == false) {
        alarmTime = selectOptions[0].value + ':' + selectOptions[1].value;
        if (alarmTime.includes('hour') || alarmTime.includes('minute')) {

            function wrongSelectTime() {
                alertBox.style.backgroundColor = "#ff0e006b";
                alertBox.innerText = 'Enter current time for timer!';
                alertBox.classList.add('active');
                let timeOut = setTimeout(() => {
                    alertBox.classList.remove('active');
                    clearTimeout(timeOut);
                }, 5000);
            }
            if (!alertBox.classList.contains('active')) {
                wrongSelectTime();
            }
        } else {
            let closeAlarmIcon = `<lord-icon
            src="https://cdn.lordicon.com/nqtddedc.json"
            trigger="hover"
            state="hover-cross-2"
            colors="primary:#fff"
            style="margin-right:5px;">
            </lord-icon>`;
            alarmButton.classList.add('set-alarm');
            alarmButton.innerText = 'cancel alarm';
            alarmButton.insertAdjacentHTML('afterbegin', closeAlarmIcon);

            selectOptions[0].setAttribute('disabled', 'disabled');
            selectOptions[1].setAttribute('disabled', 'disabled');
            isAlarmSet = true;

            function setAlarm() {
                let setAlarmsuccess = `<lord-icon
                src="https://cdn.lordicon.com/oqdmuxru.json"
                trigger="hover"
                colors="primary:#fff"
                style="margin-right:5px;">
                </lord-icon>`;
                alertBox.style.backgroundColor = "#a5eccb";
                alertBox.innerText = 'your alarm is set!';
                alertBox.insertAdjacentHTML('afterbegin', setAlarmsuccess);

                alertBox.classList.add('active');
                let timeOut = setTimeout(() => {
                    alertBox.classList.remove('active');
                    clearTimeout(timeOut);
                }, 5000);
            }
            if (!alertBox.classList.contains('active')) {
                setAlarm();
            }
        }
    } else {
        alarmButton.classList.remove('set-alarm');
        alarmButton.innerText = 'set alarm';
        selectOptions[0].removeAttribute('disabled');
        selectOptions[1].removeAttribute('disabled');
        isAlarmSet = false;
    }
});

function checkAlarm() {
    let img = document.querySelector('img');
    let activeAlarm = `<lord-icon
    src="https://cdn.lordicon.com/gjlgchju.json"
    trigger="hover"
    colors="primary:#ffffff"
    style="margin-left:5px">
    </lord-icon>`;
    if (isAlarmSet) {
        ringtone.play();
        ringtone.loop = true;
        alertBox.innerText = 'time to wake up!';
        alertBox.insertAdjacentHTML('afterbegin', activeAlarm);
        alertBox.classList.add('active');
        alertBox.classList.add('animate');
        img.src = 'assets/img/alarm.png';
        img.classList.add('animate-img');
    } else {
        ringtone.pause();
        ringtone.currentTime = 0;
        alertBox.classList.remove('active');
        alertBox.classList.remove('animate');
        img.classList.remove('animate-img');
        img.src = 'assets/img/clock.png';
    }
}