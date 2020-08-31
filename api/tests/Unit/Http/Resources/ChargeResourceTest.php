<?php

namespace Tests\Charge\Http\Resources;

use App\Http\Resources\ChargeResource;
use App\Models\Charge;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChargeResourceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function it_presents_a_charge_resource()
    {
        $charge = factory(Charge::class)->make(['finished_at' => null]);

        $actual = ChargeResource::make($charge)->toJson();

        $this->assertEquals(json_encode([
            'id'          => $charge->id,
            'started_at'  => $charge->started_at,
            'finished_at' => $charge->finished_at,
        ]), $actual);
    }
}