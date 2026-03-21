<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EstadoDeOrden extends Model
{
    // Declaración de propiedades de la entidad.
    public $timestamps = false; 
    protected $table = 'tbl_estado_orden';
    protected $primaryKey = 'id_estado_orden';
    protected $fillable = [
        'id_estado_orden',
        'nombre',
    ];
}
