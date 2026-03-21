<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    // Declaración de propiedades de la entidad.
    public $timestamps = false; 
    protected $table = 'tbl_tarea';
    protected $primaryKey = 'id_tarea';
    protected $fillable = [
        'id_tarea',
        'nombre',
        'descripcion',
        'hora_inicio',
        'hora_fin',
        'estado',
    ];
}
