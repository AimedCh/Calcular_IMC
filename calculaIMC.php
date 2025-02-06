<?php
header("Content-Type: application/json");

$nombre = $_POST['nombre'];
if (!empty($nombre)) {
    $peso = $_POST['peso'];
    $estatura = $_POST['estatura'];
    if (!empty($peso) && !empty($estatura)) {
        $estatura /= 100;
        $imc = $peso / ($estatura * $estatura);
        $imc = round($imc, 2);

        deliver_response(200, "$nombre tu IMC es de $imc", $imc, 'success');
    } else {
        deliver_response(200, "Peso o estatura no válidos", null, 'error');
    }
} else {
    deliver_response(200, "Nombre no válido", null, 'error');
}

function deliver_response($status, $status_message, $data, $type) {
    header("HTTP/1.1 $status $status_message");
    $response = [
        'status' => $status,
        'status_message' => $status_message,
        'data' => $data,
        'type' => $type 
    ];
    echo json_encode($response);
}
?>