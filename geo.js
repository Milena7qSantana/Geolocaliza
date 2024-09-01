var isSendingData = false;
var intervalo ;
function startSendingData() {
    
    intervalo = setInterval(function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        coordenadas(position.coords.latitude, position.coords.longitude);
    });
}, 1000);
    console.log('Dados de geolocalização estão sendo enviados.');
}

function stopSendingData() {

    clearInterval(intervalo);
    console.log('Envio de dados de geolocalização parado.');
}

function coordenadas(latitude, longitude, tempo) {
    var dataHora = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("Latitude: " + latitude);
    console.log("Longitude: " + longitude);
    console.log("Tempo: " + dataHora);

    
    axios.post('configuracao.php', JSON.stringify({
        latitude: latitude,
        longitude: longitude,
        tempo: dataHora
    }), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

document.getElementById("btnStart").addEventListener("click", startSendingData);
document.getElementById("btnStop").addEventListener("click", stopSendingData);