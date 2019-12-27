import './css/main.css';
import img from './images/logo.png';

const form = document.querySelector('.form');
const customBalloon = document.querySelector('#balloon');
const addressText = document.querySelector('.header__text');
const close = document.querySelector('.header__close');
const fb = document.querySelector('.feedbacks')
var coords;
var address;

ymaps.ready(init);

// Запуск карты
function init () {
    //Карта
    var myMap = new ymaps.Map('map', {
        center: [55.76, 37.64], // Москва
        zoom: 10,
        controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });

    //Кластеризатор
    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterBalloonContentLayout: "cluster#balloonCarousel"
    });

    myMap.geoObjects.add(clusterer);

    // Определение адреса по координатам (обратное геокодирование).
    function getAddress(coords) {
        addressText.textContent = '';
        ymaps.geocode(coords).then(function(res) {
            var firstGeoObject = res.geoObjects.get(0);
            // Обработка координат
            address = firstGeoObject.getAddressLine();
            console.log(address + ' в getAddress');
            addressText.textContent = address;
            searchFeedback(address)
        }
    )};

    // Показать балун
    function showBalloon(e, addr = ''){
        clusterer.balloon.close();
        var pos;
        // Если балун открыт закрываем
        if(customBalloon.style.display == "block") {
            customBalloon.style.display = "none"
        }
        //Определяем был ли клик по карте, метке или адресу в кластере
        //По адресу
        if (addr !== '') {
            addressText.textContent = address;
            pos = [e.clientX, e.clientY];
            let tempPm = clusterer.getGeoObjects().find(item => item.properties.get('address') == address)
            coords = tempPm.geometry.getCoordinates();
            searchFeedback(address);
        } 
        //По метке
        else if (e.get('target').geometry !== undefined) {
            console.log('метка');
            coords = e.get('target').geometry.getCoordinates();
            address = e.get('target').properties.get('address');
            addressText.textContent = address;
            searchFeedback(address)
            pos = e.get('pagePixels');
        }
        //По карте
        else {
            console.log('карта');
            fb.innerHTML = '';
            coords = e.get('coords');
            getAddress(coords)
            pos = e.get('pagePixels');
        }

        // Позиционируем балун
        if(document.documentElement.clientHeight - pos[1] - 500 < 0) {
            console.log(document.documentElement.clientHeight - pos[1] - 500);
            customBalloon.style.top = (document.documentElement.clientHeight - 500) + 'px';
        } else {
            customBalloon.style.top = pos[1] + 'px';
        }

        if(document.documentElement.clientWidth - pos[0] - 330 < 0) {
            customBalloon.style.left = (document.documentElement.clientWidth - 330) + 'px';
        } else {
            customBalloon.style.left = pos[0] + 'px';
        }

        customBalloon.style.display = "block";
        form.elements.name.focus();
    };
    
    // Добавить отзыв
    function addFeedback() {
        event.preventDefault();
        let name = form.elements.name.value;
        let location = form.elements.location.value;
        let comment = form.elements.comment.value;
        let time = new Date(Date.now()).toLocaleString();

        var balloonBody = `<p class="cluster-address">${address}</p>
        <p class="cluster-comment">${comment}</p>
        <p class="cluster-time">${time}</p>`;

        form.elements.name.value = '';
        form.elements.location.value = '';
        form.elements.comment.value = '';
        console.log(address + 'в addFeedback')
        var myPlacemark = new ymaps.Placemark( 
            coords,
            {
                clusterCaption: location,
                balloonContentBody: balloonBody,
                name: name,
                location: location,
                comment: comment,
                address: address,
                time: time
            },
            {
                openBalloonOnClick: false
            });
        myPlacemark.events.add('click', function (e) { showBalloon(e) });
        clusterer.add(myPlacemark);
        searchFeedback(address);
    };

    //Ищем отзывы по адресу в массиве геообъектов
    function searchFeedback (adr) {
        fb.innerHTML = '';
        clusterer.getGeoObjects().forEach(element => {
            if (element.properties.get('address') == adr) {
                var li = `<li class="feedback">
                <string class="feedback__name">${element.properties.get('name')}</string>
                <string class="feedback__info">${element.properties.get('location')} ${element.properties.get('time')}</string>
                <p class="feedback__text">${element.properties.get('comment')}</p>
                </li>`
                fb.innerHTML += li
            }
        });
    };

    // Вешаем обработчик кликов по карте
    myMap.events.add('click', function (e) {
        showBalloon(e);
    });

    // Закрываем балун при открытии балуна кластера
    clusterer.events.add('balloonopen', function () {
        customBalloon.style.display = "none"
    })

    // Закрываем балун при клике на крестик
    close.addEventListener('click', () => {
        customBalloon.style.display = "none"
    });

    // Обработчик отправки формы
    form.addEventListener('submit', addFeedback);

    // Обработчик клика по адресу в балуне кластера
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cluster-address')) {
            address = e.target.textContent;
            showBalloon(e, address)
        }
    });
}