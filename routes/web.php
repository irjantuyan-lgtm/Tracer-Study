<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/alumni/{any?}', function () {
    return view('welcome');
})->where('any', '.*');

