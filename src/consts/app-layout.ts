/**
 * Layout configuration for the application shell.
 *
 * - `navbar.width`: Width of the sidebar in pixels.
 * - `header.height`: Height of the top header in pixels.
 * - `padding`: Mantine spacing token used for consistent layout padding.
 *
 * This config is used throughout the app to calculate layout dimensions,
 * such as scrollable areas (e.g., 100vh - header height - padding).
 */
const appLayoutConfig = {
  navbar: {
    width: '64px',
    breakpoint: 'xs',
  },
  header: {
    height: '48px',
  },
  padding: 'md',
};

export const innerLayout = {
  buttonSetWidth: '330px',
  buttonSetHeight: '36px',
};

export default appLayoutConfig;
