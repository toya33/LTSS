function randomImg(ImgArrLength){
	// 画像総数
	var n = ImgArrLength;
	var index = [];
	
	if (document.traForm.transit1[0].checked){
		// 適合度順
		for ( var i = 0; i < n; i++) {
			index[i] = i;
		}
	}
	
	if (document.traForm.transit1[1].checked) {
		// ランダム

		// １～ｎまでの整数を配列arrに順番に代入
	    var arr = [];
	    for (var i = 0; i < n; i++){
	    	arr[i] = i;
	    }
	 
	    // ランダムに並び替えた結果を配列shuffledArrに代入
	    // shuffledArr[i]が１～ｎまでの数字を並び替えた数字になる
	    var shuffledArr = [];
	    for (var i = 0; i < n; i++){
	    	// 乱数を代入
	        var randomIndex = Math.floor(Math.random() * arr.length);
	        // 引き出された配列をshuffledArrの[0]から順に入れていく
	        shuffledArr[i] = arr[randomIndex];
	        // arr配列の使った値を削除して次のループへまわす。
	        arr.splice(randomIndex,1);
	 
	        // 作ったランダム数字shuffledArr[i]を画像の表示順にする
	        index[i] = shuffledArr[i];
	    }
	}
	
	return index;
}
