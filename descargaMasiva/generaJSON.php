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
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2'
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
    var_dump('https://datosabiertos.unam.mx/api/alice/search?q=right_name_short_lit:'.$nombre.'&rows='.$rows.'&offset='.$offset);
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_name_short_lit:'.$nombre.'&rows='.$rows.'&offset='.$offset);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2'
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
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2'
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

function derechosStatus($nombre, $rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();
    //var_dump($nombre);
    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_name_short_lit:'.$nombre.'&rows=100&fac.json={array:{type:%22terms%22,field:%22is_cuantitative%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}},nombres: {type:%22terms%22,field:%22right_name_short_lit%22,limit:20,facet:{unique_indicators: %22unique(indicator_name_lit)%22,indicators_null: {type: %22query%22,q: %22-indicator_name:[*%20TO%20*]%22}}}}');
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2'
    ));

    // Send the request
    $response = curl_exec($ch);
    var_dump($response);
    // Check for errors
    if($response === FALSE){
        die(curl_error($ch));
    }

    // Decode the response
    $responseData = json_decode($response, TRUE);

    curl_close($ch);
    var_dump($responseData);
    return $responseData;
}


function derechos($rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();
    //var_dump($nombre);
    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=*:*&rows=0&fac.json={array:{type:%22terms%22,field:%22right_name_short_lit%22,limit:10,facet:{unique_indicators:%22unique(indicator_name_lit)%22,indicators_null:{type:%22query%22,q:%22-indicator_name:[*%20TO%20*]%22}}}}');
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.2 (KHTML, like Gecko) Chrome/5.0.342.3 Safari/533.2'
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



$derechos = array('Salud','Seguridad%20Social','Educaci%C3%B3n','Alimentaci%C3%B3n', 'Medio%20Ambiente','Culturales', 'Trabajo',  'Sindicales');

$idDerecho = array(1,2,3,4,5,6,7,8);


$derechoCont = array();

//for($r=0;$r<count($derechos);$r++){
//    $derechoCont[] = derechoNombre($derechos[$r]);
//}
//
//var_dump($derechoCont);


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


//var_dump($indicator_code);



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
// for ($i=0; $i < count($indicator_code); $i++) {
//     generaIndicador($indicator_code[$i]);
//     var_dump($indicator_code[$i]);
// }
//
 
//var_dump(derechoNombre('Alimentación'));

//Genera JSON por nombre de Derecho
for ($j=0; $j < count($derechos);$j++){
    generaDerechos($derechos[$j]);
}
//
//Genera JSON de Derechos por ID
for ($jj=0; $jj < count($idDerecho);$jj++){
    generaId($idDerecho[$jj]);
}

//Genera JSON de Status de derechos
//for ($jjj=0; $jjj < count($derechos);$jjj++){
//    generaStatusDer($derechos[$jjj]);
//}

// General JSON de Derechos disponibles
generaListaDer();



function generaStatusDer($derecho){
    $baro = json_encode(derechosStatus($derecho),JSON_UNESCAPED_UNICODE);

    $fhh = fopen("../json/status".sinEspacios($derecho).".json", 'w');
    fwrite($fhh, $baro);
    fclose($fhh);
}

function generaListaDer(){
    $baro = json_encode(derechos(),JSON_UNESCAPED_UNICODE);

    $fhh = fopen("../json/general.json", 'w');
    fwrite($fhh, $baro);
    fclose($fhh);
}

function generaDerechos($derecho){
    $baro = json_encode(derechoNombre($derecho),JSON_UNESCAPED_UNICODE);

    $fhh = fopen("../json/".sinEspacios($derecho).".json", 'w');
    fwrite($fhh, $baro);
    fclose($fhh);
}

function generaId($derecho){
    $baro = json_encode(derechoId($derecho),JSON_UNESCAPED_UNICODE);

    $fhh = fopen("../json/".$derecho.".json", 'w');
    fwrite($fhh, $baro);
    fclose($fhh);
}

function generaIndicador($indicador){
    
    $arr_clientes = datos($indicador);

    $bar = json_encode($arr_clientes,JSON_UNESCAPED_UNICODE);

    $fh = fopen("../json/".$indicador.".json", 'w');
    fwrite($fh, $bar);
    fclose($fh);
}

    function sinEspacios($dato){
        $contenido=$dato;
        $contenido=str_replace(" ","",$contenido);
        $contenido=str_replace("á","a",$contenido);
        $contenido=str_replace("é","e",$contenido);
        $contenido=str_replace("í","i",$contenido);
        $contenido=str_replace("ó","o",$contenido);
        $contenido=str_replace("ú","u",$contenido);
        $contenido=str_replace("ñ","n",$contenido);
        return $contenido;
    }


?>
