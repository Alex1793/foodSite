window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabcContents = document.querySelectorAll('.tabcontent'),
          tabContainer = document.querySelector('.tabcontainer');
    

    function hideTabsContent () {
        tabcContents.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };

    function showTabsContent (i = 0) {
        tabcContents[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    };

    hideTabsContent();
    showTabsContent();

    tabContainer.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target === item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });
});
