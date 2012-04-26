  // Search APIをロードする
  google.load( 'search', '1' );
  
  console.log("p1");

  function OnLoad()
  {
      // 検索コントロールを作成する
      var searchControl = new google.search.SearchControl();

      // 検索コントロールに画像検索のサーチャーを追加する
      searchControl.addSearcher( new google.search.ImageSearch() );

      // 検索コントロールを描画する
      searchControl.draw( document.getElementById( 'content' ) );
	  console.log("draw method");
	  
      // 検索を実行する
      searchControl.execute( 'sky' );
  }
  
  // ドキュメントがロードされた後に呼び出されるハンドラ関数を登録する
  google.setOnLoadCallback( OnLoad );