<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'avatar',
        'name',
        'email',
        'email_verified_at',
        'password',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function groups ()
    {
        return $this->belongsToMany(Group::class, 'group_users');
    }
    public static function getConversationsForSidebar(User $exceptUser)
    {
        $userId = $exceptUser->id;
        $query = User::select(['users.*', 'messages.message as last_message','messages.created_at
        as last_message date'])
        ->where('users.id', '!=', $userId)
        ->when(!$exceptUser->is_admin, function ($query) {
            $query->whereNull('users.blocked_at');
        })
        ->leftJoin('conversations', function($join) use ($userId) {
            $join->on('conversations.user_id1', '=', 'users.id')
                ->where('conversations.user_id2', '=', $userId)
                ->orWhere(function ($query) use ($userId) {
                    $query->on('conversations.user_id2', '=', 'users.id')
                          ->where('conversations.user_id1', '=', Auth::id());
                });
        })
        ->leftJoin('messages', 'messages.id','=', 'conversations.last_message_id')
        ->orderByRaw('IFNULL(users.blocked_at,1)')
        ->orderBy('messages.created_at', 'desc')
        ->orderBy('users.name')
        ;
        //dd($query->toSql());
        return $query->get();
    } 
}       