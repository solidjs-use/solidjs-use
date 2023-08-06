import { runHook } from "@dream2023/cypress-ct-solid-js"
import { createSignal } from "solid-js"
import { useMax } from "."

describe("useMax", () => {
  it("should be defined", () => {
    expect(useMax).to.be.exist
  })

  it("should accept numbers", () => {
    runHook(() => {
      const v = useMax(50, 100)
      expect(v()).to.eq(100)
    })
  })

  it("should accept Signals", () => {
    runHook(() => {
      const [value1, setValue1] = createSignal(10)
      const [value2, setValue2] = createSignal(100)
      const [value3, setValue3] = createSignal(1000)

      const v = useMax(value1, value2, value3)
      expect(v()).to.eq(1000)

      setValue1(2000)
      expect(v()).to.eq(2000)

      setValue2(2001)
      expect(v()).to.eq(2001)

      setValue3(2002)
      expect(v()).to.eq(2002)
    })
  })

  it("should accept numbers and Signals", () => {
    runHook(() => {
      const value1 = 10
      const [value2, setValue2] = createSignal(100)

      const v = useMax(50, value1, value2)

      expect(v()).to.eq(100)

      setValue2(200)
      expect(v()).to.eq(200)
    })
  })

  it("should accept single arg", () => {
    runHook(() => {
      const v = useMax(50)
      expect(v()).to.eq(50)
    })
  })

  it("should accept zero arg", () => {
    runHook(() => {
      const v = useMax()
      expect(v()).to.eq(Number.NEGATIVE_INFINITY)
    })
  })
})
