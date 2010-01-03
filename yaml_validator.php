<?php

include('spyc/spyc.php');

$array = Spyc::YAMLLoad('questions/11.yaml');


echo '<pre>YAML Data dumped back:<br/>';
echo Spyc::YAMLDump($array);
echo '</pre>';


echo '<pre>YAML Data in PHP format:<br/>';
print_r($array);
echo '</pre>';
