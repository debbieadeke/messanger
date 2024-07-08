<x-mail::message>
    Hello {{$user->name}},
    @if($user->blocked_at)
    Your account has been suspended. You are no longer able to login.
    @else
    Your account has been activated. You can now normally use the system.
    <x-mail::button url="{{route('login')}}">
        Click here to login
    </x-mail::button>
    @endif

    Thankyou, 
    {{config('app.name')}}
</x-mail::message>