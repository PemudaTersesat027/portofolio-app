<?php

test('registration screen redirects to the setup flow', function () {
    $response = $this->get('/register');

    $response->assertRedirect(route('setup.account', absolute: false));
});

test('new users are created through the setup flow', function () {
    $response = $this->post(route('setup.account'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    $response->assertRedirect(route('setup.identity', absolute: false));
});
