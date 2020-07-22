<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tree extends Model
{
    //
    // const CREATED_AT = 'creation_date';
    // const UPDATED_AT = 'last_update';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id','name','species','longitude','latitude','diameter','pic'];

}
