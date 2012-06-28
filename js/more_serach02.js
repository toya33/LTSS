  var no   = 0;
  var imgresults = new Array();
  var page=0;
  
  function OnLoad()
  {
  
      var searchControl = new google.search.SearchControl();
	  
      var imageSearch = new google.search.ImageSearch();
	  
	  searchControl.addSearcher(imageSearch);
	  
	  var drawOptions = new google.search.DrawOptions();
      drawOptions.setSearchFormRoot(document.getElementById("search"));
      searchControl.draw(document.getElementById("search_control"), drawOptions);
	
      // 検索完了時に呼び出されるコールバック関数を登録する　　　　　　　　この部分が検索結果？↓　　
      imageSearch.setSearchCompleteCallback( this, SearchComplete, [ imageSearch ] );
	  
      // 検索を実行する
      imageSearch.execute( 'sky' );
	  
  }

   function drawing(imgid){
  
       var image;
	   var id = imgid;
	   no = 0;
	   for(var i = 0 ; i < 12 ; i++){
	   image = document.getElementById('image'+(i+1));
    // サムネイル画像のURL
		if(imgresults[id] !== null){
	   image.src = imgresults[id++][2];
	   console.log("image id:"+id);
	   }
	   }
	   console.log("page no:"+page);
  }
  
  function before(){
		if(page > 0){
			page--;
			drawing(page*12);
		}else{
			drawing(0);
		}
  }
  
  function next(){
		if(page < imgresults.length/3){
			page++;
			drawing(page*12);
		}else{
			page--;
		}
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
			  if(results[i] !== null)
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

  google.load( 'search', '1' );
  google.setOnLoadCallback( OnLoad );