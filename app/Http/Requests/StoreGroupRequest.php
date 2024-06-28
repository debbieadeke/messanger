<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGroupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'user_ids' => ['nullable','array'],
            'user_ids.*' => ['integer','exists:users,id'],
            
        ];
    }
    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);
        $validated['owner_id'] = $this->user()->id;
        return $validated;
    }

}
