  var no   = 0;
  var imgresults = new Array();
  
  function OnLoad()
  {
  
      var imageSearch = new google.search.ImageSearch();
	
		imageSearch.setResultSetSize();
      // 検索完了時に呼び出されるコールバック関数を登録する　　　　　　　　この部分が検索結果？↓　　
      imageSearch.setSearchCompleteCallback( this, SearchComplete, [ imageSearch ] );
	  
      // 検索を実行する
      imageSearch.execute( 'sky' );
  }

  function SearchComplete( searcher )
  {
      // 結果オブジェクトを取得する
      var results = searcher.results;
	  
      if( results && ( 0 < results.length ) )
      {
          // 情報を取得する
          for( var i = 0; i < results.length; i++ )
          {	  
			  imgresults[no++]=[results[i].title,results[i].Url,results[i].tbUrl];  
			} 
       }
	   
	var current = searcher.cursor;              // cursorオブジェクト
    var currentPage = current.currentPageIndex;  // 現在のページ番号

    if( currentPage < current.pages.length - 1 )
    {
        var nextPage = currentPage + 1;          // 次のページのページ番号

        // 次のページを検索する
        searcher.gotoPage( nextPage );
		console.log(nextPage);
    }
  }


  function drawimg(){
  
       var content;
	   
	   for(var i = 0 ; i < no ; i++){
	   content= document.getElementById( 'img'+(i+1) );
    // サムネイル画像のURL
       var image = document.createElement( 'img' );
       image.src = imgresults[i][2];
	   content.appendChild( image );
	   }
  }
  google.load( 'search', '1' );
  google.setOnLoadCallback( OnLoad );