<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public static $roles = array(
        '0'=>'user',
        '1'=>'admin'
    );
    
}
