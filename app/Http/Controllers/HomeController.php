<?php

namespace App\Http\Controllers;


use App\Http\Requests;
use App\Model\User;
use Socialite;
use Request;
use Validator;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
       return view('home.home');
    }
    
    public function registersUsers($id,$name)
    {
        dd(Auth::user());
        return view('home.reg');
    }
    
    public function PostAvatarUpload(){
        $request = Request::all();
        $validData = [
                'name' => 'required|max:255',
                'username' => 'required|max:255',
                'email' => 'required|email|max:255',
            ];
        $oldMailAndAvatar = User::getEmailAndAvatarById($request['id']);
        //dd($oldMailAndAvatar);
        if($oldMailAndAvatar['email'] == $request['email'] && $oldMailAndAvatar['username'] == $request['username']){
           $error = Validator::make($request, $validData)->errors(); 
        }elseif($oldMailAndAvatar['email'] == $request['email']){
            $validData['username'] = 'required|max:255|unique:users';
            $error = Validator::make($request, $validData)->errors();
                
        }elseif($oldMailAndAvatar['username'] == $request['username']){
            $validData['email'] = 'required|email|max:255|unique:users';
            $error = Validator::make($request,$validData)->errors();
        }else{
            $validData['username'] = 'required|max:255|unique:users';
            $validData['email'] = 'required|email|max:255|unique:users';
            $error = Validator::make($request, $validData)->errors();

        }
         
        
       
        if(!empty($error->messages())){
            
            $response['errors']=$error->messages();
            return response()->json($response, 200);
        }
        
        if(isset($request['image']) && $request['image'] !='undefined'){
            
            $validData['image'] = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048';
            $error = Validator::make($request,$validData)->errors();
            $imageName = time().'.'.$request['image']->getClientOriginalExtension();
            $success = $request['image']->move(public_path('avatar'), $imageName);
            if(isset($success)){
               unlink(public_path('avatar'.'/'.$oldMailAndAvatar['avatar']));
                $oldMailAndAvatar['avatar'] = $imageName;
            }
        }
        $user = User::find($request['id']);
            $user->name = $request['name'];
            $user->email = $request['email'];
            $user->avatar = $oldMailAndAvatar['avatar'];
        $user->save();
        
    	return response()->json($user, 200);
        
    }

    private function avatarUpload(Request $request)
    {
    	$this->validate($request, [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imageName = time().'.'.$request->image->getClientOriginalExtension();
        $request->image->move(public_path('avatar'), $imageName);

    	return back()
    		->with('success','Image Uploaded successfully.')
    		->with('path',$imageName);
    }
}
