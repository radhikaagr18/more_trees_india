<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', 'TreeController@index');
Route::post('store', 'TreeController@store')->middleware('auth');
Route::get('/add_trees', function () {return view('pages.add_trees');})->middleware('auth');
Route::get('/view_trees','TreeController@show')->middleware('auth');
// Route::get('/_trees', function () {return view('pages.add_trees');});

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
