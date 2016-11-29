<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;

class UsersController extends Controller {
    public function __construct()
    {
        //$this->middleware('auth');
    }
    
    public function index()
    {
        return Post::all();
    }

    public function show($id)
    {
       // dd(Auth::user());
        if(!Auth::check()){
            return response()->json('error', 302);
           
        }
         return User::find($id);
        
    }
}
