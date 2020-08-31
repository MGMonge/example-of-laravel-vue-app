<?php

namespace Tests\Integration\Http\Controller;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function required_fields_when_login()
    {
        $response = $this->json('POST', route('tokens.create'), []);

        $response->assertJsonValidationErrors(['email', 'password']);
    }

    /** @test */
    function email_must_be_valid_when_login()
    {
        $response = $this->json('POST', route('tokens.create'), [
            'email' => 'foobar',
        ]);

        $response->assertJsonValidationErrors(['email']);
    }

    /** @test */
    function credentials_must_be_valid()
    {
        $this->artisan('passport:client', ['--personal' => true, '--name' => 'Personal Access Client for Testing']);
        $user = factory(User::class)->create();

        $response = $this->json('POST', route('tokens.create'), [
            'email'    => $user->email,
            'password' => 'invalid-password',
        ]);

        $response->assertJsonValidationErrors('email');
    }

    /** @test */
    function users_can_login()
    {
        $this->artisan('passport:client', ['--personal' => true, '--name' => 'Personal Access Client for Testing']);
        $user = factory(User::class)->create();

        $response = $this->json('POST', route('tokens.create'), [
            'email'    => $user->email,
            'password' => 'password',
        ]);

        $response->assertOk();
        $this->assertNotNull($response->json('token'));
        $response->assertExactJson([
            'data'  => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
            ],
            'token' => $response->json('token'),
        ]);
    }

    /** @test */
    function guests_cannot_logout()
    {
        $response = $this->json('DELETE', route('tokens.destroy'));

        $response->assertUnauthorized();
    }

    /** @test */
    function users_can_logout()
    {
        $this->artisan('passport:client', ['--personal' => true, '--name' => 'Personal Access Client for Testing']);
        $user  = factory(User::class)->create();
        $token = $user->createToken('my-app-token');

        $response = $this->json('DELETE', route('tokens.destroy'), [], ['Authorization' => 'Bearer ' . $token->accessToken]);

        $response->assertNoContent();
        $this->assertDatabaseHas('oauth_access_tokens', ['id' => $token->token->id, 'revoked' => true]);
    }
}