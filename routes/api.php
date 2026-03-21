<?php

use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\EstadoOrdenController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\TipoIdentificacionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('tipos-identificacion')->group(function () {
    Route::get('listar', [TipoIdentificacionController::class, 'listar']);
    Route::get('consultar/{id}', [TipoIdentificacionController::class, 'consultar']);
    Route::post('guardar', [TipoIdentificacionController::class, 'guardar']);
    Route::put('actualizar/{id}', [TipoIdentificacionController::class, 'actualizar']);
});

Route::prefix('tareas')->group(function () {
    Route::get('listar', [TareaController::class, 'listar']);
    Route::get('consultar/{id}', [TareaController::class, 'consultar']);
    Route::post('guardar', [TareaController::class, 'guardar']);
    Route::put('actualizar/{id}', [TareaController::class, 'actualizar']);
});

Route::prefix('empleados')->group(function () {
    Route::get('listar', [EmpleadoController::class, 'listar']);
    Route::get('consultar/{id}', [EmpleadoController::class, 'consultar']);
    Route::post('guardar', [EmpleadoController::class, 'guardar']);
    Route::put('actualizar/{id}', [EmpleadoController::class, 'actualizar']);
});

Route::prefix('estados-orden')->group(function () {
    Route::get('listar', [EstadoOrdenController::class, 'listar']);
    Route::get('consultar/{id}', [EstadoOrdenController::class, 'consultar']);
    Route::post('guardar', [EstadoOrdenController::class, 'guardar']);
    Route::put('actualizar/{id}', [EstadoOrdenController::class, 'actualizar']);
});