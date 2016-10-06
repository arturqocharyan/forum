<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Socialite;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {   
        $img = $this->getGravatar($data['email']);
        $imageName = time().'.png';
        $imgDefault = 'default.png';
        $succes = file_put_contents(public_path('avatar').'/'.$imageName, $img);
        if($succes != false){
            $imgDefault = $imageName;
        }
        
        $oParams = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'avatar' => $imgDefault,
        ]);
        $aParams = $oParams;
        $aParams->toArray();
        $this->redirectTo = '/registersUsers/'.$aParams['id'].'/'.$aParams['name'];
        return $oParams;
    }
    protected function getGravatar($email){
        $hash = md5($email);
        return file_get_contents('http://www.gravatar.com/avatar/'
                .$hash.
                '?s=120&d=monsterid');
    }
}
