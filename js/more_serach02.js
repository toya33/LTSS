  var no   = 0; 
  var imgresults = new Array();
  var imgsave    = new Array();
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
     // imageSearch.execute( 'sky' );
	  
  }

   function drawing(imgid,flag){
  
       var image;
	   var atag;
	   var id = imgid;
	   
	   console.log("flag:"+flag);
	   
	   if(flag==0){
			no = 0;
			imgsave = imgresults.slice(0);
	   }else{
			imgsave = imgresults.slice(0);
		
	   }
	   
	   for(var i = 0 ; i < 12 ; i++){
	   atag  = document.getElementById('a'+(i+1));
	   image = document.getElementById('img'+(i+1));
    // サムネイル画像のURL
		if(imgresults[id]){
	   image.src = imgresults[id][2];
	   atag.href = imgresults[id++][1];
	   console.log(atag.href);
	   }else{
	   image.src = "Image/no_image.png"
	   }
	   }
	   console.log("page no:"+page);
  }
  
  function before(){
		if(page > 0){
			page--;
			drawing(page*12,0);
		}else{
			drawing(0,0);
		}
  }
  
  function next(){
		if(page < (imgresults.length/12)-1){
			page++;
			drawing(page*12,0);
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
			  if(results[i] !== null){
					imgresults[no++]=[results[i].title,results[i].url,results[i].tbUrl]; 
				}
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
	
	if(currentPage == 3){
		drawing(0,1);
	}
  }

  google.load( 'search', '1' );
  google.setOnLoadCallback( OnLoad );