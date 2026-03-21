<?php

namespace App\Http\Controllers;

use App\Models\EstadoDeOrden;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EstadoOrdenController extends Controller
{
    //Get listar

    public function listar(): JsonResponse {
       try {
            $estadosDeOrden = EstadoDeOrden::get();
            return response()->json($estadosDeOrden);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function consultar($id): JsonResponse {
        try {
            $estadoDeOrden = EstadoDeOrden::find($id);
            if ($estadoDeOrden) {
                return response()->json($estadoDeOrden);
            } else {
                return response()->json("Estado de orden no encontrado", 404);
            }
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function guardar(Request $request): JsonResponse {
        try {
            $valido = $request->validate([
                'nombre' => 'required|string|max:100',
            ]);

            $estadoDeOrden = EstadoDeOrden::create($valido);
            return response()->json($estadoDeOrden, 201);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function actualizar(Request $request, $id): JsonResponse {
        try {


            $estadoDeOrden = EstadoDeOrden::find($id);
            if ($estadoDeOrden) {
                $estadoDeOrden->nombre = $request->nombre;
                $estadoDeOrden->save();
                return response()->json($estadoDeOrden);
            } else {
                return response()->json("Estado de orden no encontrado", 404);
            }
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }
}
