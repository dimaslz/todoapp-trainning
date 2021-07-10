import { render, screen } from '@testing-library/angular';
import { TrashIconComponent } from './trash-icon.component';

describe('Button component', () => {
  test('should render button', async() => {
    await render(`<trash-icon data-testid="test" [size]="66"></trash-icon>`, {
      declarations: [TrashIconComponent],
    });

    expect(
      screen
        .getByTestId('test')
        .querySelector('svg')
        ?.getAttribute('style')
    ).toBe("width: 66px; height: 66px;");
  });
});
