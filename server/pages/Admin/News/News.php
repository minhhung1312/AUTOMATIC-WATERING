<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$array = $_POST;
$ID = $array['ID'];
$title = $array['title'];
$description = $array['description'];
$date = date("Y-m-d");
$thumbnail = $array['thumbnail'];


$sql = "
INSERT INTO news
VALUES ('$ID', '$title', '$description',  '$date', '$thumbnail');
";
$result = mysqli_query($conn, $sql);

$response = "Thêm tin tức thành công !!";

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>