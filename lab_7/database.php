<?php

include("config.php");
$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function insert($data) {
    global $conn;
    $inputArray = json_decode($data, true);

    foreach ($inputArray as $inputObject) {
        $number = $conn->real_escape_string($inputObject['number']);
        $text = $conn->real_escape_string($inputObject['text']);
        $time = $conn->real_escape_string($inputObject['timestamp']);

        $sql = "INSERT INTO lab7 (number, message, time) VALUES ('$number', '$text', '$time')";

        if ($conn->query($sql) === TRUE) {
            echo "Record inserted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();
}

function insert_2($data) {
    global $conn;
    $inputObject = json_decode($data, true);
    $number = $conn->real_escape_string($inputObject['number']);
    $text = $conn->real_escape_string($inputObject['text']);
    $time = $conn->real_escape_string($inputObject['timestamp']);
    $sql = "INSERT INTO lab7_2 (number, message, time) VALUES ('$number', '$text', '$time')";
    if ($conn->query($sql) === TRUE) {
        echo "Record inserted successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}


function delete(){
    global $conn;
    $deleteSql = "DELETE FROM lab7";
    $conn->query($deleteSql);
    $deleteSql = "DELETE FROM lab7_2";
    $conn->query($deleteSql);
}

function retrieve($db) {
    global $conn;
    if (intval($db) == 1) {
        $sql = "SELECT * FROM lab7";
    } else {
        $sql = "SELECT * FROM lab7_2";
    }
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
        case 'insert2':
            $data = $_GET['data'];
            insert_2($data);
            break;
        case 'retrieve':
            echo retrieve($_GET['db']);
            break;
        case 'delete':
            echo delete();
            break;
    }
}
?>
