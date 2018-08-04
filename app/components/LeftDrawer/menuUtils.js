const findMenuItem = (menus, key, value) => {
  let foundMenuItem;
  let foundMenuItemIndex = 0;

  menus.forEach((menu, index) => {
    if (menu[key] === value) {
      foundMenuItem = menu;
      foundMenuItemIndex += index;
    }
    if (menu.children) {
      menu.children.forEach((child, childIndex) => {
        if (child[key] === value) {
          foundMenuItem = child;
          foundMenuItemIndex += index + childIndex;
        }
      });
    }
    if (menu.children && menu.open && !foundMenuItem) {
      foundMenuItemIndex += (index + (menu.children.length));
    }
  });
  return { foundMenuItem, foundMenuItemIndex };
};

const findParentMenuItem = (menus, childToSearch) => {
  let foundMenuItem;

  menus.forEach((menu) => {
    if (menu.children) {
      menu.children.forEach((child) => {
        if (childToSearch === child) {
          foundMenuItem = menu;
        }
      });
    }
  });
  return foundMenuItem;
};

const scrollOpenViews = (menuItem, openViews) => {
  const openMenuElement = document.querySelector('.open-views-menu > div > div');
  if (openMenuElement) {
    const { foundMenuItemIndex } = findMenuItem(openViews, 'url', menuItem.url);
    openMenuElement.scrollTop = (foundMenuItemIndex) * 48;
  }
};

const scrollMenu = (menuItem, menus) => {
  const menuElement = document.querySelector('.views-menu > div > div');
  if (menuElement) {
    const { foundMenuItemIndex } = findMenuItem(menus, 'url', menuItem.url);
    menuElement.scrollTop = foundMenuItemIndex * 48;
  }
};

const scrollToOpenViewsItem = (menuItem, openViews) => {
  setTimeout(() => {
    scrollOpenViews(menuItem, openViews);
  }, 300);
};

const scrollToMenuItem = (menuItem, menus) => {
  setTimeout(() => {
    scrollMenu(menuItem, menus);
  }, 300);
};

const scrollToMenuItemAndOpenViews = (menuItem, menus, openViews) => {
  setTimeout(() => {
    scrollOpenViews(menuItem, openViews);
    scrollMenu(menuItem, menus);
  }, 300);
};

export {
  findMenuItem,
  findParentMenuItem,
  scrollToMenuItem,
  scrollToOpenViewsItem,
  scrollToMenuItemAndOpenViews,
};
