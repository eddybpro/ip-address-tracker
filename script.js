const IPInput = document.querySelector('.ip'),
submitBtn = document.querySelector('.submit'),
infoBox = document.querySelector('.info-box'),
IPAddress = document.querySelector('.ip-address'),
locationVal = document.querySelector('.location'),
timeZone = document.querySelector('.time-zone'),
ISP = document.querySelector('.isp');

const APIKey = 'at_AGgmIah532NIimjCLbdT8sBtXXbRp';
const URL = 'https://geo.ipify.org/api/v2/country,city?';

const IPv4 = /(^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){1,3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)|(^$)/;

const IPv6 =  /((([0-9a-fA-F]){1,4})\:){1,7}([0-9a-fA-F]){1,4}/;


submitBtn.addEventListener('click', ()=>{
    getData();
})

async function getData(){
    const IPTarget = IPInput.value;
    if(!IPv4.test(IPTarget) && !IPv6.test(IPTarget))return;

    const data = await fetch(`${URL}apiKey=${APIKey}&ipAddress=${IPTarget}`);
    const result = await data.json();
    console.log(result);

    infoBox.classList.remove('none');
    IPAddress.textContent=`${result.ip}`;
    locationVal.textContent=`${result.location.city}`;
    timeZone.textContent=`${result.location.timezone}`;
    ISP.textContent=`${result.isp}`;

    let container = L.DomUtil.get('map');
    if(container != null){
        container._leaflet_id = null;
    }

    let map = L.map('map').setView([result.location.lat, result.location.lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let locationIcon = L.icon({
        iconUrl: './images/icon-location.svg',
    
        iconSize:     [40, 40],
        iconAnchor:   [25, 38]
    });

    L.marker([result.location.lat, result.location.lng], {icon: locationIcon})
    .addTo(map);

    IPInput.value= '';
}


































