<?php

namespace Tests\Integration\Http\Controller;

use App\Models\Charge;
use App\Models\Unit;
use App\Models\UnitStatus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UnitControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function guests_cannot_see_the_list_of_units()
    {
        $response = $this->json('GET', route('units.index'));

        $response->assertUnauthorized();
    }

    /** @test */
    function it_returns_an_empty_array_when_there_is_not_units()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.index'));

        $response->assertOk();
        $response->assertJsonCount(0, 'data');
        $response->assertJson(['data' => []]);
    }

    /** @test */
    function list_of_units_with_single_unit()
    {
        $user = factory(User::class)->create();
        $unit = factory(Unit::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.index'));

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertExactJson([
            'data' => [
                [
                    'id'       => $unit->id,
                    'name'     => $unit->name,
                    'address'  => $unit->address,
                    'postcode' => $unit->postcode,
                    'status'   => UnitStatus::AVAILABLE,
                    'charges'  => [],
                ]
            ]
        ]);
    }

    /** @test */
    function list_of_units_with_multiple_units()
    {
        $user  = factory(User::class)->create();
        $units = factory(Unit::class, 2)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.index'));

        $response->assertOk();
        $response->assertJsonCount(2, 'data');
        $response->assertExactJson([
            'data' => [
                [
                    'id'       => $units[0]->id,
                    'name'     => $units[0]->name,
                    'address'  => $units[0]->address,
                    'postcode' => $units[0]->postcode,
                    'status'   => UnitStatus::AVAILABLE,
                    'charges'  => [],
                ],
                [
                    'id'       => $units[1]->id,
                    'name'     => $units[1]->name,
                    'address'  => $units[1]->address,
                    'postcode' => $units[1]->postcode,
                    'status'   => UnitStatus::AVAILABLE,
                    'charges'  => [],
                ],
            ]
        ]);
    }

    /** @test */
    function guests_cannot_see_specific_unit_details()
    {
        $unit = factory(Unit::class)->create();

        $response = $this->json('GET', route('units.show', [$unit]));

        $response->assertUnauthorized();
    }

    /** @test */
    function it_responds_404_when_unit_is_not_found()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.show', 'NON_EXISTING_ID'));

        $response->assertNotFound();
    }

    /** @test */
    function it_shows_specific_single_unit_details()
    {
        $user = factory(User::class)->create();
        $unit = factory(Unit::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.show', [$unit]));

        $response->assertOk();
        $response->assertExactJson([
            'data' => [
                'id'       => $unit->id,
                'name'     => $unit->name,
                'address'  => $unit->address,
                'postcode' => $unit->postcode,
                'status'   => UnitStatus::AVAILABLE,
                'charges'  => [],
            ]
        ]);
    }

    /** @test */
    function it_shows_specific_single_unit_details_with_charges()
    {
        $user   = factory(User::class)->create();
        $unit   = factory(Unit::class)->create();
        $charge = factory(Charge::class)->create(['unit_id' => $unit->id]);
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('units.show', [$unit]));

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
                        'finished_at' => $charge->finished_at,
                    ]
                ]
            ]
        ]);
    }
}