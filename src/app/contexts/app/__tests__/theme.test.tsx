import { act, renderHook } from '@testing-library/react-hooks'

import { useTheme } from 'app/contexts/app/theme'

test('allows you to toggle theme light/dark', () => {
  const { result } = renderHook(() => useTheme())

  // assert initial state
  expect(result.current.theme).toBe('light')

  // change value & assert after the value has been changed
  act(() => {
    result.current.setDark()
  })
  expect(result.current.theme).toBe('dark')

  act(() => {
    result.current.setLight()
  })
  expect(result.current.theme).toBe('light')

  act(() => {
    result.current.toggle()
  })
  expect(result.current.theme).toBe('dark')
})