  var no   = 0; 
  var imgResults = new Array();
  var imgSave    = new Array();
  var page=0;
<<<<<<< HEAD
<<<<<<< HEAD
  var searchflg=0;
  
  //　セーフサーチON押下時の処理
  function searchON()
  {
	  searchflg = 0;
	  OnLoad();
  }
  
  //　セーフサーチOFF押下時の処理
  function searchOFF()
  {
	  searchflg = 1;
	  OnLoad();
  }
  
=======
  var maxViewImg=12;
>>>>>>> a07f378347b8b39a92089073219669854469682c
=======
  var maxViewImg=12;
>>>>>>> a07f378347b8b39a92089073219669854469682c
  
  function OnLoad()
  {
  
      var searchControl = new google.search.SearchControl(null);
	  
      var imageSearch = new google.search.ImageSearch();
	  
	  searchControl.addSearcher(imageSearch);
	  
	  // セーフサーチの切り替え判定
	  if(searchflg==0){
		  imageSearch.setRestriction(google.search.Search.RESTRICT_SAFESEARCH,google.search.Search.SAFESEARCH_STRICT);
	  } else if(searchflg==1){
		  imageSearch.setRestriction(google.search.Search.RESTRICT_SAFESEARCH,google.search.Search.SAFESEARCH_OFF);
	  }
	  
	  var drawOptions = new google.search.DrawOptions();
      drawOptions.setSearchFormRoot(document.getElementById("search"));
      searchControl.draw(document.getElementById("search_control"), drawOptions);
	
<<<<<<< HEAD
<<<<<<< HEAD
      // 検索完了時に呼び出されるコールバック関数を登録するこの部分が検索結果？↓　　
=======
=======
>>>>>>> a07f378347b8b39a92089073219669854469682c
	  searchControl.setSearchStartingCallback(this, resultFormat,null);
	
      // 検索完了時に呼び出されるコールバック関数を登録する　　　　　　　　この部分が検索結果？↓　　
>>>>>>> a07f378347b8b39a92089073219669854469682c
      imageSearch.setSearchCompleteCallback( this, SearchComplete, [ imageSearch ] );
	  
  }
  
   function resultFormat(){
		imgresults=[];
		no=0;
  }

   function drawImage(frontId){
  
       var image;
	   var atag;
	   var id = frontId;
	   
	   for(var i = 1 ; i <= maxViewImg ; i++){
	   atag  = document.getElementById('a'+ i);
	   image = document.getElementById('img' + i);
    // サムネイル画像のURL
		if(imgresults[id]){
	   image.src = imgresults[id][2];
	   atag.href = imgresults[id++][1];
	   }else{
	   image.src = "Image/no_image.png"
	   }
	   }
  }
  
  //前のページに遷移する処理
  function before(){
		if(page > 0){
			page--;
			drawImage(page*12);
		}else{
			drawImage(0);
		}
  }
  
  //次のページに遷移する処理
  function next(){
		if(page < (imgresults.length/12)-1){
			page++;
			drawImage(page*12);
		}
  }
  
  function SearchComplete( searcher )
  {
	  setImageInfo(searcher);
  }
  
  function setImageInfo(searcher){
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
    }
	
	if(currentPage == 3){
	    page=0;
		drawImage(0);
	}
  }

  google.load( 'search', '1' );
  google.setOnLoadCallback( OnLoad );