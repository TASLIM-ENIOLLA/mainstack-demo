import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/app/dashboard/@header';
import { useRouter } from 'next/navigation';

// ✅ Mock Next.js App Router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header component', () => {
  const push = jest.fn();

  beforeEach(() => {
    // reset mock router before each test
    (useRouter).mockReturnValue({
      push,
      pathname: '/',
    });
  });

  it('renders logo and navigation links', () => {
    render(<Header />);

    // SVG Logo
    const logo = screen.getByTestId('logo-svg');
    expect(logo).toBeInTheDocument();

    // Navigation Links
    const homeLink = screen.getByRole('link', { name: /home/i });
    const analyticsLink = screen.getByRole('link', { name: /analytics/i });
    const revenueLink = screen.getByRole('link', { name: /revenue/i });
    const crmLink = screen.getByRole('link', { name: /crm/i });
    const appsLink = screen.getByRole('link', { name: /apps/i });

    expect(homeLink).toBeInTheDocument();
    expect(analyticsLink).toBeInTheDocument();
    expect(revenueLink).toBeInTheDocument();
    expect(crmLink).toBeInTheDocument();
    expect(appsLink).toBeInTheDocument();
  });

  it('calls router.push when a link is clicked', async () => {
    render(<Header />);
    const user = userEvent.setup();

    const homeLink = screen.getByRole('link', { name: /home/i });
    await user.click(homeLink);

    expect(push).toHaveBeenCalled();
  });
});
