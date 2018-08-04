const styles = (isBoxedLayout, currentTheme) => ({
  appBar: {
    position: 'fixed',
    top: 0,
    overflow: 'hidden',
    maxHeight: 57,
    maxWidth: isBoxedLayout ? 1200 : null,
  },
  menuButton: {
    marginLeft: 10,
  },
  iconsRightContainer: {
    marginLeft: 20,
  },
  tabsScrollbars: {
    overflowX: 'overlay',
    overflowY: 'hidden',
  },
  iconButton: {
    fill: currentTheme.appBarMenuButtonColor,
  },
});

export default styles;
