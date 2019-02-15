let programWrapper = (() => {
    const apiUrl = 'https://cors.io/?https://jobs.github.com/positions.json';
    let searchResults = [];
    
    
    // Runs the code
    main();
    
    function makeRequest(url) {
        // Async function (returns promise)
        return $.getJSON(url);
    }
    
    function getUserInput() {
        return ({'description': replaceSpaces($('#job-description').val()), 'location': replaceSpaces($('#location').val())});
    }

    function getAll() {
        return searchResults;
    }
    
    function add(item) {
        searchResults.push(item);
    }    
    
    function addListItem(item) {
        
        let $newListItem = $('<li class="item-list__item"></li>');
        $('.item-list').append($newListItem);
        
        let $newButtonInsideListItem = $(`<button class="item-list__item__button" id="${item.id}">${item.title}</button>`).on('click', () => {
            showModal(item);
        });
        $('.item-list__item:last-child').append($newButtonInsideListItem);
    }
    
    function loadList(responseFromAPI) {
        responseFromAPI.forEach(item => {
            let data = {
                id: item.id,
                company: item.company,
                location: item.location,
                title: item.title,
                description: item.description,
                type: item.type,
                positionUrl: item.url,
                dateOfCreation: item.created_at
            };
            add(data);
        });
    }

    function populatePageWithList() {
        getAll().forEach(item => {
            addListItem(item);
        });
    }

    function replaceSpaces(string) {
        return string.replace(/\s+/g, '+');
    }
    
    function showModal(item) {
        let $modal = $(`<div class='modal'></div>`);
        // .html('') clears all the content of #modal-container before adding new stuff
        $('#modal-container').html('').append($modal);

        let $modalCloseButton = $(`<button class='modal-close'>Close</button>`);
        $modal.append($modalCloseButton.on('click', hideModal));

        let $modalTitle = $(`<h1 id='modal-title'>${item.title}</h1>`);
        let $modalCompany = $(`<p id='modal-company'>Company: ${item.company}</p>`);
        let $modalDescription = $(`<p id='modal-description'>Job Description: ${item.description}</p>`);
        let $modalDateOfCreation = $(`<p id='modal-date-of-creation'>This job post was created on ${item.dateOfCreation}</p>`);
        let $modalTypeAndLocation = $(`<p id='modal-type-and-location'>${item.type} in ${item.location}</p>`);

        $modal.append($modalTitle).append($modalCompany).append($modalDescription).append($modalDateOfCreation).append($modalTypeAndLocation);
        
        $('#modal-container').show();
    }
    
    function hideModal() {
        $('#modal-container').hide();
    }

    function makeSearch() {
        let description = getUserInput().description;
        let location = getUserInput().location;
        let searchUrl = apiUrl;

        // Reset current search before making a new one
        $('.item-list').html('');
        searchResults = [];

        // Checks if the user typed description/location and sets the url accordingly
        if (description === '' && location !== '') {
            searchUrl = `${apiUrl}?location=${location}`;
        }
        if (description !== '' && location === '') {
            searchUrl = `${apiUrl}?description=${description}`;
        }
        if (description !== '' && location !== '') {
            searchUrl = `${apiUrl}?description=${description}&location=${location}`;
        }

        // Make new request and load it into page
        makeRequest(searchUrl).then(
            // Executes all the functions that depend on that request
            responseFromAPI => {
                loadList(responseFromAPI);
                populatePageWithList();
            }
        );
    }
    
    function main() {
        
        // Listeners for making the search
        $('#location').keydown(e => {
            if (e.keyCode === 13) {
                makeSearch();
            }
        });
        $('#job-description').keydown(e => {
            if (e.keyCode === 13) {
                makeSearch();
            }
        });
        $('#search-button').on('click', () => {
            makeSearch();
        });

        // Listener for closing modal by pressing 'Esc'
        $(window).keydown(e => {
            if (e.keyCode === 27 && $('#modal-container')[0].style.display === 'block') {
                hideModal();
            }
        });

        // Listener for closing modal by clicking outside of the modal
        $(window).on('click', e =>{
            if (e.target === $('#modal-container')[0]) {
                hideModal();
            }
        });
    }
    
    
    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        showModal: showModal,
        hideModal: hideModal,
        main: main,
        replaceSpaces: replaceSpaces,
        makeRequest: makeRequest,
        populatePageWithList: populatePageWithList,
        getUserInput: getUserInput
    };
}) ();