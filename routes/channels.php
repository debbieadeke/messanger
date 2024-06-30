<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;

Broadcast::channel('online', function ($user) {
    return $user? new UserResource($user) : null;
});

Broadcast::channel('message.user.{userId}-{userId2}', function (User $user, int $userId1,
int $userId2) {
    return $user->id === $userId1 || $user->id === $userId2 ? $user : null;
});

Broadcast::channel('message.group.{groupId}', function (User $user, int $groupId) {
    return $user->groups->contains($groupId) ? $user : null;
});


Broadcast::channel('group.deleted.{groupId}', function (User $user, int $groupId) {
    return $user->groups->contains($groupId);
});