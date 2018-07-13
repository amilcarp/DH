<?php
ini_set('memory_limit', '512M');


function indicadores($rows = 100, $offset = 0){
  // create curl resource
    $ch = curl_init();

    // Setup cURL
    //$ch = curl_init('https://datosabiertos.unam.mx/api/alice/data/PUDH:INDI:CjR01');
    $ch = curl_init('https://datosabiertos.unam.mx/api/alice/search?q=right_id:*%20AND%20is_cuantitative:false&rows='.$rows.'&offset='.$offset);
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

////ar_dump($bar200['results']['records']);

$recordsCount = $bar100['results']['recordsCount'];
//var_dump($recordsCount);
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

$sumaInd = 0;

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




//get_tabuladoCSV(164);

//var_dump(datos('AaR02'));




//get_tabulado(26);

// ----------- Crea todos los XLS de Indicador ---------//

  //for ($i=0; $i < count($indicator_code); $i++) {
   // get_tabulado($ClaveInd_arb[$i]);
    //var_dump($ClaveInd_arb[$i]);
    //echo "muestra ".$i;
  //}

// ----------- Crea todos los CSV de Indicador ---------//

  // for ($i=0; $i < count($ClaveInd_arb); $i++) {
  //   get_tabuladoCSV($ClaveInd_arb[$i]);
  // }


  // ----------- Crea todos los XLS de Indicador ---------//

    // for ($i=0; $i < count($ClaveInd_arb); $i++) {
    //   get_tabulado($ClaveInd_arb[$i]);
    // }

  // ----------- Crea todos los CSV de Indicador ---------//

    // for ($i=0; $i < count($ClaveInd_arb); $i++) {
    //   get_tabuladoCSV($ClaveInd_arb[$i]);
    // }


// ----------- Crea todos los XLS de Metadatos ---------//

 for ($i=0; $i < count($indicator_code); $i++) {
   metadato(datos($indicator_code[$i]));
 }

for ($j=0; $j < count($indicator_code); $j++) {
   metadatoCSV(datos($indicator_code[$j]));
 }


//metadato(datos('AaE01a'));

// ----------- Crea todos los CSV de Metadatos ---------//

// for ($i=0; $i < count($ClaveInd_arb); $i++) {
//   metadatoCSV(datosMetadato($ClaveInd_arb[$i]));
// }



//creaXLSCoS(datos(26));


//metadato(datosMetadato(1));


function abecedario($posicion){
  $arr = array();
  for($i=65; $i<=90; $i++) {
    $letra = chr($i);
    $arr[] = $letra;
  }
  for($j=65; $j<=90; $j++) {
    $letra2 = chr($j);
    $arr[] = 'A'.$letra2;
  }
  for ($k=65; $k <=90 ; $k++) {
    $letra3 = chr($k);
    $arr[] = 'B'.$letra3;
  }
  for ($l=65; $l <=90 ; $l++) {
    $letra4 = chr($l);
    $arr[] = 'C'.$letra4;
  }
  for ($m=65; $m <=90 ; $m++) {
    $letra5 = chr($m);
    $arr[] = 'D'.$letra5;
  }
  for ($n=65; $n <=90 ; $n++) {
    $letra6 = chr($n);
    $arr[] = 'E'.$letra6;
  }
  for ($o=65; $o <=90 ; $o++) {
    $letra7 = chr($o);
    $arr[] = 'F'.$letra7;
  }
  for ($p=65; $p <=90 ; $p++) {
    $letra8 = chr($p);
    $arr[] = 'G'.$letra8;
  }
  for ($q=65; $q <=90 ; $q++) {
    $letra9 = chr($q);
    $arr[] = 'H'.$letra9;
  }
  for ($r=65; $r <=90 ; $r++) {
    $letra10 = chr($r);
    $arr[] = 'I'.$letra10;
  }
  for ($s=65; $s <=90 ; $s++) {
    $letra11 = chr($s);
    $arr[] = 'J'.$letra11;
  }
  //var_dump($arr);
  return $arr[$posicion];
}

function metadato($data){
  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/../lib/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("SNEDH")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Indicadores de Derechos Humanos")
  							 ->setSubject($data['indicator_code'].$data['indicator_name'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Sistema Nacional de Evaluación de Derechos Humanos")
  							 ->setKeywords("SNEDH descarga masiva xls")
  							 ->setCategory("Sistema Nacional de Evaluación de Derechos Humanos");


  //$metadato = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

//  $numInd = $data['indicator_code'];
//  $nInd = explode('_',$numInd);
//  $nds = '';
//  for ($ede=0; $ede < count($nInd) - 1; $ede++) {
//    $nds .= $nInd[$ede] . '.';
//  }

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', ' '.$data['indicator_code'].' - '.$data['indicator_name']);

  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A2', 'Derecho');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A3', 'Categoría/Principio Transversal');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A4', 'Clave');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A5', 'Nombre');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A6', 'Tipo de Indicador');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A7', 'Descripción');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A8', 'Evidencias');
    
//    $eves = count($data['evidence']);
//    
//    for($e=9;$e<$eves;$e++){
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, 'Nombre de la evidencia');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//    }


  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B2', $data['right_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B3', $data['indicator_category_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B4', $data['indicator_code']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B5', $data['indicator_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B6', $data['indicator_type_short']);
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('B7', $data['indicator_definition']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B8', '');
    
    
//    for($r=0;$r<count($data['evidence']);$r++){
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $obsEv[] = $data['evidence'][$r]['observation_unit_name'];
//        $urlEv[] = $data['evidence'][$r]['evidence_url'];
//        $valEv[] = $data['evidence'][$r]['institution_name_evidencie'];
//        $vigEv[] = $data['evidence'][$r]['validity_year_start']-$data['evidence'][$r]['validity_end_start'];
//        $updateEv[] = $data['evidence'][$r]['update_date'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//    }
    
//    var_dump($nomEv);
    
    
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B9', $data['evidence']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B10', $data['Descrip_fdg']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B11', $data['CobTem_ft']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B12', $data['Oportunidad_ft']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B13', $data['Descrip_per']);

//  $fuen = '';
//  $fuente = $data['Fuente'];
//    for ($i=0; $i < count($fuente); $i++) {
//      $fuen .= $fuente[$i]['Descrip_fue'];
//    }
//  //var_dump($fuen);
//  $wizard = new PHPExcel_Helper_HTML;
//  $richText = $wizard->toRichTextObject($fuen);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B14', utf8_decode($richText));// Array
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B15', $data['FechaAct_atr']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B16', $data['FecProxAct_eic']);
//
//    $resp = '';
//    $responsable = $data['InsResp'];
//    for ($j=0; $j < count($responsable); $j++) {
//      $resp .= $responsable[$j]['Descrip_ins'] . '<br />' . $responsable[$j]['Abrevia_ins'] . '<br />' . (($responsable[$j]['URL_ins'] == '' || $responsable[$j]['URL_ins'] == null) ? '' : $responsable[$j]['URL_ins']) . '<br /><br />';
//    }
//
//    $wizard2 = new PHPExcel_Helper_HTML;
//    $richText2 = $wizard2->toRichTextObject($resp);
//
//    //var_dump($resp);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B17', utf8_decode($richText2));//Array
//
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B18', $data['Importancia_ft']);
//
//
//  $ref = '';
//  $refs = $data['RefInt'];
//  for ($k=0; $k < count($refs); $k++) {
//    $ref .= $refs[$k]['Descrip_ri'] . '<br /><br />';
//  }
//
//  $wizard3 = new PHPExcel_Helper_HTML;
//  $richText3 = $wizard3->toRichTextObject($ref);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B19', utf8_decode($richText3));//Array
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B20', $data['Observacion_ft']);
//
//  $con = '';
//  $contacto = $data['Contacto'];
//  for ($l=0; $l < count($contacto); $l++) {
//    $con .= $contacto[$l]['Nombre_con'] . '<br />' . $contacto[$l]['Puesto_con'] . '<br /> <b>Teléfono:</b> ' . $contacto[$l]['Telefono_con'] . '<br /> <b>Email:</b> ' . $contacto[$l]['Correo_con'] . '<br /> <b>Dirección:</b> ' . $contacto[$l]['Domicilio_con'].'<br /><br />';
//  }
//  $wizard4 = new PHPExcel_Helper_HTML;
//  $richText4 = $wizard4->toRichTextObject($con);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B21', utf8_decode($richText4));//Array

  $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
  $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(40);
  $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(100);
  $objPHPExcel->getActiveSheet()->getRowDimension('2')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('3')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('4')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('5')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('6')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('7')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('8')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('9')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('10')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('11')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('12')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('13')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('14')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('15')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('16')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('17')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('18')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('19')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('20')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('21')->setRowHeight(-1);

   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getFont()->setBold(true);
   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getFont()->setSize(18);
   $objPHPExcel->getActiveSheet()->getStyle('A1:B25')->getAlignment()->setWrapText(true);

  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['indicator_code'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  $objWriter->save('../xlscsv/'.$data['indicator_code'].'_FichaEvidencias.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

//datos-panel-dos

function metadatoCSV($data){
  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/../lib/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("SNEDH")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Indicadores de Derechos Humanos")
  							 ->setSubject($data['indicator_code'].$data['indicator_name'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Sistema Nacional de Evaluación de Derechos Humanos")
  							 ->setKeywords("SNEDH descarga masiva xls")
  							 ->setCategory("Sistema Nacional de Evaluación de Derechos Humanos");


  //$metadato = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

//  $numInd = $data['indicator_code'];
//  $nInd = explode('_',$numInd);
//  $nds = '';
//  for ($ede=0; $ede < count($nInd) - 1; $ede++) {
//    $nds .= $nInd[$ede] . '.';
//  }

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', ' '.$data['indicator_code'].' - '.$data['indicator_name']);

  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A2', 'Derecho');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A3', 'Categoría/Principio Transversal');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A4', 'Clave');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A5', 'Nombre');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A6', 'Tipo de Indicador');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A7', 'Descripción');
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A8', 'Evidencias');
    
//    $eves = count($data['evidence']);
//    
//    for($e=9;$e<$eves;$e++){
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, 'Nombre de la evidencia');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//        $objPHPExcel->setActiveSheetIndex(0)->setCellValue('A'.$e, '');
//    }


  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B2', $data['right_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B3', $data['indicator_category_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B4', $data['indicator_code']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B5', $data['indicator_name']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B6', $data['indicator_type_short']);
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('B7', $data['indicator_definition']);
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B8', '');
    
    
//    for($r=0;$r<count($data['evidence']);$r++){
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $obsEv[] = $data['evidence'][$r]['observation_unit_name'];
//        $urlEv[] = $data['evidence'][$r]['evidence_url'];
//        $valEv[] = $data['evidence'][$r]['institution_name_evidencie'];
//        $vigEv[] = $data['evidence'][$r]['validity_year_start']-$data['evidence'][$r]['validity_end_start'];
//        $updateEv[] = $data['evidence'][$r]['update_date'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//        $nomEv[] = $data['evidence'][$r]['evidence_name'];
//    }
    
//    var_dump($nomEv);
    
    
  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B9', $data['evidence']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B10', $data['Descrip_fdg']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B11', $data['CobTem_ft']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B12', $data['Oportunidad_ft']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B13', $data['Descrip_per']);

//  $fuen = '';
//  $fuente = $data['Fuente'];
//    for ($i=0; $i < count($fuente); $i++) {
//      $fuen .= $fuente[$i]['Descrip_fue'];
//    }
//  //var_dump($fuen);
//  $wizard = new PHPExcel_Helper_HTML;
//  $richText = $wizard->toRichTextObject($fuen);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B14', utf8_decode($richText));// Array
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B15', $data['FechaAct_atr']);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B16', $data['FecProxAct_eic']);
//
//    $resp = '';
//    $responsable = $data['InsResp'];
//    for ($j=0; $j < count($responsable); $j++) {
//      $resp .= $responsable[$j]['Descrip_ins'] . '<br />' . $responsable[$j]['Abrevia_ins'] . '<br />' . (($responsable[$j]['URL_ins'] == '' || $responsable[$j]['URL_ins'] == null) ? '' : $responsable[$j]['URL_ins']) . '<br /><br />';
//    }
//
//    $wizard2 = new PHPExcel_Helper_HTML;
//    $richText2 = $wizard2->toRichTextObject($resp);
//
//    //var_dump($resp);
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B17', utf8_decode($richText2));//Array
//
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B18', $data['Importancia_ft']);
//
//
//  $ref = '';
//  $refs = $data['RefInt'];
//  for ($k=0; $k < count($refs); $k++) {
//    $ref .= $refs[$k]['Descrip_ri'] . '<br /><br />';
//  }
//
//  $wizard3 = new PHPExcel_Helper_HTML;
//  $richText3 = $wizard3->toRichTextObject($ref);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B19', utf8_decode($richText3));//Array
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B20', $data['Observacion_ft']);
//
//  $con = '';
//  $contacto = $data['Contacto'];
//  for ($l=0; $l < count($contacto); $l++) {
//    $con .= $contacto[$l]['Nombre_con'] . '<br />' . $contacto[$l]['Puesto_con'] . '<br /> <b>Teléfono:</b> ' . $contacto[$l]['Telefono_con'] . '<br /> <b>Email:</b> ' . $contacto[$l]['Correo_con'] . '<br /> <b>Dirección:</b> ' . $contacto[$l]['Domicilio_con'].'<br /><br />';
//  }
//  $wizard4 = new PHPExcel_Helper_HTML;
//  $richText4 = $wizard4->toRichTextObject($con);
//
//  $objPHPExcel->setActiveSheetIndex(0)->setCellValue('B21', utf8_decode($richText4));//Array

  $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
  $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(40);
  $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(100);
  $objPHPExcel->getActiveSheet()->getRowDimension('2')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('3')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('4')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('5')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('6')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('7')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('8')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('9')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('10')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('11')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('12')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('13')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('14')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('15')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('16')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('17')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('18')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('19')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('20')->setRowHeight(-1);
  $objPHPExcel->getActiveSheet()->getRowDimension('21')->setRowHeight(-1);

   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getAlignment()->setHorizontal(PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getFont()->setBold(true);
   $objPHPExcel->getActiveSheet()->getStyle("A1:B1")->getFont()->setSize(18);
   $objPHPExcel->getActiveSheet()->getStyle('A1:B25')->getAlignment()->setWrapText(true);

  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['indicator_code'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);
    
    
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
  $objWriter->save('../xlscsv/'.$data['indicator_code'].'_FichaEvidencias.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}


function creaXLSCoS($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';
  //include dirname(__FILE__) . 'Classes/PHPExcel/Writer/Excel2007.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue('A2', 'Entidad Federativa');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.'2', $valores[$k]['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.$celda, $datoAS);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }


  $objPHPExcel->getActiveSheet()->mergeCells('A1:'.$b.'1');
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  //PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  ob_start();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  echo 'File "Indicador_'.$data["Codigo_ind"].'.xlsx" have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaCSVCoS($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Entidad Federativa');

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $valores[$k]['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);


          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }


  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaXLSCoCl($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A2', 'Entidad Federativa');



              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 4;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'3', $valores[$k]['Descrip_cla']);

          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo


            // $foo = count($valores) / $periodo;
            //   //var_dump(count($valorDato));
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

            //  $foo = count($valores) / count(array_unique($per));
            // //  var_dump($foo);
            // //  var_dump($per);
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

   $foo = count($valores) / count(array_unique($per));
    var_dump($foo);
    $bar = count($valores) / $foo;
    var_dump($bar);
    //exit();

    for ($m=0; $m < $foo; $m++) {
      $f = $f + $bar;
      $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
      $e = $f+1;
    }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

  $objPHPExcel->getActiveSheet()->mergeCells('A2:A3');// Merge para Entidad Federativa


  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files '.'Indicador_'.$data['Codigo_ind'].'.xlsx'.' have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaCSVCoCl($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A2', 'Entidad Federativa');



              $e = 2;
              $f = 2;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 4;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'3', $valores[$k]['Descrip_cla']);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          // $objPHPExcel->setActiveSheetIndex(0)
          //             ->setCellValue('A2', 'Entidad Federativa');


          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);
            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo


            // $foo = count($valores) / $periodo;
            //   //var_dump(count($valorDato));
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

            //  $foo = count($valores) / count(array_unique($per));
            // //  var_dump($foo);
            // //  var_dump($per);
            // for ($m=1; $m < $foo; $m++) {
            //   $f = $f + $periodon;
            //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
            //   $e = $f+1;
            // }

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  //  $foo = count($valores) / count(array_unique($per));
  // //  var_dump($foo);
  // //  var_dump($per);
  // for ($m=1; $m < $foo; $m++) {
  //   $f = $f + $periodon;
  //   $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
  //   $e = $f+1;
  // }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

  $objPHPExcel->getActiveSheet()->mergeCells('A2:A3');// Merge para Entidad Federativa


  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaXLSCoClAnidada($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->getActiveSheet()
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
  $objPHPExcel->getActiveSheet()
              ->setCellValue('A2', 'Entidad Federativa');

              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 5;

        $objPHPExcel->getActiveSheet()
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.'4', $valores[$k]['Descrip_cla']);

          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);

          $d = abecedario(count($valores)+count($periodo));
          $c = abecedario(count($valorDato)+1);

          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->getActiveSheet()
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->getActiveSheet()
                      ->setCellValue($a.$celda, $datoAS);
        }
      }

    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $foo = count($valores) / count(array_unique($per));
   var_dump($foo);
   $bar = count($valores) / $foo;
   var_dump($bar);
   //exit();

   for ($m=0; $m < $foo; $m++) {
     $f = $f + $bar;
     //$objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
     $e = $f+1;
   }

  //$objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

  //$objPHPExcel->getActiveSheet()->mergeCells('A2:A5');// Merge para Entidad Federativa


  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;

  echo 'Files have been created in ' , getcwd() , EOL;
}

