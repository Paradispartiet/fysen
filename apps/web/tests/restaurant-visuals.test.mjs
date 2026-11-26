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
