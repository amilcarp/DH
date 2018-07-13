<?php

date_default_timezone_set('America/Mexico_City');
require('../lib/pclzip.lib.php');

$datos = $_POST;

$indicadores = $datos['indicadores'];
$tipoFormato = $datos['tipoFormato'];

$indicadores = explode(',',$indicadores);

for ($i=1; $i < count($indicadores); $i++) {
   $otra = $indicadores[$i];
   //$foo = explode('ind',$otra);
   $opo[] = $otra;
}

if($tipoFormato == 'xls'){

  $codigos = '';
    for ($i=0; $i < count($opo); $i++) {
      //var_dump($opo[$i]);
      //var_dump(codigoIndicador($opo[$i]));
      $codigos .= '../xlscsv/'.$opo[$i].'_FichaEvidencias.xlsx,';
    }



//  if($calculoDescarga == "3"){
//    for ($i=0; $i < count($opo); $i++) {
//      for ($j=0; $j < count(datoscalculo($opo[$i])); $j++) {
//        $f = $j + 1;
//        $codigos .= '../xlscsv/DatosCalculo_T'.$f.'_'.codigoIndicador($opo[$i]).'.xlsx,';
//      }
//    }
//  }

  $resultado =  trim($codigos, ',');

// var_dump($resultado);
// exit();

  $fecha = date('Y-m-d-His');
  $nameFile = 'SNEDH_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('../zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}

if($tipoFormato == 'csv'){

   $codigos = '';
    for ($i=0; $i < count($opo); $i++) {
      //var_dump($opo[$i]);
      //var_dump(codigoIndicador($opo[$i]));
      $codigos .= '../xlscsv/'.$opo[$i].'_FichaEvidencias.csv,';
    }
    
    
//  if($calculoDescarga == "3"){
//    for ($i=0; $i < count($opo); $i++) {
//      for ($j=0; $j < count(datoscalculo($opo[$i])); $j++) {
//        $f = $j + 1;
//        $codigos .= '../xlscsv/DatosCalculo_T'.$f.'_'.codigoIndicador($opo[$i]).'.csv,';
//      }
//    }
//  }

  $resultado =  trim($codigos, ',');

  $fecha = date('Y-m-d-His');
  $nameFile = 'SNEDH_DescargaMasiva-'.$fecha.'.zip';
  $zip = new PclZip('../zip/'.$nameFile);
  //var_dump($codigos);
  $zip->create($resultado);
  echo '<a style="font-size:18px;" href="zip/'.$nameFile.'">'.$nameFile.'</a>';
}


function leer_contenido_completo($url){
   $fichero_url = fopen ($url, "r");
   $texto = "";
   while ($trozo = fgets($fichero_url, 1024)){
      $texto .= $trozo;
   }
   return $texto;
}

?>
