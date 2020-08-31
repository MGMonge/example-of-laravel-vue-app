<?php

use Illuminate\Support\Facades\Route;

Route::post('/login', 'LoginController@store')->name('tokens.create');

Route::group(['middleware' => 'auth:api'], function () {
    // Account
    Route::get('/me', 'AccountController@show')->name('accounts.show');
    Route::delete('/logout', 'LoginController@destroy')->name('tokens.destroy');

    // Units
    Route::get('/units', 'UnitController@index')->name('units.index');
    Route::get('/units/{unit}', 'UnitController@show')->name('units.show');

    // Units - Charges
    Route::post('/units/{unit}/charges', 'ChargeController@store')->name('units.charges.store');
    Route::patch('/units/{unit}/charges/{charge:id}', 'ChargeController@update')->name('units.charges.update');
});