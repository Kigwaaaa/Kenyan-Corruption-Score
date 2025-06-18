import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BudgetAnalysis from '../BudgetAnalysis';

// Mock fetch
global.fetch = jest.fn();

// Mock data
const mockMinistries = [
  {
    id: 1,
    name: 'Ministry of Health',
    allocation: 1000000000,
    financialTracking: {
      efficiencyScore: 85,
      corruptionIndex: 0.15
    }
  },
  {
    id: 2,
    name: 'Ministry of Education',
    allocation: 2000000000,
    financialTracking: {
      efficiencyScore: 90,
      corruptionIndex: 0.10
    }
  }
];

describe('BudgetAnalysis Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    fetch.mockReset();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <BudgetAnalysis />
      </BrowserRouter>
    );
  };

  test('renders loading state initially', () => {
    renderComponent();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders error state when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  test('renders ministry data successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMinistries
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Ministry of Health')).toBeInTheDocument();
      expect(screen.getByText('Ministry of Education')).toBeInTheDocument();
    });

    // Check if budget allocations are displayed
    expect(screen.getByText(/1,000,000,000/)).toBeInTheDocument();
    expect(screen.getByText(/2,000,000,000/)).toBeInTheDocument();

    // Check if efficiency scores are displayed
    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('90%')).toBeInTheDocument();
  });

  test('retry button works when fetch fails', async () => {
    fetch
      .mockRejectedValueOnce(new Error('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMinistries
      });

    renderComponent();

    // Wait for error state
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });

    // Click retry button
    fireEvent.click(screen.getByText(/retry/i));

    // Wait for successful data load
    await waitFor(() => {
      expect(screen.getByText('Ministry of Health')).toBeInTheDocument();
    });
  });

  test('chart is rendered with correct data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMinistries
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Budget Analysis Dashboard')).toBeInTheDocument();
    });

    // Check if chart title is present
    expect(screen.getByText('Ministry Budget Analysis')).toBeInTheDocument();
  });
}); 