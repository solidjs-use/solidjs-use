import { useMemoize } from '.'
import type { UseMemoizeCache } from '.'

describe('useMemoize', () => {
  let resolver: Cypress.Agent<sinon.SinonSpy>

  beforeEach(() => {
    resolver = cy.spy((arg1: number) => `result-${arg1}`)
  })

  it('should be defined', () => {
    expect(useMemoize).to.be.exist
  })

  describe('get', () => {
    it('should load and cache data on get', () => {
      const memo = useMemoize(resolver)

      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(1)
      expect(resolver).to.be.calledWith(1)

      resolver.resetHistory()
      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).not.to.have.been.called
    })

    it('should load and cache data with different keys', () => {
      const memo = useMemoize(resolver)

      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(1)
      expect(resolver).to.have.been.calledWith(1)
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).to.be.callCount(2)
      expect(resolver).to.have.been.calledWith(2)

      resolver.resetHistory()
      expect(memo(1)).to.be.eq('result-1')
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).not.to.have.been.called
    })

    it('should cache without arguments', () => {
      const _resolver = cy.spy(() => 'result')
      const memo = useMemoize(_resolver)

      expect(memo()).to.be.eq('result')
      expect(memo()).to.be.eq('result')
      expect(_resolver).to.be.callCount(1)
    })

    it('should cache with multiple arguments', () => {
      const _resolver = cy.spy((arg1: number, arg2: number) => `result-${arg1}-${arg2}`)
      const memo = useMemoize(_resolver)

      expect(memo(1, 1)).to.be.eq('result-1-1')
      expect(_resolver).to.be.callCount(1)
      expect(_resolver).to.have.been.calledWith(1, 1)
      expect(memo(1, 2)).to.be.eq('result-1-2')
      expect(_resolver).to.be.callCount(2)
      expect(_resolver).to.have.been.calledWith(1, 2)

      _resolver.resetHistory()
      expect(memo(1, 1)).to.be.eq('result-1-1')
      expect(memo(1, 2)).to.be.eq('result-1-2')
      expect(_resolver).not.to.have.been.called
    })
  })

  describe('load', () => {
    it('should always call resolver on load', () => {
      const memo = useMemoize(resolver)

      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(1)
      expect(resolver).to.have.been.calledWith(1)
      expect(memo.load(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(2)
      expect(resolver).to.have.been.calledWith(1)

      resolver.resetHistory()
      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).not.to.have.been.called
    })
  })

  describe('delete', () => {
    it('should delete key from cache', () => {
      const memo = useMemoize(resolver)

      expect(memo(1)).to.be.eq('result-1')
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).to.be.callCount(2)

      resolver.resetHistory()
      memo.delete(1)

      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(1)
      expect(resolver).calledWith(1)

      resolver.resetHistory()
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).not.to.have.been.called
    })
  })

  describe('clear', () => {
    it('should clear all keys from cache', () => {
      const memo = useMemoize(resolver)

      expect(memo(1)).to.be.eq('result-1')
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).to.be.callCount(2)

      resolver.resetHistory()
      memo.clear()

      expect(memo(1)).to.be.eq('result-1')
      expect(resolver).to.be.callCount(1)
      expect(resolver).calledWith(1)
      expect(memo(2)).to.be.eq('result-2')
      expect(resolver).to.be.callCount(2)
      expect(resolver).calledWith(2)
    })
  })

  describe('options', () => {
    describe('getKey', () => {
      it('should use custom key', () => {
        const getKey = cy.spy((arg1: number) => arg1 % 2) as any
        const memo = useMemoize(resolver, { getKey })

        expect(memo(1)).to.be.eq('result-1')
        expect(resolver).to.be.callCount(1)
        expect(resolver).calledWith(1)
        expect(memo(2)).to.be.eq('result-2')
        expect(resolver).to.be.callCount(2)
        expect(resolver).calledWith(2)

        resolver.resetHistory()
        expect(memo(3)).to.be.eq('result-1')
        expect(memo('4')).to.be.eq('result-2')
        expect(resolver).not.to.have.been.called
      })
    })

    describe('cache', () => {
      let cache: UseMemoizeCache<string, string>
      const serializedKey = JSON.stringify([1])

      beforeEach(() => {
        cache = {
          get: cy.spy((key: any) => key),
          set: cy.spy(),
          has: cy.spy(() => true),
          delete: cy.spy(),
          clear: cy.spy()
        }
      })

      it('should use given cache on get', () => {
        const memo = useMemoize(resolver, { cache })

        expect(memo(1)).to.be.eq(serializedKey)
        expect(cache.get).to.be.callCount(1)
        expect(cache.get).to.be.calledWith(serializedKey)
        expect(cache.has).to.be.callCount(1)
        expect(cache.has).to.be.calledWith(serializedKey)

        expect(cache.set).not.to.have.been.called
      })

      it('should use given cache on load', () => {
        const memo = useMemoize(resolver, { cache })

        expect(memo.load(1)).to.be.eq(serializedKey)
        expect(cache.set).to.be.callCount(1)
        expect(cache.set).to.be.calledWith(serializedKey, 'result-1')
        expect(cache.get).to.be.callCount(1)
        expect(cache.get).to.be.calledWith(serializedKey)
      })

      it('should use given cache on delete', () => {
        const memo = useMemoize(resolver, { cache })

        memo.delete(1)
        expect(cache.delete).to.be.callCount(1)
        expect(cache.delete).to.be.calledWith(serializedKey)
      })

      it('should use given cache on clear', () => {
        const memo = useMemoize(resolver, { cache })

        memo.clear()
        expect(cache.clear).to.be.callCount(1)
      })
    })
  })
})
