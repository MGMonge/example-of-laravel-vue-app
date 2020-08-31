<?php

use App\Models\Unit;
use App\Models\UnitStatus;
use App\Models\User;
use Illuminate\Database\Seeder;
use Laravel\Passport\Passport;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->createPassportClient();
        $this->createUser();
        $this->createUnits();
    }

    public function createPassportClient(): void
    {
        $client = Passport::client()->forceCreate([
            'name'                   => 'Password Grant Client',
            'secret'                 => 'VhH1dnupSxK0blYnReqOLittjZI4jWsbpkTbbV6E',
            'redirect'               => 'http://localhost',
            'personal_access_client' => true,
            'password_client'        => true,
            'revoked'                => false,
        ]);

        Passport::personalAccessClient()->forceCreate([
            'client_id' => $client->id,
        ]);
    }

    private function createUser(): void
    {
        factory(User::class)->create([
            'name'     => 'John Doe',
            'email'    => 'john.doe@example.fake',
            'password' => bcrypt('password'),
        ]);
    }

    private function createUnits(): void
    {
        Unit::create([
            'name'     => 'My App Office',
            'address'  => 'Discovery House',
            'postcode' => 'EC1Y 8QE',
            'status'   => UnitStatus::AVAILABLE,
        ]);

        Unit::create([
            'name'     => 'Horseferry Road',
            'address'  => 'Horseferry Road',
            'postcode' => 'SW1P 2AF',
            'status'   => UnitStatus::AVAILABLE,
        ]);

        Unit::create([
            'name'     => 'Tesco Kensington',
            'address'  => 'West Cromwell Road',
            'postcode' => 'W14 8PB',
            'status'   => UnitStatus::AVAILABLE,
        ]);

        Unit::create([
            'name'     => 'Putney Exchange Shopping Centre',
            'address'  => 'Claverton Down',
            'postcode' => 'BA 7PJ',
            'status'   => UnitStatus::AVAILABLE,
        ]);

        Unit::create([
            'name'     => 'University of Bath (East Car Park)',
            'address'  => 'Claverton Down',
            'postcode' => 'BA 7PJ',
            'status'   => UnitStatus::AVAILABLE,
        ]);
    }
}
