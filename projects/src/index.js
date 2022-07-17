import './css/style.css';
import render from './template/modal.hbs';
import renderRevi from './template/reviews.hbs';
document.title = 'Карта отзывов'

ymaps.ready(init);

function init(){
    const create = document.querySelector('.create');
    let storage = localStorage;
    let data;
    let thisAdress;
    let thisCoords;
    let placeObject = new Array;
    
    const customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="baloon-container">' +
            '<div class="baloon-container__top">' +
                '<div class="ballon_place ballon_our"><strong>{{ properties.reviews.place|raw }}</strong></div>' +
                '<a href="#" id="links" class="ballon_adres ballon_our">{{ properties.adressReview|raw }}</a>' +
                '<div class="ballon_area ballon_our">{{ properties.reviews.area|raw }}</div>' +
            '</div>'+
        '</div>', {
            build: function () {
                customItemContentLayout.superclass.build.call(this);
                document.querySelector('#links').addEventListener('click', this.onCounterClick);
            },
            clear: function () {
                document.querySelector('#links').removeEventListener('click', this.onCounterClick);
                customItemContentLayout.superclass.clear.call(this);
            },
            onCounterClick: function (e) {
                e.preventDefault();
                let p = findName(e.target.previousElementSibling.textContent);
                reviewModal(e.target.textContent, p);
                eachLi(e.target.textContent);
                myMap.balloon.close();
            }
        }
    );
    try {
        data = JSON.parse(storage.data);
    } catch (e) {
        data = undefined;
    }
    const myMap = new ymaps.Map('maps', {
        center: [55.7482921,37.5900027],
        zoom: 11,
    })
    
    myMap.events.add('click', function (e) {
        if (create.innerHTML != '') {
            create.innerHTML = '';
            getModal (e);
        } else {
            getModal (e);
        }
    });
    function getModal (e) {
        let coords = e.get('coords'); 
            ymaps.geocode(coords)
            .then(function (res) {
                let firstGeoObject = res.geoObjects.get(0);    
                return firstGeoObject.getAddressLine();;
            })
            .then((adres)=>{
                reviewModal(adres, coords);            
            })
    }
    function findName (place) {
        let keeper = clusterer.getGeoObjects();
        let t;

        keeper.forEach(obj => {
            if (place == obj.properties._data.reviews.place) {
                t = obj.geometry._coordinates;
            }
        }) 
        return t;
    }
    
    function createPlacemark(coords, adress, arrRev) {
        let mark = new ymaps.Placemark(coords,{
            adressReview: adress,
            reviews: arrRev,
        });
        placeObject.push({
            coord: coords,
            adres: adress,
            review: arrRev,
        });
        storage.data = JSON.stringify(placeObject);
        myMap.geoObjects.add(mark);
        clusterer.add(mark);

        return mark
    }
    function reviewModal(adress, coords) {
        create.innerHTML = render({position: adress});
        thisAdress = adress;
        thisCoords = coords;
        document.title = adress;
    }
        create.addEventListener('click', (e)=>{    
            if(e.target.className == 'close-reviews') {
                create.innerHTML = '';
                document.title = 'Карта отзывов'
            } else if (e.target.className == 'i-btn') {
                    createPlacemark(thisCoords, thisAdress, {
                    name: document.querySelector('.i-name').value,
                    place: document.querySelector('.i-place').value,
                    area: document.querySelector('.i-area').value,
                });
                document.querySelector('.i-name').value = '';
                document.querySelector('.i-place').value = '';
                document.querySelector('.i-area').value = '';
                eachLi(thisAdress);
            } 
        })
    
    function eachLi (adress) {
        let keeper = clusterer.getGeoObjects();
        let arrTemp = new Array;
        keeper.forEach(obj => {
            if (adress == obj.properties._data.adressReview) {
                arrTemp.push(obj.properties._data.reviews);
            }
        })        
        document.querySelector('.reviews').innerHTML = renderRevi(arrTemp);
    }
    myMap.geoObjects.events.add('click', function (e) {
        const targ = e.get('target');
        if (targ.properties._data.geoObjects) {
        } else {
            reviewModal(targ.properties._data.adressReview, e.get('coords'));
            eachLi(targ.properties._data.adressReview);
        }
    })
    
    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });
    myMap.geoObjects.add(clusterer);
    if (data) {
        data.forEach(thismark => {
            createPlacemark (thismark.coord, thismark.adres, thismark.review);
        })
    }
}
