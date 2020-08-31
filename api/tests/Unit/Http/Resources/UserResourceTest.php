<?php

namespace Tests\User\Http\Resources;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserResourceTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    function it_presents_a_user_resource()
    {
        $user = factory(User::class)->make();

        $actual = UserResource::make($user)->toJson();

        $this->assertEquals(json_encode([
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
        ]), $actual);
    }
}