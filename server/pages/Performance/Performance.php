<?php 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type');
    include '../../db/conn.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if(isset($_POST['date']) && isset($_POST['time']) && isset($_POST['activity'])) {
            $id = rand(0, 10000);
            $date = $_POST['date'];
            $time = $_POST['time'];
            $activity = $_POST['activity'];
            $sql = "INSERT INTO `history` (ID, Date, Time, Activity) VALUE ('$id','$date', '$time', '$activity') ";
            $result = mysqli_query($conn, $sql);
        }
    }
?>