import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('app.vue', () => {
  it('Deve criar uma conta', async () => {
    const wrapper = mount(App, {

    })

    const input = {
      name: 'Jonh Doe',
      email: 'john.doe@example.com',
      document: '97456321558',
      password: 'asdQWE123'
    }
    await wrapper.get('.input-name').setValue(input.name)
    await wrapper.get('.input-email').setValue(input.email)
    await wrapper.get('.input-document').setValue(input.document)
    await wrapper.get('.input-password').setValue(input.password)
    await wrapper.get('.button-signup').trigger('click')
    await sleep(200);
    expect(wrapper.get('.span-message').text()).toBe('success')
    expect(wrapper.get(".span-accountId").text()).toBeDefined()
  })
})
