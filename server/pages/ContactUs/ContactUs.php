<?php
header('Access-Control-Allow-Origin: *');
include '../../db/conn.php';

$array = $_POST;
$name = $array['name'];
$email = $array['email'];
$type = $array['type'];
$content = $array['content'];

$sql = "
INSERT INTO contact_us
VALUES ('$name', '$email', '$type', '$content');
";
$result = mysqli_query($conn, $sql);

$response = "thêm dữ liệu vào database contact us thành công !";

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>