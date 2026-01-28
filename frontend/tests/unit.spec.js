import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import App from '../src/App.vue'
import axios from 'axios'

// Mock the axios module
vi.mock('axios')

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('renders properly', () => {
    // Mock the API response for the initial data fetch
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-01-01T00:00:00Z'
      }
    });

    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Send message into the void')
  })

  it('handles empty message correctly without crashing', async () => {
    // Mock the API response for the initial data fetch
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-01-01T00:00:00Z'
      }
    });

    const wrapper = mount(App)
    await flushPromises(); // Wait for async operations to complete

    // Check that the component renders without errors when message is empty
    expect(wrapper.vm.voidData.message).toBe('')
  })

  it('fetches void stats on mount', async () => {
    const mockStats = {
      message: '',
      count: 5,
      timestamp: '2023-01-01T00:00:00Z'
    };

    axios.get.mockResolvedValue({ data: mockStats });

    const wrapper = mount(App);
    await flushPromises(); // Wait for async operations to complete

    expect(axios.get).toHaveBeenCalledWith('/api/void');
    expect(wrapper.vm.voidData).toEqual(mockStats);
  })

  it('sends message when button is clicked', async () => {
    const mockResponse = {
      message: '',
      count: 1,
      timestamp: '2023-01-01T00:00:01Z'
    };

    // Mock both the initial fetch and the post request
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-01-01T00:00:00Z'
      }
    });
    axios.post.mockResolvedValue({ data: mockResponse });

    const wrapper = mount(App);
    await flushPromises(); // Wait for initial data fetch

    const button = wrapper.find('button');
    await button.trigger('click');
    await flushPromises(); // Wait for the post request to complete

    expect(axios.post).toHaveBeenCalledWith('/api/void');
    expect(wrapper.vm.voidData).toEqual(mockResponse);
  })

  it('shows loading state when sending message', async () => {
    // Create a promise that won't resolve immediately to simulate loading
    const promise = new Promise(() => {});
    axios.post.mockReturnValue(promise);

    // Also mock the initial get request
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-01-01T00:00:00Z'
      }
    });

    const wrapper = mount(App);
    await flushPromises(); // Wait for initial data fetch

    const button = wrapper.find('button');
    await button.trigger('click');

    expect(wrapper.vm.loading).toBe(true);
  })

  it('formats dates correctly', async () => {
    // Mock the initial data fetch
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-06-15T14:30:00Z'
      }
    });

    const wrapper = mount(App);
    await flushPromises(); // Wait for async operations to complete

    const dateString = '2023-06-15T14:30:00Z';
    const formatted = wrapper.vm.formatDate(dateString);

    // The exact format depends on the system's locale, but it should contain the date and time
    // Since the locale can vary, we'll check for numeric values which should be present
    expect(formatted).toContain('15'); // Day
    expect(formatted).toContain('2023'); // Year
    expect(formatted).toContain('30'); // Minute
  })

  it('returns N/A for invalid date', async () => {
    // Mock the initial data fetch
    axios.get.mockResolvedValue({
      data: {
        message: '',
        count: 0,
        timestamp: '2023-01-01T00:00:00Z'
      }
    });

    const wrapper = mount(App);
    await flushPromises(); // Wait for async operations to complete

    const formatted = wrapper.vm.formatDate(null);
    expect(formatted).toBe('N/A');
  })
})