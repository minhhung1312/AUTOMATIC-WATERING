<?php 
    header('Access-Control-Allow-Origin: *');
    include '../../db/conn.php';
    $sql = "SELECT * FROM `history`";
    $result = mysqli_query($conn, $sql);
    $history = [];
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $history[] = [
                'day' => $row['Date'],
                'time' => $row['Time'],
                'activity' => $row['Activity'],
            ];
        }
    }
    echo json_encode($history);
?>