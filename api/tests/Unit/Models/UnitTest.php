<?php

namespace Tests\Models;

use App\Models\Charge;
use App\Models\Unit;
use App\Models\UnitStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class UnitTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function it_can_start_charging()
    {
        Carbon::setTestNow('1992-01-11 11:00:00');
        $unit = factory(Unit::class)->create(['status' => UnitStatus::AVAILABLE]);

        $unit->startCharging();

        $this->assertCount(1, $unit->charges);
        $this->assertDatabaseHas('units', ['id' => $unit->id, 'status' => UnitStatus::CHARGING]);
        $this->assertDatabaseHas('charges', ['unit_id' => $unit->id, 'started_at' => '1992-01-11 11:00:00', 'finished_at' => null]);
    }

    /** @test */
    function it_can_stop_charging()
    {
        Carbon::setTestNow('1992-01-11 11:00:00');
        $unit   = factory(Unit::class)->create(['status' => UnitStatus::CHARGING]);
        $charge = factory(Charge::class)->create(['unit_id' => $unit->id]);

        $unit->stopCharging($charge);

        $this->assertEquals('1992-01-11 11:00:00', $unit->charges[0]->finished_at);
        $this->assertDatabaseHas('units', ['id' => $unit->id, 'status' => UnitStatus::AVAILABLE]);
        $this->assertDatabaseHas('charges', ['unit_id' => $unit->id, 'finished_at' => '1992-01-11 11:00:00']);
    }
}