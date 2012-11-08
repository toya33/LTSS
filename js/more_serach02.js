var no = 0;
var imgResults = [];
var imgSave = [];
var page = 0;
var searchflg = 0;
var maxViewImg = 12;

//画像検索結果を格納
var imgArr = [];
var atagArr = [];
//inner_main_imgに表示される左上の画像の要素数
var index = 0;
// 画像の表示順を格納
var indexArr = [];

// セーフサーチON押下時の処理
function searchON() {
	searchflg = 0;
	OnLoad();
}

// セーフサーチOFF押下時の処理
function searchOFF() {
	searchflg = 1;
	OnLoad();
}


function OnLoad() {

	var searchControl = new google.search.SearchControl(null);
	searchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);

	var imageSearch = new google.search.ImageSearch();

	searchControl.addSearcher(imageSearch);

	// セーフサーチの切り替え判定
	if (searchflg == 0) {
		imageSearch.setRestriction(google.search.Search.RESTRICT_SAFESEARCH,
				google.search.Search.SAFESEARCH_STRICT);
	} else if (searchflg == 1) {
		imageSearch.setRestriction(google.search.Search.RESTRICT_SAFESEARCH,
				google.search.Search.SAFESEARCH_OFF);
	}

	var drawOptions = new google.search.DrawOptions();
	drawOptions.setSearchFormRoot(document.getElementById("search"));
	searchControl.draw(document.getElementById("search_control"), drawOptions);

	// 検索完了時に呼び出されるコールバック関数を登録するこの部分が検索結果？↓
	searchControl.setSearchStartingCallback(this, resultFormat, null);

	// 検索完了時に呼び出されるコールバック関数を登録する この部分が検索結果？↓
	imageSearch
			.setSearchCompleteCallback(this, SearchComplete, [ imageSearch ]);

}

function resultFormat() {
	imgresults = [];
	no = 0;
	imgArr = [];
	atagArr = [];
	index = 0;
	indexArr = [];
}

function search() {
	for ( var i = 0; i < imgresults.length; i++) {	
		// サムネイル画像のURL
		if (imgresults[i]) {
			atagArr[i] = imgresults[i][1];
			imgArr[i] = imgresults[i][2];
		}
	};
	
	if (document.getElementById("conformity").checked){
		// 適合度順
		for ( var i = 0; i < imgresults.length; i++) {
			indexArr[i] = i;
		}
	}
	
	if (document.getElementById("random").checked) {
		// ランダム

		// １～ｎまでの整数を配列arrに順番に代入
	    var arr = [];
	    for (var i = 0; i < imgresults.length; i++){
	    	arr[i] = i;
	    }
	 
	    // ランダムに並び替えた結果を配列shuffledArrに代入
	    // shuffledArr[i]が１～ｎまでの数字を並び替えた数字になる
	    var shuffledArr = [];
	    for (var i = 0; i < imgresults.length; i++){
	    	// 乱数を代入
	        var randomIndex = Math.floor(Math.random() * arr.length);
	        // 引き出された配列をshuffledArrの[0]から順に入れていく
	        shuffledArr[i] = arr[randomIndex];
	        // arr配列の使った値を削除して次のループへまわす。
	        arr.splice(randomIndex,1);
	 
	        // 作ったランダム数字shuffledArr[i]を画像の表示順にする
	        indexArr[i] = shuffledArr[i];
	    }
	}
	drawImage();
}

function drawImage() {

	var image;
	var atag;

	// inner_main_imgに画像設定
	for ( var i = 0; i < maxViewImg; i++) {
		atag = document.getElementById('a' + (i + 1));
		image = document.getElementById('img' + (i + 1));
		// サムネイル画像のURL
		if(atagArr[index]){
			atag.href = atagArr[indexArr[index]];
			image.src = imgArr[indexArr[index]];			
		};
		
		if (index >= indexArr.length - 1){
			index = 0;
		}else {
			index++;
		};
	};
}

// 前のページに遷移する処理
function before() {
	index -= maxViewImg * 2;
	if (index < 0) {
		index = indexArr.length - Math.abs(index);
	}
	drawImage();
}

// 次のページに遷移する処理
function next() {
	drawImage();
}

function SearchComplete(searcher) {
	setImageInfo(searcher);
}

function setImageInfo(searcher) {
	// 結果オブジェクトを取得する
	var results = searcher.results;
	if (results && (0 < results.length)) {
		// 情報を取得する
		for ( var i = 0; i < results.length; i++) {
			if (results[i] !== null) {
				imgresults[no++] = [ results[i].title, results[i].url,
						results[i].tbUrl ];
			}
		}
	}

	var current = searcher.cursor; // cursorオブジェクト
	var currentPage = current.currentPageIndex; // 現在のページ番号

	if (currentPage < current.pages.length - 1) {
		var nextPage = currentPage + 1; // 次のページのページ番号

		// 次のページを検索する
		searcher.gotoPage(nextPage);
	}

	if (currentPage == 7) {
		search();
	}
}

google.load('search', '1');
google.setOnLoadCallback(OnLoad);