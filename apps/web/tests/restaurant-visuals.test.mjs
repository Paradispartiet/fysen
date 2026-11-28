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

test('Karl Johan retains its identity and official chain logo with scenes withheld', () => {
  const branch = { name: 'Egon Karl Johan', address: 'Karl Johans gate 37, 0162 Oslo' };
  const visuals = restaurantVisuals(branch);
  const byporten = restaurantVisuals({ name: 'Egon Byporten', address: 'Jernbanetorget 6' });
  assert.ok(visuals && byporten);
  assert.equal(visuals.exterior, null);
  assert.equal(byporten.exterior, null);
  assert.equal(visuals.interior, null);
  assert.equal(byporten.interior, null);
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
  assert.equal(visuals.exterior, null);
  assert.equal(make('Ekebergveien 228'), null);
  assert.equal(make('Ekebergveien 228C'), null);
  assert.equal(make('Ekebergveien 2280B'), null);
  assert.equal(make('Jernbanetorget 6'), null);
});

test('Storo scenes require the correct branch and street address', () => {
  const make = (address) => restaurantVisuals({ name: 'Egon Storo', address });
  const visuals = make('Vitaminveien 9-11, 0485 Oslo');
  assert.ok(visuals);
  assert.equal(visuals.exterior, null);
  assert.equal(visuals.interior, null);
  assert.deepEqual(make('Vitaminveien 9–11 0485 Oslo'), visuals);
  assert.equal(make('Vitaminveien 9-110'), null);
  assert.equal(make('Jernbanetorget 6'), null);
});

test('Ullevål requires its own branch address and leaves interior pending', () => {
  const make = (address) => restaurantVisuals({ name: 'Egon Ullevål', address });
  const visuals = make('Sognsveien 77c, 0855 Oslo');
  assert.ok(visuals);
  assert.equal(visuals.exterior, null);
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

test('batch photos preserve branch boundaries, date and license', () => {
 for (const [name,address,date,license] of [
 ["Restaurant Schrøder","Waldemar Thranes gate 8","2007-06-09","publicdomain"],
 ["Palmyra Café","Norbygata 15A","2017-02-12","3.0"],
 ["D/S Louise","Stranden 3","2008-03-09","2.0"]
 ]) {
 const photo = restaurantVisuals({name,address});
 assert.ok(photo);
 assert.equal(photo.photoDate,date);
 assert.ok(photo.licenseUrl.includes(license));
 assert.equal(restaurantVisuals({name,address:address+"0"}),null);
 assert.equal(restaurantVisuals({name,address:"Other street 3"}),null);
 }
});

test('Schrøder interior carries separate date, source and license', () => {
 const p = restaurantVisuals({name:'Restaurant Schrøder',address:'Waldemar Thranes gate 8'});
 assert.match(p.interior, /schroder\/interior\.jpg/u);
 assert.equal(p.interiorPhoto.photoDate,'2016-01-22');
 assert.equal(p.interiorPhoto.photoCredit,'Helge Høifødt');
 assert.ok(p.interiorPhoto.sourceUrl.includes('Youngstorget'));
 assert.ok(p.interiorPhoto.licenseUrl.includes('/4.0/'));
 assert.notEqual(p.interiorPhoto.licenseUrl,p.licenseUrl);
 assert.equal(p.photoDate,'2007-06-09');
});

test('official chain logo is shared while branch photos remain distinct', () => {
 const a=restaurantVisuals({name:'Peppes Pizza - Ensjø',address:'Rolf Hofmos gate 34'});
 const b=restaurantVisuals({name:'Peppes Pizza Stortingsgata',address:'Stortingsgata 4'});
 assert.equal(a.logo,'/restaurants/peppes/logo.svg');
 assert.equal(a.logo,b.logo);
 assert.notEqual(a.exterior,b.exterior);
 assert.equal(restaurantVisuals({name:'D/S Louise',address:'Stranden 3'}).logo,'/restaurants/louise/logo.svg');
});

test('Lorry retains its photo and logo while inaccurate illustration is withheld', () => {
 const p = restaurantVisuals({name:'Lorry Restaurant',address:'Parkveien 12'});
 assert.equal(p.interior,null);
 assert.equal(p.interiorIllustrationSource,'https://lorry.no/');
 assert.equal('interiorPhoto' in p,false);
 assert.equal(p.photoDate,'2020-04-22');
 assert.equal(p.logo,'/restaurants/lorry/logo.png');
});

test('Kaffistova uses its official identity and verified building or entrance address', () => {
 const make=address=>restaurantVisuals({name:'Kaffistova',address});
 const p=make("Rosenkrantz' gate 8, 0159 Oslo");
 assert.ok(p);
 assert.equal(p.exterior,null);
 assert.equal(p.logo,'/restaurants/kaffistova/logo.png');
 assert.equal(p.interior,null);
 assert.deepEqual(make('Kristian IVs gate 2'),p);
 assert.equal(make("Rosenkrantz' gate 80"),null);
 assert.equal(make('Kristian IVs gate 20'),null);
});

test('all eight Egon illustrations remain withheld after accuracy review', () => {
 for (const [name,address] of [
 ['Egon Byporten','Jernbanetorget 6'],
 ['Egon Karl Johan','Karl Johans gate 37'],
 ['Egon Nordstrand','Ekebergveien 228B'],
 ['Egon Storo','Vitaminveien 9-11'],
 ['Egon Ullevål','Sognsveien 77c'],
 ]) {
 const p=restaurantVisuals({name,address});
 assert.ok(p);
 assert.equal(p.exterior,null);
 assert.equal(p.interior,null);
 assert.equal(p.logo,'/restaurants/egon-byporten/logo.svg');
 }
});
