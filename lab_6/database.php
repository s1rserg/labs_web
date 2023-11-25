<?php

include("config.php");
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function insert($data) {
    global $conn;
    $deleteSql = "DELETE FROM lab6";
    $conn->query($deleteSql);
    $inputObject = json_decode($data, true);
    $sql = "INSERT INTO lab6 (text, textSize, textWeight, textColor, shadowColor1, shadowColor2, shadowColor3, animationTime1, animationTime2, animationTime3, offsetX1, offsetY1, offsetX2, offsetY2) VALUES (
        '{$inputObject['text']}', 
        '{$inputObject['textSize']}', 
        '{$inputObject['textWeight']}', 
        '{$inputObject['textColor']}', 
        '{$inputObject['shadowColor1']}', 
        '{$inputObject['shadowColor2']}', 
        '{$inputObject['shadowColor3']}', 
        '{$inputObject['animationTime1']}', 
        '{$inputObject['animationTime2']}', 
        '{$inputObject['animationTime3']}', 
        '{$inputObject['offsetX1']}', 
        '{$inputObject['offsetY1']}', 
        '{$inputObject['offsetX2']}', 
        '{$inputObject['offsetY2']}'
    )";
    $conn->query($sql);
}

function retrieve() {
    global $conn;
    $sql = "SELECT * FROM lab6";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $data = array();
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return json_encode($data);
    }
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'insert':
            $data = $_GET['data'];
            insert($data);
            break;
        case 'retrieve':
            echo retrieve();
            break;
    }
}
?>
