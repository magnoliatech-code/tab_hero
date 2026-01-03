import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the Vite and React logos', () => {
    render(<App />)
    // App.tsx usually has "Vite + React" text
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument()
  })
})
