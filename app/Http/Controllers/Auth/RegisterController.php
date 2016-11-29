<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Request;
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
       
        //$this->middleware('guest');
         
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
            'name' => 'required|max:255|min:3',
            'email' => 'required|email|max:255|unique:users',
            'username' => 'required|max:255|unique:users|min:3',
            'password' => 'required|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create()
    {   
        $data = Request::all();
        
        $error = $this->validator($data)->errors();
        //$error = json_decode($error);
        $response['errors']=$error->messages();
        if(!empty($error->messages())){
            return response()->json($response, 200);
        }
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
            'username'=>$data['username']
        ]);
        $aParams = $oParams;
        $aParams->toArray();
        if(isset($oParams)){
            $credentials = [
                "email" => $data['email'],
                "password" => $data['password']
            ];
            Auth::attempt($credentials, true);
            
        }
        $this->redirectTo = '/registersUsers/'.$aParams['id'].'/'.$aParams['name'];
        return $oParams;
    }
    protected function getGravatar($email){
        $hash = md5($email);
        return file_get_contents('http://www.gravatar.com/avatar/'
                .$hash.
                '?s=120&d=monsterid');
    }
    protected function checkingUsername(){
        $data = Request::all();
       
        if(isset($data['id'])){
            $oParams = User::select()
                    ->where('username',$data['username'])
                    ->where('id', '!=', $data['id'])
                    ->get()
                    ->count();
            return json_encode($oParams);
        }
        $oParams = User::select()->where('username',$data['username'])->get()->count();
        return json_encode($oParams);
       
    }
}
