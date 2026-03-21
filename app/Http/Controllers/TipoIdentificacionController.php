<?php

namespace App\Http\Controllers;

use App\Models\TipoIdentificacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TipoIdentificacionController extends Controller
{
    //Get listar

    public function listar(): JsonResponse {
       try {
            $tiposIdentificacion = TipoIdentificacion::get();
            return response()->json($tiposIdentificacion);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function consultar($id): JsonResponse {
        try {
            $tipoIdentificacion = TipoIdentificacion::find($id);
            if ($tipoIdentificacion) {
                return response()->json($tipoIdentificacion);
            } else {
                return response()->json("Tipo de identificación no encontrado", 404);
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

            $tipoIdentificacion = TipoIdentificacion::create($valido);
            return response()->json($tipoIdentificacion, 201);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function actualizar(Request $request, $id): JsonResponse {
        try {


            $tipoIdentificacion = TipoIdentificacion::find($id);
            if ($tipoIdentificacion) {
                $tipoIdentificacion->nombre = $request->nombre;
                $tipoIdentificacion->save();
                return response()->json($tipoIdentificacion);
            } else {
                return response()->json("Tipo de identificación no encontrado", 404);
            }
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }
}
