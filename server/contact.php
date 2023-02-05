<?php
	//indica que vamos a responder con un json
	header("Content-Type: application/json");

	//decodifica json a un array/objeto
	$json_data = file_get_contents('php://input');
	$data = json_decode($json_data, true);
	$res = array("response","");

	//recibe los datos del cliente
	$name = $data['name'];
	$lastname = $data['lastname'];
	$message = $data['message'];

	//Valida que el cliente envie todos los campos llenos
	if($name === "" || $lastname === ""|| $message=== ""){
		$res[1] = "Lo sentimos. Todos los campos son obligatorios";
		echo json_encode($res);
		return;
	}

	//variables para establecer una conexión con la base de datos
	$host = "localhost";
	$user = "root";
	$password = "12345";
	$dbname = "compusoft";
	//recibe la respuesta de la conexión a la base de datos
	$conn = mysqli_connect($host, $user, $password, $dbname);
	if(!$conn){
		$res[1] = "Lo sentimos. No se ha podido conectar a la base de datos".mysqli_error($conn);
		echo json_encode($res);
		return;
	}
	$sql = "INSERT INTO contact_list (name, lastname, message) values('$name', '$lastname', '$message');"; 

	if(mysqli_query($conn, $sql)){
		echo json_encode(array("response"=>true));
	}else{
		echo json_encode(array("message"=>"[Query error]: ".mysqli_error($conn)));
	}
	//cierra la conexión
	mysqli_close($conn);
?>