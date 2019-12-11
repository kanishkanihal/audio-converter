<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Convert extends Model
{
    protected $fillable = [
        'user_id',
        'original_name',
        'download_name',
    ];
}
