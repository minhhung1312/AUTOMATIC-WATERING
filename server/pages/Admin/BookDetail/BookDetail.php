<?php
header('Access-Control-Allow-Origin: *');
include '../../../db/conn.php';

$array = $_POST;
$ID = $array['ID'];
$publisher = $array['publisher'];
$namebook = $array['namebook'];
$book_cover = $array['book_cover'];
$author = $array['author'];
$price = $array['price'];
$discount = $array['discount'];
$pic = $array['pic'];
$publish_year = $array['publish_year'];
$language = $array['language'];
$description = $array['description'];


$sql = "
INSERT INTO book
VALUES ('$ID', '$publisher', '$namebook',  '$book_cover', '$author',
        '$price', '$discount', '$pic', '$publish_year', '$language', '$description'
)
";
$result = mysqli_query($conn, $sql);

header('Content-Type: application/json');
echo json_encode($array);
exit;
?>