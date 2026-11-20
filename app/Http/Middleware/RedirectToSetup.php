<?php

namespace App\Http\Middleware;

use App\Models\PortfolioProfile;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToSetup
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (PortfolioProfile::completed()->exists()) {
            return $next($request);
        }

        if ($request->user() !== null) {
            return to_route('setup.identity');
        }

        if (User::query()->exists()) {
            return to_route('login');
        }

        return to_route('setup.account');
    }
}
