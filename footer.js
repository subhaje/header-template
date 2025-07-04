document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('footer-data.json');
    const data = await response.json();

    const footerContainer = document.querySelector('.site-footer__grid');

    data.footer.sections.forEach(section => {
      const sectionElement = document.createElement('div');
      sectionElement.className = 'site-footer__section';

      const titleButton = document.createElement('button');
      titleButton.className = 'site-footer__title';
      titleButton.innerHTML = `${section.title}<span class="site-footer__toggle-icon material-symbols-outlined">add</span>`;

      const linksList = document.createElement('ul');
      linksList.className = 'site-footer__links';
      linksList.style.display = 'none'; // Initially hidden in tablet view

      section.links.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.className = 'site-footer__link';
        anchor.textContent = link;
        listItem.appendChild(anchor);
        linksList.appendChild(listItem);
      });

      // Add click event for accordion functionality
      titleButton.addEventListener('click', () => {
        const isExpanded = linksList.style.display === 'block';
        linksList.style.display = isExpanded ? 'none' : 'block';
        titleButton.querySelector('.site-footer__toggle-icon').textContent = isExpanded
          ? 'add'
          : 'remove';
      });

      sectionElement.appendChild(titleButton);
      sectionElement.appendChild(linksList);
      footerContainer.appendChild(sectionElement);
    });
  } catch (error) {
    console.error('Error loading footer data:', error);
  }
});
