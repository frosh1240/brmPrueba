<?php
class Resultado
{
}
class Inventario
{
    public function crearInventario($cc, $connection)
    {
        if (isset($cc)) {
            $id = (int)$cc->id;
            $consult = "SELECT * FROM inventario WHERE inventario.idProducto = $id";
            $sqlConsult = mysqli_query($connection, $consult);
            $dateDay = substr($cc->fecha, 0, -14);


            if (mysqli_num_rows($sqlConsult) > 0) {
                $consultUpdate = "UPDATE inventario SET
                idProducto = '$cc->id',
                nlote = '$cc->lote',
                cantidad = '$cc->cantidad',
                precio = '$cc->precio',
                fechaV = '$dateDay'
                ";
                $sqlConsultUpdate = mysqli_query($connection, $consultUpdate);

                $response = new Resultado();
                $response->msg = 'Actualizado';

                header('Content-type: application/json');
                echo json_encode($response);

                exit();
            } else {
                $sqlCreate = "INSERT INTO inventario(idProducto, nlote,cantidad,precio,fechaV) VALUES ('$id','$cc->lote', '$cc->cantidad', '$cc->precio' ,'$dateDay')";
                $resultCreate = mysqli_query($connection, $sqlCreate);

                if ($resultCreate) {
                    $response = new Resultado();
                    $response->msg = 'Guardado';

                    header('Content-type: application/json');
                    echo json_encode($response);
                    exit();
                } else {
                    $response = new Resultado();
                    $response->msg = 'Error al crear';

                    header('Content-type: application/json');
                    return json_encode($response);
                    exit();
                }
            }
        } else {
            $response = new Resultado();
            $response->msg = 'Error';

            header('Content-type: application/json');
            echo json_encode($response);
            exit();
        }
        
        
        /* Fin consulta mysql */
    }

    public function getInventarioP($connection)
    {
        $sql = "SELECT * FROM inventario, productos where inventario.idProducto = productos.idProducto ";
        $sqlConsulta = mysqli_query($connection, $sql);

        if ($sqlConsulta) {
            while ($sqlSearch = mysqli_fetch_array($sqlConsulta, MYSQLI_ASSOC)) {
                $dataSearch[] = $sqlSearch;
            }
            header('Content-type: application/json');

            echo json_encode($dataSearch);
            exit();
        } else {
            $response = new Resultado();
            $response->msg = 'Error';

            $response->data = $dataSearch;
            header('Content-type: application/json');
            return json_encode($response);
            exit();
        }
    }
}
