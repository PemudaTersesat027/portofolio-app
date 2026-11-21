<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:2000'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'external_image_url' => ['nullable', 'url', 'max:255'],
            'version' => ['nullable', 'string', 'max:50'],
            'development_status' => ['required', Rule::in(['development', 'released'])],
            'source_type' => ['required', Rule::in(['open-source', 'closed-source'])],
            'sales_status' => ['required', Rule::in(['not-for-sale', 'pre-order', 'available', 'discontinued'])],
            'tags' => ['sometimes', 'array', 'max:12'],
            'tags.*' => ['string', 'max:50'],
            'price' => ['nullable', 'integer', 'min:0'],
            'preorder_price' => ['nullable', 'integer', 'min:0'],
            'preorder_deadline' => ['nullable', 'date'],
            'preorder_limit' => ['nullable', 'integer', 'min:1'],
            'preorder_sold' => ['sometimes', 'integer', 'min:0'],
            'purchase_url' => ['nullable', 'url', 'max:255'],
            'live_url' => ['nullable', 'url', 'max:255'],
            'trial_url' => ['nullable', 'url', 'max:255'],
            'github_url' => ['nullable', 'url', 'max:255'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
