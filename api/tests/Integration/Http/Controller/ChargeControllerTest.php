<?php

namespace Tests\Integration\Http\Controller;

use App\Models\Charge;
use App\Models\Unit;
use App\Models\UnitStatus;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChargeControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function guests_cannot_start_a_charge()
    {
        $unit = factory(Unit::class)->create();

        $response = $this->json('POST', route('units.charges.store', [$unit]));

        $response->assertUnauthorized();
    }

    /** @test */
    function users_cannot_charge_from_a_unit_that_does_not_exist()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('POST', route('units.charges.store', ['NON_EXISTING_ID']));

        $response->assertNotFound();
    }

    /** @test */
    function users_can_start_a_charge()
    {
        Carbon::setTestNow('1992-01-11 11:00:00');
        $user = factory(User::class)->create();
        $unit = factory(Unit::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('POST', route('units.charges.store', [$unit]));

        $response->assertOk();
        $newCharge = Charge::where(['unit_id' => $unit->id, 'started_at' => '1992-01-11 11:00:00', 'finished_at' => null])->first();
        $response->assertExactJson([
            'data' => [
                'id'       => $unit->id,
                'name'     => $unit->name,
                'address'  => $unit->address,
                'postcode' => $unit->postcode,
                'status'   => UnitStatus::CHARGING,
                'charges'  => [
                    [
                        'id'          => $newCharge->id,
                        'started_at'  => $newCharge->started_at,
                        'finished_at' => $newCharge->finished_at,
                    ]
                ]
            ]
        ]);
        $this->assertDatabaseHas('units', ['status' => UnitStatus::CHARGING]);
    }

    /** @test */
    function guests_cannot_stop_charges()
    {
        $unit   = factory(Unit::class)->create();
        $charge = factory(Charge::class)->create();
        factory(Charge::class)->create(['unit_id' => $unit->id]);

        $response = $this->json('PATCH', route('units.charges.update', [$unit, $charge]));

        $response->assertUnauthorized();
    }

    /** @test */
    function users_cannot_stop_a_non_existing_charge()
    {
        $unit = factory(Unit::class)->create();
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('PATCH', route('units.charges.update', [$unit, 'NON_EXISTING_ID']));

        $response->assertNotFound();
    }

    /** @test */
    function users_cannot_stop_a_charge_from_a_unit_that_does_not_exist()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('PATCH', route('units.charges.update', ['NON_EXISTING_ID', 'NON_EXISTING_ID']));

        $response->assertNotFound();
    }

    /** @test */
    function users_cannot_stop_charge_not_found_in_given_unit()
    {
        $user   = factory(User::class)->create();
        $unit   = factory(Unit::class)->create();
        $charge = factory(Charge::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('PATCH', route('units.charges.update', [$unit, $charge]));

        $response->assertNotFound();
    }

    /** @test */
    function users_can_stop_a_charge()
    {
        Carbon::setTestNow('1992-01-11 23:59:59');
        $user   = factory(User::class)->create();
        $unit   = factory(Unit::class)->create();
        $charge = factory(Charge::class)->create(['unit_id' => $unit->id]);
        $this->actingAs($user, 'api');

        $response = $this->json('PATCH', route('units.charges.update', [$unit, $charge]));

        $response->assertOk();
        $response->assertExactJson([
            'data' => [
                'id'       => $unit->id,
                'name'     => $unit->name,
                'address'  => $unit->address,
                'postcode' => $unit->postcode,
                'status'   => UnitStatus::AVAILABLE,
                'charges'  => [
                    [
                        'id'          => $charge->id,
                        'started_at'  => $charge->started_at,
                        'finished_at' => $charge->fresh()->finished_at,
                    ]
                ]
            ]
        ]);
        $this->assertDatabaseHas('charges', ['id' => $charge->id, 'finished_at' => '1992-01-11 23:59:59']);
    }
}