<?php 
    header('Access-Control-Allow-Origin: *');
    include '../../db/conn.php';
    $sql = "SELECT * FROM `library`";
    $result = mysqli_query($conn, $sql);
    $plant = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $plant[] = [
                'plant' => $row['name'],
                'tmin' => $row['temperature_Min'],
                'tmax' => $row['temperature_Max'],
                'min' => $row['humidity_Min'],
                'max' => $row['humidity_Max'],
                'soil' => $row['Soil_moisture'],
            ];
        }
    }
    echo json_encode($plant);
?>