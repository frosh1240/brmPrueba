<?php
class Resultado
{
}
class Producto
{
    public function getProducto($connection)
    {
        $sql = "SELECT * FROM productos";
        $sqlConsulta = mysqli_query($connection, $sql);

        if ($sqlConsulta) {
            while ($sqlSearch = mysqli_fetch_array($sqlConsulta, MYSQLI_ASSOC)) {
                $dataSearch[] = $sqlSearch;
            }

            echo json_encode($dataSearch);
            exit();
        } else {
            $response = new Resultado();
            $response->msg = 'Error';

            $response->data = $dataSearch;
            header('Content-type: application/json');
            echo json_encode($response);
            exit();
        }
       
        /* Fin consulta mysql */
    }

    public function postProducto($data, $connection)
    {
        $sqlSearchPost = "SELECT * from productos where productos.nombre = '$data->nombre'";
        $sqlSearchConsult = mysqli_query($connection, $sqlSearchPost);

        if (mysqli_num_rows($sqlSearchConsult) == 0) {
            $sqlPost = "INSERT INTO productos(nombre) values('$data->nombre')";
            $sqlConsultPost = mysqli_query($connection, $sqlPost);
        
            if ($sqlConsultPost) {
                $response = new Resultado();
                $response->msg = 'Guardado';

                header('Content-type: application/json');
                echo json_encode($response);
                exit();
            }
        } else {
            $response = new Resultado();
            $response->msg = 'Error';

            header('Content-type: application/json');
            echo json_encode($response);
            exit();
        }
    }
}
