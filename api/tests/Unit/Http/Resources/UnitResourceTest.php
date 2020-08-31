<?php

namespace Tests\Unit\Http\Resources;

use App\Http\Resources\ChargeResource;
use App\Http\Resources\UnitResource;
use App\Models\Charge;
use App\Models\Unit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UnitResourceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function it_presents_a_unit_resource()
    {
        $unit = factory(Unit::class)->make();

        $actual = UnitResource::make($unit)->toJson();

        $this->assertEquals(json_encode([
            'id'       => $unit->id,
            'name'     => $unit->name,
            'address'  => $unit->address,
            'postcode' => $unit->postcode,
            'status'   => $unit->status,
        ]), $actual);
    }

    /** @test */
    function it_presents_a_unit_resource_with_charges_when_eager_loaded()
    {
        $unit = factory(Unit::class)->create();
        factory(Charge::class, 1)->create(['unit_id' => $unit->id]);
        $unit->load('charges');

        $actual = UnitResource::make($unit)->toJson();

        $this->assertEquals(json_encode([
            'id'       => $unit->id,
            'name'     => $unit->name,
            'address'  => $unit->address,
            'postcode' => $unit->postcode,
            'status'   => $unit->status,
            'charges'  => ChargeResource::collection($unit->charges),
        ]), $actual);
    }
}