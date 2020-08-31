<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
{
    /**
     * {@inheritDoc}
     */
    public function toArray($request)
    {
        return [
            'id'       => $this->resource->id,
            'name'     => $this->resource->name,
            'address'  => $this->resource->address,
            'postcode' => $this->resource->postcode,
            'status'   => $this->resource->status,
            'charges'  => ChargeResource::collection($this->whenLoaded('charges')),
        ];
    }
}
