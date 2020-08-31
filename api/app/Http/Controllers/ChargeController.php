<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Models\Charge;
use App\Models\Unit;

class ChargeController extends Controller
{
    public function store(Unit $unit)
    {
        $unit->startCharging();

        return UnitResource::make($unit);
    }

    public function update(Unit $unit, Charge $charge)
    {
        $unit->stopCharging($charge);

        return UnitResource::make($unit);
    }
}