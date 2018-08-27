<?php
$x = 3.1415;
$names = array(0=>"John",1=>"Beatrice",2=>"Sam");
function sayHi($who){
    echo "<br> Heyo $who!\n";
}

?>

<html>
<?php echo "Pi is around $x<br>" ?>
<?php foreach ($names as $id=>$name){
    sayHi($name);
}
?>

</html>
