<?php
namespace mylib;
require_once "Generator.php";       //better to use than include, dies if cannot find it

class Page extends Generator {  //php.net inheritance page for reference
    public function doctype(){
        echo "<!DOCTYPE= html>";
    }
    public function html(){
        echo "<html>\n";
        $this->head();
        $this->body();
        echo "</html>\n";
    }
    public function page(){
        $this->doctype();
        $this->html();
    }
    public function head(){
        echo "<title>";
        $this->title();
        echo "</title>";
        $this->js();
        $this->css();
    }
    public function js(){
        echo "<script></script>";
    }
    public function css(){
        echo "<style></style>";
    }
    public function title(){
        echo "This is the title";
    }
    public function body(){
        echo "<body>This is the body.</body>";
    }
    public function generate(){
        $this->page();
    }

}
?>