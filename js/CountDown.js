/*
 * 全体の流れというか、カウントダウンの機能はhttp://www.pori2.net/js/timer/6.htmlをパクリました
 * プログレスバーはhttp://www.html5.jp/library/progress.html
 */

var Timer1; // タイマーを格納する変数（タイマーID）
var min;
var sec;

var finish = null; // 終了時に再生する音声
var alert = null; // 終了N分前に再生する音声
// var SeStartBtn = null;
// var SeResetBtn = null;

// 画面点滅のon(true)/off(false)
flg_pulsate = {
	    f: true,
	    get flg() {
	        return this.f;
	    },
	    set flg(flg) {
	        return this.f = Boolean(flg);
	    }
	}; 

//　explodeによる画面粉砕(true)/初期状態(false)
flg_exp = {
	    f: false,
	    get flg() {
	        return this.f;
	    },
	    set flg(flg) {
	        return this.f = Boolean(flg);
	    }
	}; 


// ブラウザごとに、対応している音声ファイルの形式に応じて処理を変える(http://himaxoff.blog111.fc2.com/blog-entry-97.htmlから引用)
try {
	audio = new Audio("");
	if (audio.canPlayType) {
		var canPlayOgg = ("" != audio.canPlayType("audio/ogg"));
		var canPlayMp3 = ("" != audio.canPlayType("audio/mpeg"));
		if (canPlayOgg) {
			// oggをサポートしている
			// finish = new Audio("se/tokigakita_01.ogg");
			finish = new Audio("se/b_035.ogg");
			alert = new Audio("se/hato.ogg");
			// SeStartBtn = new Audio("se/youistart_01.ogg");
			// SeResetBtn = new Audio("se/reset_01.ogg");
		} else if (canPlayMp3) {
			// mp3をサポートしている
			// finish = new Audio("se/tokigakita_01.mp3");
			finish = new Audio("se/b_035.mp3");
			alert = new Audio("se/hato.mp3");
			// SeStartBtn = new Audio("se/youistart_01.mp3");
			// SeResetBtn = new Audio("se/reset_01.mp3");
		} else {
			throw "oggもmp3もサポートしていません";
		}
	} else {
		throw "canPlayTypeメソッドが存在しません";
	}
} catch (e) {
	// HTML5 Audioをサポートしていなければ例外が発生
	audio = null;
}

// 音声のロード後に自動で再生されないように設定
finish.autoplay = false;
alert.autoplay = false;
// SeStartBtn.autoplay = false;
// SeResetBtn.autoplay = false;

// 音声ファイルのロード処理
finish.onload = function() {};
alert.onload = function() {};
// SeStartBtn.onload = function() {};
// SeResetBtn.onload = function() {};

var progress_max = 0; // プログレスバーの最大値を格納
// プログレスバー初期表示の設定
var p = {
		width : 976,
};
var o = null;
window.onload = function() {
	o = new html5jp.progress("progress", p);
	o.draw();
};

// カウントダウン関数を1000ミリ秒毎に呼び出す関数
function Start() {
	//SeStartBtn.play();
	
	min = document.getElementById("min").value;
	sec = document.getElementById("sec").value;

	if (min == ""){
		min = 0;
		document.getElementById("min").value = 0;
	}
	min = parseInt(min);

	if (sec == ""){
		sec = 0;
		document.getElementById("sec").value = 0;
	}
	sec = parseInt(sec);

	// プログレスバーの最大値を設定
	progress_max = min * 60 + sec;

	// 入力値が正しい場合のみ処理
	if (progress_max > 0) {
		document.getElementById("start").disabled = true;
		document.getElementById("reset").disabled = true;

		// カウントダウン用フォームを入力不可にする
		document.getElementById("min").readOnly = true;
		document.getElementById("sec").readOnly = true;

		// カウントダウン起動
		Timer1 = setInterval("CountDown()", 1000);
	}
}

// タイマー停止関数
function Stop() {
	document.getElementById("start").disabled = false;
	document.getElementById("reset").disabled = false;
	clearInterval(Timer1);
	// カウントダウン用フォームを入力可能にする
	document.getElementById("min").readOnly = false;
	document.getElementById("sec").readOnly = false;
	var p = {
		width : 976,
	};
	o = new html5jp.progress("progress", p);
	o.reset();
}

// カウントダウン関数
function CountDown() {
	min = document.getElementById("min").value;
	sec = document.getElementById("sec").value;
	
	min = parseInt(min);
	sec = parseInt(sec);

	TMWrite(min * 60 + sec - 1);
}

// 残り時間を書き出す関数
function TMWrite(int) {
	int = parseInt(int);

	var to = progress_max - int;

	// プログレスバー
	p = {
		to : to,
		full : progress_max,
		animation : 0,
		width : 976,
		nd : 1
	};
	o = new html5jp.progress("progress", p);
	o.draw();

	if (int <= 0) {
		// 終了時間になった時の処理
		finish.play();
		// 時間切れのためexplodeにより画面粉砕
		$("> :eq(0)", document.getElementById("wrap")).toggle("explode");

		document.getElementById("min").value = "";
		document.getElementById("sec").value = "";
		clearInterval(Timer1);

		flg_exp.flg = true;
	} else {
		if (int <= 60) {
			// 1分前になった時の処理
			if (int <= 1){
				// 1秒前になったら音声&エフェクト停止
				alert.pause();
			}else if ((int % 2 == 0) && flg_pulsate.flg){
				// 2秒ごとに実行
				$("#wrap").effect("pulsate");
				alert.play();
			}
			document.getElementById("effect_toggle").disabled = false;
		}
		
		// 残り分数はintを60で割って切り捨てる
		document.getElementById("min").value = Math.floor(int / 60);
		// 残り秒数はintを60で割った余り
		document.getElementById("sec").value = int % 60;
	}
}

// エフェクト開始/停止
function EffectBtn() {
	if (flg_pulsate.flg) {
		flg_pulsate.flg = false;
		alert.pause();
	} else {
		flg_pulsate.flg = true;
		alert.play();
	}
}

// カウントダウン終了後wrapをクリックすることで画面を戻す
function hoReturn() {
	if (flg_exp.flg) {
		$("> :eq(0)", document.getElementById("wrap")).toggle("explode");
		flg_exp.flg = false;
	}
}

// リセットボタン
function ResetBtn() {
	// SeResetBtn.play();
}
