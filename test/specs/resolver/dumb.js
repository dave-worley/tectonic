'use strict';

import { assert } from 'chai';
import Manager from '/src/manager';
import DumbResolver from '/src/resolver/dumbResolver.js';
import Query from '/src/query';
import SourceDefinition from '/src/sources/definition.js';
import Returns, {
  RETURNS_ITEM,
  RETURNS_ALL_FIELDS
} from '/src/sources/returns.js';
import { User, Post } from '/test/models.js';

describe('dumbResolver', () => {
  const query = User.getItem({ id: 1 });

  describe('definitionsByModel', () => {
    it('adds a single sourceDefinition return to definitionsByModel', () => {
      const r = new DumbResolver();
      const def = new SourceDefinition({
        id: 'somedef',
        returns: User.item(),
        meta: {}
      });
      r.onAddDefinition(def);

      const { definitionsByModel: defs } = r;

      assert.isDefined(defs);
      assert.equal(defs.size, 1);
      const userDefs = defs.get(User);
      assert.equal(userDefs.length, 1);
      assert.equal(userDefs[0], def.id);
    });

    it('adds multiple sourceDefinitions to definitionsByModel', () => {
      const r = new DumbResolver();
      const def = new SourceDefinition({
        id: 'somedef',
        returns: {
          user: User.item(),
          list: Post.list()
        },
        meta: {}
      });
      r.onAddDefinition(def);

      const { definitionsByModel: defs } = r;
      // ensure it has one entry - User
      assert.equal(defs.size, 2);

      const userDefs = defs.get(User);
      assert.equal(userDefs.length, 1);
      assert.equal(userDefs[0], def.id);

      const postDefs = defs.get(Post);
      assert.equal(postDefs.length, 1);
      assert.equal(postDefs[0], def.id);
    });
  });

  it('adds queries to unresolvedQueries', () => {
    const r = new DumbResolver();
    r.addQuery(query);
    assert.equal(r.unresolvedQueries.length, 1);
    assert.equal(r.unresolvedQueries[0], query);
  });

  describe('resolving', () => {
    const def = new SourceDefinition({
      id: 'somedef',
      returns: User.item(),
      meta: {}
    });

    // Warns for unresolved queries
    // it tests 

    const r = new DumbResolver();
    r.addQuery(query);
    r.onAddDefinition(
  });

});
