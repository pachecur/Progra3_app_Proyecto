<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    //Get listar

    public function listar(): JsonResponse {
       try {
            $tareas = Tarea::get();
            return response()->json($tareas);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function consultar($id): JsonResponse {
        try {
            $tarea = Tarea::find($id);
            if ($tarea) {
                return response()->json($tarea);
            } else {
                return response()->json("Tarea no encontrada", 404);
            }
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function guardar(Request $request): JsonResponse {
        try {
            $valido = $request->validate([
                'nombre' => 'required|string|max:100',
                'descripcion' => 'required|string',
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_fin' => 'required|date_format:H:i:s|after:hora_inicio',
                'estado' => 'required|string',
            ]);

            $tarea = Tarea::create($valido);
            return response()->json($tarea, 201);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function actualizar(Request $request, $id): JsonResponse {
        try {
            $valido = $request->validate([
                'nombre' => 'required|string|max:100',
                'descripcion' => 'required|string',
                'hora_inicio' => 'required|date_format:H:i:s',
                'hora_fin' => 'required|date_format:H:i:s|after:hora_inicio',
                'estado' => 'required|string',
            ]);
            if($valido) {
              $tarea = Tarea::find($id);
              if ($tarea) {
                  $tarea->nombre = $request->nombre;
                  $tarea->descripcion = $request->descripcion;
                  $tarea->hora_inicio = $request->hora_inicio;
                  $tarea->hora_fin = $request->hora_fin;
                  $tarea->estado = $request->estado;
                  $tarea->save();
                  return response()->json($tarea);
              } else {
                  return response()->json("Tarea no encontrada", 404);
              }
            } else {
                return response()->json("Datos no válidos", 400);
            }   
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }
}
