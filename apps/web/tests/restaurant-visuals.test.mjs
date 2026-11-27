import assert from 'node:assert/strict';
import test from 'node:test';
import { restaurantVisuals } from '../lib/restaurant-visuals.ts';

test('art follows the actual branch and address, independent of archive/live IDs', () => {
  const branch = { name: 'Egon Byporten', address: 'Jernbanetorget 6, 0154 Oslo' };
  assert.ok(restaurantVisuals(branch));
  assert.deepEqual(restaurantVisuals({ ...branch, id: 'live-uuid' }), restaurantVisuals(branch));
  assert.equal(restaurantVisuals({ ...branch, name: 'Egon Karl Johan' }), null);
  assert.equal(restaurantVisuals({ ...branch, address: 'Jernbanetorget 60' }), null);
  assert.equal(restaurantVisuals({ ...branch, address: 'Other address' }), null);
  assert.equal(restaurantVisuals({ name: 'Chilango Løren', address: 'Lørenveien 40' }), null);
});

test('Karl Johan gets its own scenes and shares only the official chain logo', () => {
  const branch = { name: 'Egon Karl Johan', address: 'Karl Johans gate 37, 0162 Oslo' };
  const visuals = restaurantVisuals(branch);
  const byporten = restaurantVisuals({ name: 'Egon Byporten', address: 'Jernbanetorget 6' });
  assert.ok(visuals && byporten);
  assert.notEqual(visuals.exterior, byporten.exterior);
  assert.notEqual(visuals.interior, byporten.interior);
  assert.equal(visuals.logo, byporten.logo);
  assert.deepEqual(restaurantVisuals({ ...branch, id: 'live-uuid' }), visuals);
  assert.equal(restaurantVisuals({ ...branch, address: 'Karl Johans gate 370' }), null);
  assert.equal(restaurantVisuals({ ...branch, address: 'Jernbanetorget 6' }), null);
});

test('Nordstrand matches both address spellings and never borrows another interior', () => {
  const make = (address) => restaurantVisuals({ name: 'Egon Nordstrand', address });
  const visuals = make('Ekebergveien 228 B, 1162 Oslo');
  assert.ok(visuals);
  assert.deepEqual(make('Ekebergveien 228B, 1162 Oslo'), visuals);
  assert.equal(visuals.interior, null);
  assert.match(visuals.exterior, /egon-nordstrand/u);
  assert.equal(make('Ekebergveien 228'), null);
  assert.equal(make('Ekebergveien 228C'), null);
  assert.equal(make('Ekebergveien 2280B'), null);
  assert.equal(make('Jernbanetorget 6'), null);
});

test('Storo scenes require the correct branch and street address', () => {
  const make = (address) => restaurantVisuals({ name: 'Egon Storo', address });
  const visuals = make('Vitaminveien 9-11, 0485 Oslo');
  assert.ok(visuals);
  assert.match(visuals.exterior, /egon-storo/u);
  assert.match(visuals.interior, /egon-storo/u);
  assert.deepEqual(make('Vitaminveien 9–11 0485 Oslo'), visuals);
  assert.equal(make('Vitaminveien 9-110'), null);
  assert.equal(make('Jernbanetorget 6'), null);
});
