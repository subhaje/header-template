// Moved from header.html <script>
(async function () {
  debugger;
  const response = await fetch('./header-data.json');
  // Navigation data
  const navigationData = await response.json();

  // MenuBuilder class
  class MenuBuilder {
    constructor(data) {
      this.data = data;
    }

    createMainNav() {
      const navList = document.createElement('ul');
      navList.className = 'site-header__nav-list';

      this.data.mainNav.forEach(item => {
        const navItem = this.createNavItem(item);
        navList.appendChild(navItem);
      });

      return navList;
    }

    createNavItem(item) {
      const li = document.createElement('li');
      li.className = 'site-header__nav-item';

      const link = document.createElement('a');
      link.href = '#';
      link.className = 'site-header__nav-link';
      link.textContent = item.title;
      li.appendChild(link);

      if (item.layout === 'mega' || item.layout === 'standard') {
        const dropdownMenu =
          item.layout === 'mega' ? this.createMegaMenu(item) : this.createStandardDropdown(item);
        li.appendChild(dropdownMenu);
      }

      return li;
    }

    createStandardDropdown(item) {
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu standard-dropdown';
      dropdownMenu.id = `dropdown-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      const header = document.createElement('h2');
      header.className = 'dropdown-header';
      header.textContent = item.title;
      dropdownMenu.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'dropdown-grid standard-grid';

      // Group items by row
      const rows = item.items.reduce((acc, menuItem) => {
        const rowNum = menuItem.row || 1;
        if (!acc[rowNum]) acc[rowNum] = [];
        acc[rowNum].push(menuItem);
        return acc;
      }, {});

      // Create rows
      Object.keys(rows).forEach(rowNum => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'submenu-items-grid';

        rows[rowNum].forEach(menuItem => {
          const link = document.createElement('a');
          link.href = '#';
          link.className = 'standard-item';
          link.textContent = menuItem.title;
          rowDiv.appendChild(link);
        });

        grid.appendChild(rowDiv);
      });

      dropdownMenu.appendChild(grid);
      return dropdownMenu;
    }

    createMegaMenu(item) {
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu';
      dropdownMenu.id = `dropdown-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      if (item.title === 'Products') {
        const title = document.createElement('h2');
        title.className = 'h2_products';
        title.textContent = item.title;
        dropdownMenu.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'dropdown-grid';

        item.items.forEach(product => {
          const productLink = this.createProductItem(product);
          grid.appendChild(productLink);

          // Create the submenu and append it directly to the dropdown
          if (product.items) {
            const submenu = this.createSubmenu(product);
            dropdownMenu.appendChild(submenu);
          }
        });

        dropdownMenu.appendChild(grid);
      }

      return dropdownMenu;
    }

    createProductItem(product) {
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'dropdown-item';
      if (product.items) {
        // Create a unique identifier for each submenu based on product title
        const submenuId = `submenu-${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        link.setAttribute('data-submenu-trigger', '');
        link.setAttribute('data-submenu-target', `#${submenuId}`);
      }

      const img = document.createElement('img');
      img.src = product.icon;
      img.alt = product.title;
      img.className = 'dropdown-icon';

      const span = document.createElement('span');
      span.textContent = product.title;

      link.appendChild(img);
      link.appendChild(span);

      return link;
    }

    createSubmenu(product) {
      const submenu = document.createElement('div');
      submenu.id = `submenu-${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
      submenu.className = 'submenu';

      const content = document.createElement('div');
      content.className = 'submenu-content';

      const header = this.createSubmenuHeader(product);
      content.appendChild(header);

      if (product.items) {
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'submenu-items-grid';
        product.items.forEach(item => {
          const link = document.createElement('a');
          link.href = item.url;
          link.className = 'submenu-item';
          link.textContent = item.title;
          itemsContainer.appendChild(link);
        });
        content.appendChild(itemsContainer);
      }

      submenu.appendChild(content);
      return submenu;
    }

    createSubmenuHeader(product) {
      const header = document.createElement('div');
      header.className = 'submenu-header';

      const headerTop = document.createElement('div');
      headerTop.className = 'submenu-header-top';

      const backLink = document.createElement('a');
      backLink.className = 'submenu-back';
      const backIcon = document.createElement('span');
      backIcon.className = 'material-symbols-outlined';
      backIcon.textContent = 'arrow_back_ios';
      backLink.appendChild(backIcon);
      backLink.appendChild(document.createTextNode('Product Menu'));

      const closeIcon = document.createElement('span');
      closeIcon.className = 'submenu-close material-symbols-outlined';
      closeIcon.textContent = 'close';

      headerTop.appendChild(backLink);
      headerTop.appendChild(closeIcon);

      const headerBottom = document.createElement('div');
      headerBottom.className = 'submenu-header-bottom';

      const title = document.createElement('h2');
      title.className = 'submenu-title';
      title.textContent = product.title;

      headerBottom.appendChild(title);

      // Use product.url for View All link if present
      if (product.url) {
        const viewAllLink = document.createElement('a');
        viewAllLink.href = product.url;
        viewAllLink.className = 'submenu-view-all-link';
        viewAllLink.textContent = 'View All';
        viewAllLink.style.marginLeft = 'auto';
        headerBottom.appendChild(viewAllLink);
      }

      header.appendChild(headerTop);
      header.appendChild(headerBottom);

      return header;
    }

    createDropdown(item) {
      const dropdownMenu = document.createElement('div');
      dropdownMenu.className = 'dropdown-menu';
      dropdownMenu.id = `dropdown-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      const grid = document.createElement('div');
      grid.className = 'dropdown-grid';

      item.items.forEach(itemText => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'dropdown-item';
        link.textContent = itemText;
        grid.appendChild(link);
      });

      dropdownMenu.appendChild(grid);
      return dropdownMenu;
    }
  }

  // MenuState and MenuManager classes
  class MenuState {
    constructor() {
      this.activeDropdown = null;
      this.activeSubmenu = null;
      this.observers = [];
      this.pageMask = null;
      this.activeNavLink = null;
    }

    subscribe(observer) {
      this.observers.push(observer);
    }

    notify() {
      this.observers.forEach(observer => observer(this));
    }

    setActiveDropdown(dropdown, navLink) {
      // Reset previous active nav link
      if (this.activeNavLink && this.activeNavLink !== navLink) {
        this.activeNavLink.setAttribute('aria-expanded', 'false');
      }

      // Set new state
      this.activeDropdown = dropdown;
      this.activeNavLink = navLink;

      if (navLink) {
        navLink.setAttribute('aria-expanded', 'true');
      }

      this.toggleBodyScroll(true);
      this.togglePageMask(true);
      this.notify();
    }

    setActiveSubmenu(submenu) {
      this.activeSubmenu = submenu;
      if (submenu && this.activeDropdown) {
        // Show the selected submenu
        submenu.style.display = 'block';

        // Make sure the dropdown grid doesn't block pointer events
        const grid = this.activeDropdown.querySelector('.dropdown-grid');
        if (grid) {
          grid.style.pointerEvents = 'none';
        }

        // Make sure the dropdown stays fully opaque
        this.activeDropdown.style.opacity = '1';
      }
      this.notify();
    }

    closeAll() {
      this.activeDropdown = null;
      this.activeSubmenu = null;

      // Reset aria-expanded on all nav links
      document.querySelectorAll('.site-header__nav-link').forEach(link => {
        link.setAttribute('aria-expanded', 'false');
      });

      this.activeNavLink = null;

      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
      });
      this.toggleBodyScroll(false);
      this.togglePageMask(false);
      this.notify();
    }

    toggleBodyScroll(disable) {
      if (disable) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    togglePageMask(show) {
      if (!this.pageMask) {
        this.pageMask = document.createElement('div');
        this.pageMask.className = 'page-mask';
        document.body.appendChild(this.pageMask);

        this.pageMask.addEventListener('click', () => {
          this.closeAll();
        });
      }

      this.pageMask.style.display = show ? 'block' : 'none';
    }

    closeSubmenuOnly() {
      // Close only the active submenu, keep the dropdown open
      this.activeSubmenu = null;

      // Restore dropdown grid visibility
      if (this.activeDropdown) {
        const grid = this.activeDropdown.querySelector('.dropdown-grid');
        if (grid) {
          grid.style.pointerEvents = 'auto';
          grid.style.visibility = 'visible';
          grid.style.display = 'flex';
        }
      }

      this.notify();
    }
  }

  class MenuStrategy {
    handleMenuClick(menuState, dropdown) {
      const grid = dropdown.querySelector('.dropdown-grid');
      if (grid) {
        grid.style.display = 'flex';
        grid.style.visibility = 'visible';
        grid.style.pointerEvents = 'auto';
      }
      dropdown.style.display = 'block';
      dropdown.style.opacity = '1';
      dropdown.classList.add('active');
    }
  }

  class MegaMenuStrategy extends MenuStrategy {
    handleMenuClick(menuState, dropdown) {
      const grid = dropdown.querySelector('.dropdown-grid');
      if (grid) {
        grid.style.display = 'flex';
        grid.style.visibility = 'visible';
        grid.style.pointerEvents = 'auto';
      }
      dropdown.style.display = 'block';
      dropdown.style.opacity = '1';
    }
  }

  class SubmenuStrategy extends MenuStrategy {
    handleMenuClick(menuState, dropdown) {
      dropdown.style.display = 'block';
      dropdown.style.opacity = '1';
    }
  }

  class MenuManager {
    constructor() {
      this.state = new MenuState();
      this.megaMenuStrategy = new MegaMenuStrategy();
      this.submenuStrategy = new SubmenuStrategy();
      this.hoverDelay = 200;
      this.hoverTimeout = null;
      this.init();
    }

    init() {
      this.setupStateObserver();
      this.setupEventDelegation();
      this.setupOutsideClickHandler();
      this.setupMouseLeaveHandler();
      this.setupKeyboardHandler();
      this.setupHoverHandlers();
    }

    setupHoverHandlers() {
      document.querySelectorAll('.site-header__nav-item').forEach(item => {
        const navLink = item.querySelector('.site-header__nav-link');
        const dropdown = item.querySelector('.dropdown-menu');

        if (dropdown) {
          // Show dropdown on hover for all nav items including Products
          item.addEventListener('mouseenter', () => {
            clearTimeout(this.hoverTimeout);
            this.hoverTimeout = setTimeout(() => {
              this.state.setActiveDropdown(dropdown, navLink);
            }, this.hoverDelay);
          });
        }
      });

      // Remove hover behavior from submenu back button - only use clicks
      document.removeEventListener('mouseover', this.submenuBackHandler);
    }

    setupMouseLeaveHandler() {
      document.querySelectorAll('.site-header__nav-item').forEach(item => {
        const navLink = item.querySelector('.site-header__nav-link');

        // Add mouseleave handler for all menu items including Products
        item.addEventListener('mouseleave', e => {
          clearTimeout(this.hoverTimeout);

          // Only close if not moving to dropdown or submenu
          if (
            !e.relatedTarget?.closest('.submenu') &&
            !e.relatedTarget?.closest('.dropdown-menu') &&
            !e.relatedTarget?.closest('.site-header__nav-item')
          ) {
            this.hoverTimeout = setTimeout(() => {
              this.state.closeAll();
            }, this.hoverDelay);
          }
        });
      });

      // Keep mouseout handling for all menus
      document.addEventListener('mouseout', e => {
        // Safe check for target element
        if (!e.target) return;

        if (
          e.target.closest('.dropdown-menu') &&
          !e.relatedTarget?.closest('.dropdown-menu') &&
          !e.relatedTarget?.closest('.submenu') &&
          !e.relatedTarget?.closest('.site-header__nav-item')
        ) {
          this.hoverTimeout = setTimeout(() => {
            this.state.closeAll();
          }, this.hoverDelay);
        }

        if (
          e.target.closest('.submenu') &&
          !e.relatedTarget?.closest('.submenu') &&
          !e.relatedTarget?.closest('.dropdown-menu') &&
          !e.relatedTarget?.closest('.site-header__nav-item')
        ) {
          this.hoverTimeout = setTimeout(() => {
            this.state.closeAll();
          }, this.hoverDelay);
        }
      });
    }

    setupKeyboardHandler() {
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && (this.state.activeDropdown || this.state.activeSubmenu)) {
          this.state.closeAll();
        }
      });
    }

    setupStateObserver() {
      this.state.subscribe(state => {
        // First hide all dropdowns except the active one
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
          if (dropdown !== state.activeDropdown) {
            dropdown.style.display = 'none';
            dropdown.style.opacity = '1';
            const grid = dropdown.querySelector('.dropdown-grid');
            if (grid) {
              grid.style.display = 'none';
            }
          } else if (state.activeSubmenu) {
            const grid = dropdown.querySelector('.dropdown-grid');
            if (grid) {
              grid.style.pointerEvents = 'none';
            }
            // Ensure dropdown remains fully visible
            dropdown.style.opacity = '1';
          }
        });

        // Hide all submenus except the active one
        document.querySelectorAll('.submenu').forEach(submenu => {
          if (submenu !== state.activeSubmenu) {
            submenu.style.display = 'none';
          } else {
            submenu.style.display = 'block';
            submenu.style.pointerEvents = 'auto';
          }
        });

        // Show active dropdown if exists
        if (state.activeDropdown) {
          const hasGrid = state.activeDropdown.querySelector('.dropdown-grid');
          const strategy = hasGrid ? this.megaMenuStrategy : this.submenuStrategy;
          strategy.handleMenuClick(state, state.activeDropdown);
        }

        if (state.activeSubmenu) {
          state.activeSubmenu.style.display = 'block';
          state.activeSubmenu.style.pointerEvents = 'auto';

          if (state.activeDropdown) {
            // Keep dropdown fully visible
            state.activeDropdown.style.opacity = '1';

            const grid = state.activeDropdown.querySelector('.dropdown-grid');
            if (grid) {
              grid.style.pointerEvents = 'none';
            }
          }
        } else if (state.activeDropdown) {
          const grid = state.activeDropdown.querySelector('.dropdown-grid');
          if (grid) {
            grid.style.pointerEvents = 'auto';
          }
        }
      });
    }

    setupEventDelegation() {
      document.addEventListener('click', e => {
        // Handle nav links
        if (e.target.closest('.site-header__nav-link')) {
          e.preventDefault();
          const navLink = e.target.closest('.site-header__nav-link');
          const navItem = navLink.closest('.site-header__nav-item');
          const dropdown = navItem.querySelector('.dropdown-menu');

          if (dropdown) {
            if (this.state.activeDropdown === dropdown) {
              this.state.closeAll();
            } else {
              this.state.setActiveDropdown(dropdown, navLink);
            }
          }
        }

        // Handle submenu triggers
        if (e.target.closest('[data-submenu-trigger]')) {
          e.preventDefault();
          const trigger = e.target.closest('[data-submenu-trigger]');
          const submenuTarget = trigger.getAttribute('data-submenu-target');
          const submenu = document.querySelector(submenuTarget);

          if (submenu) {
            // Remove any existing submenu from DOM (DON'T ACTUALLY REMOVE THEM)
            document.querySelectorAll('.submenu').forEach(existingSubmenu => {
              if (existingSubmenu !== submenu) {
                existingSubmenu.style.display = 'none'; // Hide instead of removing
              }
            });

            // Position submenu inside the dropdown
            this.state.setActiveSubmenu(submenu);
          }
        }

        // Handle back button or Product Menu text click
        if (
          e.target.closest('.submenu-back') ||
          (e.target.closest('.submenu-back') && e.target.textContent.trim() === 'Product Menu') ||
          (e.target.textContent && e.target.textContent.trim() === 'Product Menu')
        ) {
          e.preventDefault();
          e.stopPropagation();

          // Close submenu and restore dropdown grid
          if (this.state.activeDropdown) {
            const grid = this.state.activeDropdown.querySelector('.dropdown-grid');
            if (grid) {
              grid.style.pointerEvents = 'auto';
              grid.style.visibility = 'visible';
              grid.style.display = 'flex';
            }
          }

          this.state.setActiveSubmenu(null);
        }

        // Handle close button - only close the submenu, not the whole dropdown
        if (e.target.closest('.submenu-close')) {
          e.preventDefault();
          e.stopPropagation();
          this.state.closeSubmenuOnly();
        }

        // Dismiss submenu when clicking outside submenu-content but inside submenu
        if (
          this.state.activeSubmenu &&
          !e.target.closest('.submenu-content') &&
          !e.target.closest('[data-submenu-trigger]')
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.state.closeSubmenuOnly();
        }
      });
    }

    setupOutsideClickHandler() {
      document.addEventListener('click', e => {
        if (!e.target.closest('.site-header__nav-item')) {
          this.state.closeAll();
        }
      });
    }
  }

  // Initialize menu when DOM is ready
  const menuBuilder = new MenuBuilder(navigationData);
  const navigation = document.querySelector('.site-header__navigation');
  const existingNavList = navigation.querySelector('.site-header__nav-list');
  const newNavList = menuBuilder.createMainNav();

  if (existingNavList) {
    navigation.replaceChild(newNavList, existingNavList);
  } else {
    navigation.insertBefore(newNavList, navigation.firstChild);
  }

  new MenuManager();

  (function () {
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavList = document.getElementById('mobile-nav-list');
    const mobileNavHeaderContainer = document.getElementById('mobile-nav-header-container');
    const mobileNavHeadingContainer = document.getElementById('mobile-nav-heading-container');
    let navStack = [];

    function buildMobileNavList(items, parentTitle = null, parentUrl = null, heading = null) {
      mobileNavList.innerHTML = '';
      mobileNavHeaderContainer.innerHTML = '';
      mobileNavHeadingContainer.innerHTML = '';
      // Submenu header row logic
      if (navStack.length > 1) {
        const current = navStack[navStack.length - 1];
        const subheader = document.createElement('div');
        const subHeaderLeft = document.createElement('div');
        const subHeaderRight = document.createElement('div');
        subheader.className = 'mobile-nav-subheader-row';
        // Back button
        const backBtn = document.createElement('button');
        backBtn.className = 'mobile-nav-back';
        backBtn.innerHTML = '<span class="material-symbols-outlined">arrow_back_ios</span>';
        backBtn.onclick = e => {
          e.stopPropagation();
          if (navStack.length > 1) {
            debugger;
            navStack.pop();
            const prev = navStack[navStack.length - 1];
            buildMobileNavList(prev.items, prev.parentTitle, prev.parentUrl, prev.heading);
          }
        };
        subHeaderLeft.appendChild(backBtn);
        // Title
        const titleSpan = document.createElement('span');
        titleSpan.className = 'mobile-nav-title';
        titleSpan.textContent = current.parentTitle || 'Main Menu';
        subHeaderLeft.appendChild(titleSpan);
        // View All link (if parentUrl)
        if (current.parentUrl) {
          const viewAll = document.createElement('a');
          viewAll.className = 'mobile-nav-viewall';
          viewAll.textContent = 'View All';
          viewAll.href = current.parentUrl;
          viewAll.onclick = e => {
            e.stopPropagation();
          };
          subHeaderRight.appendChild(viewAll);
        }
        // Spacer for flex alignment if no View All
        if (!current.parentUrl) {
          const spacer = document.createElement('span');
          spacer.style.flex = '1';
          subHeaderRight.appendChild(spacer);
        }
        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.setAttribute('aria-label', 'Close menu');
        closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
        closeBtn.onclick = e => {
          e.stopPropagation();
          closeMobileNav();
        };
        subHeaderRight.appendChild(closeBtn);
        subHeaderLeft.className = 'flex-center-start';
        subHeaderRight.className = 'flex-center-start';
        subheader.appendChild(subHeaderLeft);
        subheader.appendChild(subHeaderRight);
        mobileNavHeaderContainer.appendChild(subheader);
      } else {
        // Main menu header row ("Close" text + X)
        const closeRow = document.createElement('div');
        closeRow.className = 'mobile-nav-close-row';
        const closeText = document.createElement('span');
        closeText.className = 'mobile-nav-close-text';
        closeText.textContent = 'Close';
        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-nav-close';
        closeBtn.setAttribute('aria-label', 'Close menu');
        closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
        closeBtn.onclick = e => {
          e.stopPropagation();
          closeMobileNav();
        };
        closeRow.appendChild(closeText);
        closeRow.appendChild(closeBtn);
        mobileNavHeaderContainer.appendChild(closeRow);
      }
      // Heading (if present)
      if (heading) {
        const headingEl = document.createElement('div');
        headingEl.className = 'mobile-nav-heading';
        headingEl.textContent = heading;
        mobileNavHeadingContainer.appendChild(headingEl);
      }
      // Render items
      items.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'mobile-nav-item';
        const hasChildren = Array.isArray(item.items) && item.items.length > 0;
        const btn = document.createElement('button');
        btn.className = 'mobile-nav-link';
        btn.innerHTML =
          (item.icon ? `<img src="${item.icon}" alt="" />` : '') +
          `<span>${item.title}</span>` +
          (hasChildren
            ? '<span class="material-symbols-outlined mobile-nav-add">add</span>'
            : '<span class="material-symbols-outlined mobile-nav-arrow">chevron_right</span>');
        btn.onclick = e => {
          e.stopPropagation();
          if (hasChildren) {
            navStack.push({
              items: item.items,
              parentTitle: heading || 'Main Menu',
              parentUrl: item.url,
              heading: item.title,
            });
            buildMobileNavList(item.items, item.title, item.url, item.title);
          } else if (item.url) {
            window.location.href = item.url;
          }
        };
        li.appendChild(btn);
        mobileNavList.appendChild(li);
      });
    }

    function openMobileNav() {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
      navStack = [
        { items: navigationData.mainNav, parentTitle: null, parentUrl: null, heading: null },
      ];
      buildMobileNavList(navigationData.mainNav);
      mobileNav.focus();
      // Hide the mobile header bar
      const mobileHeaderBar = document.querySelector('.mobile-header-bar');
      if (mobileHeaderBar) {
        mobileHeaderBar.style.display = 'none';
      }
    }
    function closeMobileNav() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      navStack = [];
      // Show the mobile header bar
      const mobileHeaderBar = document.querySelector('.mobile-header-bar');
      if (mobileHeaderBar) {
        mobileHeaderBar.style.display = 'flex';
      }
    }
    mobileNavToggle.onclick = openMobileNav;
    // Remove old close handler, now handled in buildMobileNavList
    mobileNav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileNav();
      }
    });
  })();
})();
