<?php

it('redirects visitors to setup until the portfolio profile exists', function () {
    $response = $this->get('/');

    $response->assertRedirect(route('setup.account', absolute: false));
});
