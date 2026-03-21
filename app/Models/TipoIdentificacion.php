<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoIdentificacion extends Model
{
    // Declaración de propiedades de la entidad.
    public $timestamps = false; 
    protected $table = 'tbl_tipo_identificacion';
    protected $primaryKey = 'id_tipo_identificacion';
    protected $fillable = [
        'id_tipo_identificacion',
        'nombre',
    ];
}
