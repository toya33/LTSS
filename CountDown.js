var Timer1; // タイマーを格納する変数（タイマーID）の宣言

// カウントダウン関数を1000ミリ秒毎に呼び出す関数
function Start() {
	document.getElementById("start").disabled = true;
	Timer1 = setInterval("CountDown()", 1000);
	// カウントダウン用フォームを入力不可にする
	document.getElementById("min").readOnly = true;
	document.getElementById("sec").readOnly = true;
}

// タイマー停止関数
function Stop() {
	document.getElementById("start").disabled = false;
	clearInterval(Timer1);
	// カウントダウン用フォームを入力可能にする
	document.getElementById("min").readOnly = false;
	document.getElementById("sec").readOnly = false;
}

// カウントダウン関数
function CountDown() {
	var min = document.getElementById("min").value;
	var sec = document.getElementById("sec").value;

	if ((min == "") && (sec == "")) {
		alert("時刻を設定してください！");
		ReSet();
	} else {
		if (min == "")
			min = 0;
		min = parseInt(min);

		if (sec == "")
			sec = 0;
		sec = parseInt(sec);

		TMWrite(min * 60 + sec - 1);
	}
}

// 残り時間を書き出す関数
function TMWrite(int) {
	int = parseInt(int);

	if (int <= 0) {
		// TODO 終了時間になった時の処理
		ReSet();
		alert("時間です！");
	} else {
		// 残り分数はintを60で割って切り捨てる
		document.getElementById("min").value = Math.floor(int / 60);
		// 残り秒数はintを60で割った余り
		document.getElementById("sec").value = int % 60;
	}
}

// フォームを初期状態に戻す（リセット）関数
function ReSet() {
	document.getElementById("min").value = "0";
	document.getElementById("sec").value = "0";
	document.getElementById("start").disabled = false;
	clearInterval(Timer1);
}