function creaCSVCoClAnidada($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);
  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A2', 'Entidad Federativa');

              $e = 1;
              $f = 0;

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        $cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 5;

        $objPHPExcel->setActiveSheetIndex(0)
                    ->setCellValue('A'.$celda, $cobertura);
        $per = array();
        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'4', $valores[$k]['Descrip_cla']);
          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          // $objPHPExcel->setActiveSheetIndex(0)
          //             ->setCellValue('A2', 'Entidad Federativa');


          $periodo = count($valores[$k]['ClaveAgrupa_ac']);
          $per[] = $valores[$k]['ClaveAgrupa_ac'];

          $valorDato = $valores[$k]['ValorDato'];
          $periodon = count($valores);
          //var_dump($periodon);
          //var_dump($periodo);
          $d = abecedario(count($valores)+count($periodo));
          //var_dump($valorDato);
          $c = abecedario(count($valorDato)+1);


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);



          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue(abecedario($k+$periodo).'2', $valores[$k]['ValorDato']['AADato_ser']);
          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.$celda, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

            //$objPHPExcel->getActiveSheet()->mergeCells($a.'2:'.$d.'2'); // Merge para periodo


          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $foo = count($valores) / count(array_unique($per));
   var_dump($foo);
   $bar = count($valores) / $foo;
   var_dump($bar);
   //exit();

   for ($m=0; $m < $foo; $m++) {
     $f = $f + $bar;
     $objPHPExcel->getActiveSheet()->mergeCells(abecedario($e).'2:'.abecedario($f).'2'); // Merge para periodo
     $e = $f+1;
   }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1'); // Merge para título de Indicador

  $objPHPExcel->getActiveSheet()->mergeCells('A2:A5');// Merge para Entidad Federativa


  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaXLSClA($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $valores[$k]['Descrip_cla']);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Grupo taxonómico');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $nn = $valores[$k]['ValorDato'];
          for ($n=0; $n < count($nn); $n++) {
            # code...
          }
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $valores[$k]['ValorDato']['AADato_ser']);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaCSVClA($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('B1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $valores[$k]['Descrip_cla']);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Grupo taxonómico');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $nn = $valores[$k]['ValorDato'];
          for ($n=0; $n < count($nn); $n++) {
            # code...
          }
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $valores[$k]['ValorDato']['AADato_ser']);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['ValorDato']['Dato_Formato'] == null || $valores[$k]['ValorDato']['Dato_Formato'] == '') ? 'NA' : $valores[$k]['ValorDato']['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaXLSAS($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      $nomSerie = $serie[$i]['Descrip_ser'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $period = ($valores[$k]['Leyenda_ser'] == null || $valores[$k]['Leyenda_ser'] == '') ? $valores[$k]['AADato_ser'] : $valores[$k]['Leyenda_ser'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $period);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $nomSerie);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);


          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaCSVAS($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      $nomSerie = $serie[$i]['Descrip_ser'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cg'];
        $valores = $coberturas[$j]['ValorDato'];
        $celda = $j + 3;

        for ($k=0; $k < count($valores); $k++) {
          $a = abecedario($k+1);
          $b = abecedario(count($valores)+1);

          $vv = $k+3;
          $period = ($valores[$k]['Leyenda_ser'] == null || $valores[$k]['Leyenda_ser'] == '') ? $valores[$k]['AADato_ser'] : $valores[$k]['Leyenda_ser'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A'.$vv, $period);

          // var_dump($valores[$k]);
          // var_dump($valores[$k]['Dato_Formato']);
          //$dato =  (string)$valores[$k]['Dato_Formato'];
          //var_dump($dato);

          //$dato =  '34.6';
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('A2', 'Periodo');


          $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.'2', $nomSerie);

          //$objPHPExcel->getActiveSheet()
            //          ->setCellValue($a.'3', $valores[$k]['Dato_ser']);

          $datoAS = ($valores[$k]['Dato_Formato'] == null || $valores[$k]['Dato_Formato'] == '') ? 'NA' : $valores[$k]['Dato_Formato'];
          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue('B'.$vv, $datoAS);

          //$objPHPExcel->getActiveSheet()->setCellValueExplicit($a.'3', (string)$valores[$k]['Dato_Formato'], PHPExcel_Cell_DataType::TYPE_STRING);

          //$objPHPExcel->setActiveSheetIndex(0)->setCellValue($a.'2', count($valores));
        }
        //var_dump(count($dato));
        //var_dump($valores);
      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells('A1:B1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'CSV');
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaXLSACl($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cla'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        $periodos = array();
        $clasifi = array();

        for ($k=0; $k < count($valores); $k++) {

          $clasifi[$k] = $valores[$k]['Descrip_cla'];
          $periodos[$k] = $valores[$k]['ValorDato']['AADato_ser'];
          $datosVal[$k] = $valores[$k]['ValorDato']['Dato_Formato'];

        }

        $clasifi2 = array_unique($clasifi);
        $periodos2 = array_unique($periodos);

        //var_dump($clasifi2);
        //var_dump($periodos2);
        $unique = array();
        for ($oo=0; $oo < count($clasifi2); $oo++) {
          $a = abecedario($oo+1);
          $b = abecedario(count($valores)+1);
          $objPHPExcel->setActiveSheetIndex(0)
                     ->setCellValue('A2', 'Periodo');

          //$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $clasifi2[$oo]);

          $bor = count($periodos)/count($periodos2);
          //var_dump($bor);

          $rrr = 0;
          for ($ggg=0; $ggg < count($periodos2); $ggg++) {
            // echo 'Valor '.$periodos2[$ggg].'<br/>';
            $unique[] = $periodos2[$rrr];
            $rrr = $rrr + $bor;

          }

          for ($eee=0; $eee < count($periodos2); $eee++) {
            $celdo = 3+$eee;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue('A'.$celdo , $unique[$eee]);
          }


          $www = 0;
          for ($fff=0; $fff < count($periodos2); $fff++) {
            $celdo = 3+$fff;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($a.$celdo, $datosVal[$www+$oo]);
            $www = $www + $bor;
          }



        }

      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

function creaCSVACl($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';
  require_once dirname(__FILE__) . '/Classes/PHPExcel/Writer/CSV.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cla'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 3;

        $periodos = array();
        $clasifi = array();

        for ($k=0; $k < count($valores); $k++) {

          $clasifi[$k] = $valores[$k]['Descrip_cla'];
          $periodos[$k] = $valores[$k]['ValorDato']['AADato_ser'];
          $datosVal[$k] = $valores[$k]['ValorDato']['Dato_Formato'];

        }

        $clasifi2 = array_unique($clasifi);
        $periodos2 = array_unique($periodos);

        //var_dump($clasifi2);
        //var_dump($periodos2);
        $unique = array();
        for ($oo=0; $oo < count($clasifi2); $oo++) {
          $a = abecedario($oo+1);
          $b = abecedario(count($valores)+1);
          $objPHPExcel->setActiveSheetIndex(0)
                     ->setCellValue('A2', 'Periodo');

          //$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);

          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'2', $clasifi2[$oo]);

          $bor = count($periodos)/count($periodos2);
          //var_dump($bor);

          $rrr = 0;
          for ($ggg=0; $ggg < count($periodos2); $ggg++) {
            // echo 'Valor '.$periodos2[$ggg].'<br/>';
            $unique[] = $periodos2[$rrr];
            $rrr = $rrr + $bor;

          }

          for ($eee=0; $eee < count($periodos2); $eee++) {
            $celdo = 3+$eee;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue('A'.$celdo , $unique[$eee]);
          }


          $www = 0;
          for ($fff=0; $fff < count($periodos2); $fff++) {
            $celdo = 3+$fff;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($a.$celdo, $datosVal[$www+$oo]);
            $www = $www + $bor;
          }



        }

      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);
  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
  //$objWriter->setUseBOM(false);
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.csv');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));

  echo 'Files have been created in ' , getcwd() , EOL;

}

function creaXLSAClanidada($data){

  /** Error reporting */
  error_reporting(E_ALL);
  ini_set('display_errors', TRUE);
  ini_set('display_startup_errors', TRUE);
  date_default_timezone_set('America/Mexico_City');

  define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

  /** Include PHPExcel */
  require_once dirname(__FILE__) . '/Classes/PHPExcel.php';

  // Create new PHPExcel object
  //echo date('H:i:s') , " Create new PHPExcel object" , EOL;
  $objPHPExcel = new PHPExcel();

  // Set document properties
  //echo date('H:i:s') , " Set document properties" , EOL;
  $objPHPExcel->getProperties()->setCreator("Agenda2030")
  							 ->setLastModifiedBy("Daniel H. Vargas")
  							 ->setTitle("Objetivo")
  							 ->setSubject($data['Codigo_ind'].$data['Descrip_ind'])
  							 ->setDescription("Archivo creado para la Descarga Masiva de Agenda 2030")
  							 ->setKeywords("agenda2030 descarga masiva xls")
  							 ->setCategory("Objetivos de Desarrollo Sostenible");


  $serie = $data['Series'];
  //var_dump($serie);
  $objPHPExcel->setActiveSheetIndex(0);

  $objPHPExcel->setActiveSheetIndex(0)
              ->setCellValue('A1', $data['Codigo_ind'].$data['Descrip_ind']);

  for ($i=0; $i < count($serie); $i++) {
    if($serie[$i]['Tipo_ser'] == 'R'){
      $coberturas = $serie[$i]['Coberturas'];
      //var_dump($coberturas);

      for ($j=0; $j < count($coberturas); $j++) {
        //$cobertura = $coberturas[$j]['Descrip_cla'];
        $valores = $coberturas[$j]['Clasificaciones'];
        $celda = $j + 4;

        $periodos = array();
        $clasifi = array();
        $cobertu = array();

        for ($k=0; $k < count($valores); $k++) {
          $cobertu[$k] = $coberturas[$i]['Descrip_cg'];
          $clasifi[$k] = $valores[$k]['Descrip_cla'];
          $periodos[$k] = $valores[$k]['ValorDato']['AADato_ser'];
          $datosVal[$k] = $valores[$k]['ValorDato']['Dato_Formato'];
        }

        $cobertu2 = array_unique($cobertu);
        $clasifi2 = array_unique($clasifi);
        $periodos2 = array_unique($periodos);

        //var_dump($periodos2);
        //var_dump($clasifi2);
        //var_dump($periodos2);
        $anios = array();
        $rrrr = 0;
        for ($gggg=0; $gggg < count($periodos2); $gggg++) {
          // echo 'Valor '.$periodos2[$ggg].'<br/>';
          $anios[$gggg] = $periodos2[$rrr];
          $rrrr = $rrrr+1;

        }
        var_dump($anios);
        for ($qwe=0; $qwe < count($anios); $qwe++) {
          $celdos = 4+$qwe;
          $objPHPExcel->setActiveSheetIndex(0)
                     ->setCellValue('A'.$celdos, $anios[$qwe]);
        }


        $unique = array();
        for ($oo=0; $oo < count($clasifi2); $oo++){
          $a = abecedario($oo+1);
          $b = abecedario(count($valores)+1);
          $objPHPExcel->setActiveSheetIndex(0)
                     ->setCellValue('A3', 'Periodo');

          //$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(25);


          // for ($hghg=0; $hghg < count(); $hghg++) {
          //
          // }


          $objPHPExcel->setActiveSheetIndex(0)
                      ->setCellValue($a.'3', $clasifi2[$oo]);

          // $objPHPExcel->setActiveSheetIndex(0)
          //             ->setCellValue($a.'2', $cobertu2[$oo]);
          var_dump(count($periodos));
          $bor = count($periodos)/count($periodos2);
          var_dump($bor);

          $rrr = 0;
          for ($ggg=0; $ggg < count($periodos2); $ggg++) {
            // echo 'Valor '.$periodos2[$ggg].'<br/>';
            $unique[$ggg] = $periodos2[$rrr];
            $rrr = $rrr + $bor;

          }
          var_dump($unique);

          $xxx = 0;
          for ($eee=0; $eee < count($unique); $eee++) {
            // $celdo = 1+$eee;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($a.'2' , $unique[$eee]);
            $xxx = $xxx + $eee;
          }

          $www = 0;
          for ($fff=0; $fff < count($periodos2); $fff++) {
            $celdo = 4+$fff;
            $objPHPExcel->setActiveSheetIndex(0)
                        ->setCellValue($a.$celdo, $datosVal[$www+$oo]);
            $www = $www + $bor;
          }

        }

      }


    }else if($serie[$i]['Tipo_ser'] == 'I'){
      echo 'Tipo Insumo';
    }
  }

  $objPHPExcel->getActiveSheet()->mergeCells($a.'1:'.$b.'1');
  // Rename worksheet
  //echo date('H:i:s') , " Rename worksheet" , EOL;
  $objPHPExcel->getActiveSheet()->setTitle(substr($data['Codigo_ind'].$data['Descrip_ind'], 0, 25));

  // Set active sheet index to the first sheet, so Excel opens this as the first sheet
  $objPHPExcel->setActiveSheetIndex(0);

  // Save Excel 2007 file
  //echo date('H:i:s') , " Write to Excel format" , EOL;
  $callStartTime = microtime(true);

  // Use PCLZip rather than ZipArchive to create the Excel2007 OfficeOpenXML file
  PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

  $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
  ob_end_clean();
  //$nomArc = $data['Codigo_ind']
  $objWriter->save('xlscsv/Indicador_'.$data['Codigo_ind'].'.xlsx');
  // $objWriter->save(str_replace('.php', '.xlsx', __FILE__));
  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  $callEndTime = microtime(true);
  $callTime = $callEndTime - $callStartTime;

  //echo date('H:i:s') , " File written to " , str_replace('.php', '.xls', pathinfo(__FILE__, PATHINFO_BASENAME)) , EOL;
  //echo 'Call time to write Workbook was ' , sprintf('%.4f',$callTime) , " seconds" , EOL;
  // Echo memory usage
  //echo date('H:i:s') , ' Current memory usage: ' , (memory_get_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo memory peak usage
  //echo date('H:i:s') , " Peak memory usage: " , (memory_get_peak_usage(true) / 1024 / 1024) , " MB" , EOL;

  // Echo done
  //echo date('H:i:s') , " Done writing files" , EOL;
  echo 'Files have been created in ' , getcwd() , EOL;
  //var_dump($data);
}

?>
