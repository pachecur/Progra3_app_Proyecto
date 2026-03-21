<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    // Declaración de propiedades de la entidad.
    public $timestamps = false; 
    protected $table = 'tbl_empleado';
    protected $primaryKey = 'id_empleado';
    protected $fillable = [
        'id_empleado',
        'id_tipo_identificacion',
        'identificacion',
        'nombre',
        'apellidos',
        'telefono',
        'correo',
        'estado',
        'direccion',
        'puesto',
    ];
}
