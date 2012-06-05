  // Search APIをロードする
  google.load( 'search', '1' );
  
  console.log("p1");

  function OnLoad()
  {
      // 検索コントロールを作成する
      var searchControl = new google.search.SearchControl();

      // 検索コントロールに画像検索のサーチャーを追加する
      searchControl.addSearcher( new google.search.ImageSearch() );
	  
	  searchControl.setResultSetSize('large');
	  
	  var options = new GsearcherOptions();
	  options.setExpandMode(GSearchControl.EXPAND_MODE_OPEN);
	  searchControl.addSearcher(ws,options);

      // 検索コントロールを描画する
      searchControl.draw( document.getElementById( 'inner_main_img' ) );
	  
      // 検索を実行する
      searchControl.execute( 'sky' );
	  
  }
  
  // ドキュメントがロードされた後に呼び出されるハンドラ関数を登録する
  google.setOnLoadCallback( OnLoad );