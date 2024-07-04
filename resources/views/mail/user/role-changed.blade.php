<x-mail::message>
    Hello {{$user->name}},
    @if($user->is_admin)
    You are now admin in the system. You can add and block users.
    @else
    Your role was changed into regular user. You are no longer able to add or block users.
    @endif
    <br>

    Thankyou, <br>
    {{config('app.name')}}
</x-mail::message>