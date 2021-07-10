import { render, screen } from '@testing-library/angular';
import { DocumentIconComponent } from './document-icon.component';

describe('Button component', () => {
  test('should render button', async() => {
    await render(
      `<document-icon data-testid="test" [size]="66"></document-icon>`,
      { declarations: [DocumentIconComponent] }
    );

    expect(
      screen
        .getByTestId('test')
        .querySelector('svg')
        ?.getAttribute('style')
    ).toBe("width: 66px; height: 66px;");
  });
});
