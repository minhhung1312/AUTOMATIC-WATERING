<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$id = $_GET['id'];


$sql = "
INSERT INTO book_has_cart
VALUES ('$id', 'danglequocbao', 1);
;
";

$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
echo json_encode($response);
exit;
?>