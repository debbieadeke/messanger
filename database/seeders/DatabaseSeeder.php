<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true
        ]);

        // Create a regular user
        User::factory()->create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create additional users
        User::factory(10)->create();

        // Create groups and attach users
        for ($i = 0; $i < 5; $i++) {
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);
            $users = User::inRandomOrder()->limit(rand(2, 5))->pluck('id')->toArray();
            $group->users()->attach(array_unique([1, ...$users]));
        }

        // Create messages
        Message::factory(1000)->create();

        // Group messages and create conversations
        $messages = Message::whereNull('group_id')->orderBy('created_at')->get();
        $conversations = $messages->groupBy(function ($message) {
            return collect([$message->sender_id, $message->receiver_id])->sort()->implode('_');
        })->map(function ($groupedMessages) {
            return [
                'user_id1' => $groupedMessages->first()->sender_id,
                'user_id2' => $groupedMessages->first()->receiver_id,
                'last_message_id' => $groupedMessages->last()->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        })->values();

        // Insert conversations
        Conversation::insertOrIgnore($conversations->toArray());
    }
}
