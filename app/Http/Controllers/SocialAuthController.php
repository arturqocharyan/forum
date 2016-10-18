<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests;
use Socialite;
use Laravel\Socialite\Contracts\User as ProviderUser;
use App\SocialAccount;
use App\User;
class SocialAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('facebook')->redirect();
    }
    public function callback()
    {
        $user = $this->getUser(Socialite::driver('facebook')->user());
        
        if(isset($user['providerUser'])){
             return view('home.social.socialReg',$user);
        }
        auth()->login($user);
        
        return redirect()->to('/home');
    }
    public function getUser(ProviderUser $providerUser)
    {
        $account = SocialAccount::whereProvider('facebook')
            ->whereProviderUserId($providerUser->getId())
            ->first();
        if ($account) {
            return $account->user;
        } else {
            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => 'facebook',
            ]);
            $user = User::whereEmail($providerUser->getEmail())->first();
            if (!$user) {
                $providerUser->provider = 'facebook';
                $data['providerUser'] = $providerUser;
                return $data;
                
            }
            $account->user()->associate($user);
            $account->save();
            return $user;
        }
        
    }
    public function createUser(Request $request)
    {
        $this->validate($request, [
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
        ]);
        return redirect()->to('/home');
        return back()
    		->with('success','Save');
    		//->with('path',$oldMailAndAvatar['avatar']);
        
        
    }
    
}