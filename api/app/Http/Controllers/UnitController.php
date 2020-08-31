<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Models\Unit;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::with('charges')->get();

        return UnitResource::collection($units);
    }

    public function show(Unit $unit)
    {
        $unit->load('charges');

        return UnitResource::make($unit);
    }
}