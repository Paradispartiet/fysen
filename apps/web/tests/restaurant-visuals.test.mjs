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

test('Ullevål requires its own branch address and leaves interior pending', () => {
  const make = (address) => restaurantVisuals({ name: 'Egon Ullevål', address });
  const visuals = make('Sognsveien 77c, 0855 Oslo');
  assert.ok(visuals);
  assert.match(visuals.exterior, /egon-ullevaal/u);
  assert.equal(visuals.interior, null);
  assert.deepEqual(make('Sognsveien 77 C, 0855 Oslo'), visuals);
  assert.equal(make('Sognsveien 77'), null);
  assert.equal(make('Sognsveien 77D'), null);
  assert.equal(make('Sognsveien 770C'), null);
});

test('Ensjø photo keeps attribution and rejects other branches', () => {
  const photo = restaurantVisuals({name: 'Peppes Pizza - Ensjø', address: 'Rolf Hofmos gate 34, 0655 Oslo'});
  assert.ok(photo);
  assert.equal(photo.photoCredit, 'Kjetil Ree');
  assert.equal(photo.photoDate, '2017-10-08');
  assert.equal(photo.interior, null);
  assert.equal(restaurantVisuals({name: 'Peppes Pizza - Ensjø', address: 'Rolf Hofmos gate 340'}), null);
});

test('Stortingsgata photo stays on its own branch with credit', () => {
 const make = (address) => restaurantVisuals({name: 'Peppes Pizza Stortingsgata', address});
 const photo = make('Stortingsgata 4, 0158 Oslo');
 assert.ok(photo);
 assert.equal(photo.photoCredit, 'Kjetil Ree');
 assert.equal(photo.photoDate, '2017-01-08');
 assert.match(photo.exterior, /peppes-stortingsgata/u);
 assert.equal(make('Stortingsgata 40'), null);
 assert.equal(make('Rolf Hofmos gate 34'), null);
});

test('Lorry photo retains its own year and license', () => {
 const p = restaurantVisuals({name:'Lorry Restaurant', address:'Parkveien 12, 0350 Oslo'});
 assert.ok(p);
 assert.equal(p.photoCredit, 'Helge Høifødt');
 assert.equal(p.photoDate, '2020-04-22');
 assert.match(p.licenseUrl, /4\.0/u);
 assert.equal(restaurantVisuals({name:'Lorry Restaurant',address:'Parkveien 120'}),null);
});
