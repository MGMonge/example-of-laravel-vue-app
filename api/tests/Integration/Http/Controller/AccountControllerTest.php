<?php

namespace Tests\Integration\Http\Controller;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccountControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function guests_cannot_see_account_details()
    {
        $response = $this->json('GET', route('accounts.show'));

        $response->assertUnauthorized();
    }

    /** @test */
    function users_can_see_their_account_details()
    {
        $user = factory(User::class)->create();
        $this->actingAs($user, 'api');

        $response = $this->json('GET', route('accounts.show'));

        $response->assertOk();
        $response->assertExactJson([
            'data' => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ]
        ]);
    }
}