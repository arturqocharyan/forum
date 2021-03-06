<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('{slug}', function() {
    return view('index');
})
->where('slug', '(?!api)([A-z\d-\/_.]+)?');
Route::post('register','auth\RegisterController@create');
Route::post('login','auth\LoginController@postLogin');
Route::post('checkingUsername','auth\RegisterController@checkingUsername');
Route::post('user/{id}','UsersController@show');

//Route::get('/', function () {
//    return view('welcome');
//});
//Auth::routes();
//
//Route::get('/home', 'HomeController@index');

Route::post('PostAvatarUpload/{id}','HomeController@PostAvatarUpload');
//Route::get('/redirect', 'SocialAuthController@redirect');
//Route::get('/callback', 'SocialAuthController@callback');
