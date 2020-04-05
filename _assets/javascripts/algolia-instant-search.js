(function($) {
  console.log("heeeeere");
  const search = instantsearch({
    appId: 'M4A4VW59L9',
    apiKey: '0f37e12d8dc217fc3adf8e03ebae4a62',
    indexName: 'dev_ELIXIRSCHOOL',
    routing: true
  });

  // initialize SearchBox
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Search for products'
    })
  );

  // initialize hits widget
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#hits',
    })
  );

  search.start();

})(jQuery);
