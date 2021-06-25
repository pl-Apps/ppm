<?php
    $package_name = $_GET['pkgname'];
    $upload_pos = "packages/$package_name.plpkg";
    if(file_exists($upload_pos)) {
        echo "PKG_EXIST";
    }
    else
    {
        echo "UPLOADING_PKG";
        try {
            move_uploaded_file($_GET['filename'], $upload_pos);
            echo "UPLOADED";
        } 
        catch (Exception $ex)
        {
            echo "ERROR";
        };
        
    };
?>