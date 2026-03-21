<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmpleadoController extends Controller
{
    //Get listar

    public function listar(): JsonResponse {
       try {
            $empleados = Empleado::get();
            return response()->json($empleados);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function consultar($id): JsonResponse {
        try {
            $empleado = Empleado::find($id);
            if ($empleado) {
                return response()->json($empleado);
            } else {
                return response()->json("Empleado no encontrado", 404);
            }
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function guardar(Request $request): JsonResponse {
        try {
            $valido = $request->validate([
                'id_tipo_identificacion' => 'required|integer',
                'identificacion' => 'required|string|max:20',
                'nombre' => 'required|string|max:100',
                'apellidos' => 'required|string|max:100',
                'telefono' => 'required|string|max:20',
                'correo' => 'required|email|unique:tbl_empleado,correo',
                'estado' => 'required|string',
            ]);

            $empleado = Empleado::create($valido);
            return response()->json($empleado, 201);
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage());
        }
    }

    public function actualizar(Request $request, $id): JsonResponse {
        try {
            $valido = $request->validate([
                'id_tipo_identificacion' => 'required|integer',
                'identificacion' => 'required|string|max:20',
                'nombre' => 'required|string|max:100',
                'apellidos' => 'required|string|max:100',
                'telefono' => 'required|string|max:20',
                'correo' => 'required|email|unique:tbl_empleado,correo',
                'estado' => 'required|string',
            ]);
            if($valido) {
              $empleado = Empleado::find($id);
              if ($empleado) {
                  $empleado->id_tipo_identificacion = $request->id_tipo_identificacion;
                  $empleado->identificacion = $request->identificacion;
                  $empleado->nombre = $request->nombre;
                  $empleado->apellidos = $request->apellidos;
                  $empleado->telefono = $request->telefono;
                  $empleado->correo = $request->correo;
                  $empleado->estado = $request->estado;
                  $empleado->save();
                  return response()->json($empleado);
              } else {
                  return response()->json("Empleado no encontrado", 404);
              }
            } else {
                return response()->json("Datos no válidos", 400);
            }   
        } catch (\Throwable $ex) {
            return response()->json($ex->getMessage(), 500);
        }
    }
}
