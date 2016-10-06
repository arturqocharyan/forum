<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Model\User;
use Socialite;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
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
    public function registersUsers($id,$name){
       
        return view('home.reg');
    }
    public function PostAvatarUpload(Request $request){
        $oldMailAndAvatar = User::getEmailAndAvatarById($request->id);
        if($oldMailAndAvatar['email'] == $request->email){
           $this->validate($request, [
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'name' => 'required|max:255',
                'email' => 'required|email|max:255',
            ]); 
        }else{
            $this->validate($request, [
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
        ]);
        }
        if(isset($request->image)){
            $imageName = time().'.'.$request->image->getClientOriginalExtension();
            $success = $request->image->move(public_path('avatar'), $imageName);
            if(isset($success)){
               unlink(public_path('avatar'.'/'.$oldMailAndAvatar['avatar']));
                $oldMailAndAvatar['avatar'] = $imageName;
            }
        }
        $user = User::find($request->id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->avatar = $oldMailAndAvatar['avatar'];
        $user->save();
        
    	return back()
    		->with('success','Save')
    		->with('path',$oldMailAndAvatar['avatar']);
        
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
