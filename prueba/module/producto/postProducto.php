<?php
header("Access-Control-Max-Age:88600");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, UPDATE");
header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../../connection/connection.php");
require_once("../../class/producto/productoC.php");

$json = file_get_contents("php://input");
$params = json_decode($json);

$cc = $params;
$c = new connect();
$connection = $c->connection();
$obj = new Producto();
echo json_encode($obj->postProducto($cc, $connection));
