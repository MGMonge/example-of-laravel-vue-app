<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Charge;
use App\Models\Unit;
use Faker\Generator as Faker;

$factory->define(Charge::class, function (Faker $faker) {
    return [
        'unit_id'     => factory(Unit::class),
        'started_at'  => $faker->dateTime,
        'finished_at' => $faker->dateTime,
    ];
});
