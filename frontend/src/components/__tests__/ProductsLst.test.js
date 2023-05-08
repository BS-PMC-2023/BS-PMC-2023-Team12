import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductsLst from '../../components/ProductScreen/ProductsLst';

jest.mock('axios');

describe('ProductLst component', () => {
  it('renders list of cameras', async () => {
    const data = [
      {
        _id: 1,
        name: 'Camera 1',
        id: 1,
        available: true,
      },
      {
        _id: 2,
        name: 'Camera 2',
        id: 2,
        available: false,
        studentID: 123,
      },
    ];
    axios.get.mockResolvedValue({ data });

    const { getByText } = render(<ProductsLst myProp="cameras" name="Cameras" />);

    // Wait for the data to load and be rendered
    await waitFor(() => {
      expect(getByText('Camera 1')).toBeInTheDocument();
      expect(getByText('Camera 2')).toBeInTheDocument();
    });

    // Assert that the available camera has the "פנוי" badge and the "השאל" button
    const availableCamera = getByText('Camera 1').closest('li');
    expect(availableCamera).toHaveTextContent('פנוי');
    expect(availableCamera).toContainHTML('<button type="button" class="btn btn-primary">השאל</button>');

    // Assert that the unavailable camera has the "תפוס" badge and the student ID
    const unavailableCamera = getByText('Camera 2').closest('li');
    expect(unavailableCamera).toHaveTextContent('תפוס');
    expect(unavailableCamera).toHaveTextContent('student id: 123');
  });
});
