@component('mail::message')
# Your file is converted to .mp3

Your file {{ $upload }} is converted as {{ $download }}.<br/>
You can download the file / view conversion history in the system.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
