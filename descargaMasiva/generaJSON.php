<?php
ini_set('memory_limit', '512M');
//ini_set('display_errors', true);


function indicadores($rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();

    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_id:*&rows='.$rows.'&offset='.$offset);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'SNEDH'
    ));

    // Send the request
    $response = curl_exec($ch);

    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    curl_close($ch);
    //var_dump($responseData);
    return $responseData;
}

function derechoNombre($nombre, $rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();

    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_name_short_lit:'.$nombre.'&rows='.$rows.'&offset='.$offset);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'SNEDH'
    ));

    // Send the request
    $response = curl_exec($ch);

    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    curl_close($ch);
    //var_dump($responseData);
    return $responseData;
}


function derechoId($id, $rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();

    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_id:'.$id.'&rows='.$rows.'&offset='.$offset);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'SNEDH'
    ));

    // Send the request
    $response = curl_exec($ch);

    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    curl_close($ch);
    //var_dump($responseData);
    return $responseData;
}


$bar100 = indicadores();
$bar200 = indicadores(100,100);
$bar300 = indicadores(100,200);
$bar400 = indicadores(100,300);
$bar500 = indicadores(100,400);
$bar600 = indicadores(100,500);
$bar700 = indicadores(100,600);
$bar800 = indicadores(100,700);




$recordsCount = $bar100['results']['recordsCount'];

$indicator_code = array();

    // For acumulador de claves de indicadores
    for($i=0;$i<$recordsCount;$i++){
        if($i>=0 && $i<100){
            $indicator_code[] = $bar100['results']['records'][$i]['indicator_code'];
        }else if($i>=100 && $i<200){
            $indicator_code[] = $bar200['results']['records'][$i-100]['indicator_code'];
        }else if($i>=200 && $i<300){
            $indicator_code[] = $bar300['results']['records'][$i-200]['indicator_code'];
        }else if($i>=300 && $i<400){
            $indicator_code[] = $bar400['results']['records'][$i-300]['indicator_code'];
        }else if($i>=400 && $i<500){
            $indicator_code[] = $bar500['results']['records'][$i-400]['indicator_code'];
        }else if($i>=500 && $i<600){
            $indicator_code[] = $bar600['results']['records'][$i-500]['indicator_code'];
        }else if($i>=600 && $i<700){
            $indicator_code[] = $bar700['results']['records'][$i-600]['indicator_code'];
        }else if($i>=700 && $i<800){
            $indicator_code[] = $bar800['results']['records'][$i-700]['indicator_code'];
        }
    }


var_dump($indicator_code);



function datos($indicador){
  $ch = curl_init();

    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:'.$indicador);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'SNEDH'
    ));

    // Send the request
    $response = curl_exec($ch);

    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    curl_close($ch);
    //var_dump($responseData);
    return $responseData;
}



// ----------- Crea todos los JSON por código de indicador ---------//
//
 for ($i=0; $i < count($indicator_code); $i++) {
     generaIndicador($indicator_code[$i]);
     var_dump($indicator_code[$i]);
 }
//
//for ($j=0; $j < count($indicator_code); $j++) {
//   metadatoCSV(datos($indicator_code[$j]));
// }

function generaIndicador($indicador){
    
    $arr_clientes = datos($indicador);

    $bar = json_encode($arr_clientes,JSON_UNESCAPED_UNICODE);

    $fh = fopen("../json/".$indicador.".json", 'w');
    fwrite($fh, $bar);
    fclose($fh);
}

?>
