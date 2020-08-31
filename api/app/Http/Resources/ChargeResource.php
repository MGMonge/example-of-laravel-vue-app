<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChargeResource extends JsonResource
{
    /**
     * {@inheritDoc}
     */
    public function toArray($request)
    {
        return [
            'id'          => $this->resource->id,
            'started_at'  => $this->resource->started_at,
            'finished_at' => $this->resource->finished_at,
        ];
    }
}