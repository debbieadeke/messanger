<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\Conversation;
use Database\Factories\UserFactory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;


class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => Auth::id() ? new UserResource($request->user()) :null,
            ],
            'conversations' => Auth::check() ? Conversation::getConversationsForSidebar(Auth::user()) : [],
        ];
    }
}