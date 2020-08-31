<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = [
        'name',
        'status',
    ];

    public function startCharging(): void
    {
        $this->charges()->create(['started_at' => $this->freshTimestamp()]);

        $this->load('charges');

        $this->update(['status' => UnitStatus::CHARGING]);
    }

    public function stopCharging(Charge $charge): void
    {
        $charge->update(['finished_at' => $this->freshTimestamp()]);

        $this->load('charges');

        $this->update(['status' => UnitStatus::AVAILABLE]);
    }

    public function charges()
    {
        return $this->hasMany(Charge::class)->latest('started_at');
    }
}
