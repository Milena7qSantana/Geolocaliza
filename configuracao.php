<?php

$payload = file_get_contents('php://input');
$data = json_decode($payload, true);

if (isset($data['latitude']) && isset($data['longitude']) && isset($data['tempo'])) {
    $latitude = $data['latitude'];
    $longitude = $data['longitude'];
    $tempo = $data['tempo'];

    $host = 'localhost';
    $usuario = 'root';
    $senha = '';
    $banco = 'geolocall';

    $conn = new mysqli($host, $usuario, $senha, $banco);

    if ($conn->connect_error) {
        die("Falha na conexão: " . $conn->connect_error);
    }

    $sql = "INSERT INTO geo_table (latitude, longitude, tempo) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("dds", $latitude, $longitude, $tempo);
    $stmt->execute();

    $stmt->close();
    $conn->close();

} else {
    echo "Dados de geolocalização não foram recebidos corretamente.";
}

?>