import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../src/App.vue'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Send message into the void')
  })

  it('handles empty message correctly without crashing', () => {
    const wrapper = mount(App)
    // Check that the component renders without errors when message is empty
    expect(wrapper.vm.voidData.message).toBe('')
  })
})