import { runHook } from "@dream2023/cypress-ct-solid-js"
import { createSignal } from "solid-js"
import { useToNumber } from "."

describe("useToNumber", () => {
  it("default", () => {
    runHook(() => {
      const [value, setValue] = createSignal<string | number>("123.345")
      const float = useToNumber(value)
      const int = useToNumber(value, { method: "parseInt" })

      expect(float()).to.eq(123.345)
      expect(int()).to.eq(123)

      setValue("hi")

      expect(float()).to.is.NaN
      expect(int()).to.is.NaN

      setValue(123.4)

      expect(float()).to.eq(123.4)
      expect(int()).to.eq(123.4)

      setValue("-43.53")

      expect(float()).to.eq(-43.53)
      expect(int()).to.eq(-43)
    })
  })

  it("radix", () => {
    runHook(() => {
      const [value] = createSignal<string | number>("0xFA")
      const int = useToNumber(value, { method: "parseInt", radix: 16 })

      expect(int()).to.eq(250)
    })
  })

  it("nanToZero", () => {
    runHook(() => {
      const [value] = createSignal<string | number>("Hi")
      const float = useToNumber(value, { nanToZero: true })
      expect(float()).to.eq(0)
    })
  })
})
