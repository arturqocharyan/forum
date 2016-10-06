<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    public static $roles = array(
        '0'=>'user',
        '1'=>'admin'
    );
    protected $fillable = [
        'name', 'email', 'password','avatar',
    ];
    public static function getEmailAndAvatarById($id){
        $query = User::select('avatar', 'email')->where('id',$id)->get()->toArray();
        return $query[0];
    }
    
}
