import { render, screen } from '@testing-library/angular';
import { CheckIconComponent } from './check-icon.component';

describe('Button component', () => {
  test('should render button', async() => {
    await render(
      `<check-icon data-testid="test" [size]="66"></check-icon>`,
      { declarations: [CheckIconComponent] }
    );

    expect(
      screen
        .getByTestId('test')
        .querySelector('svg')
        ?.getAttribute('style')
    ).toBe("width: 66px; height: 66px;");
  });
});
