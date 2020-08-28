import { render, screen } from '@testing-library/react'

import Login from '.'

describe('<Login/>', () => {
  it('should render the heading', () => {
    const { container } = render(<Login />)

    expect(
      screen.getByRole('heading', { name: /dragons lair/i })
    ).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the colors correctly', () => {
    const { container } = render(<Login />)

    expect(container.firstChild).toHaveStyle({ 'background-color': '#475963' })
  })
})
